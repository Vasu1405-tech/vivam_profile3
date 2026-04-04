from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Contact Form Model & Endpoint
class ContactForm(BaseModel):
    name: str
    company: str = ""
    email: str
    phone: str = ""
    description: str
    budget: str = ""

def send_contact_email(form: ContactForm):
    """Send contact form data via SMTP email."""
    import smtplib
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart

    smtp_host = os.environ.get("SMTP_HOST", "")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_pass = os.environ.get("SMTP_PASS", "")
    contact_email = os.environ.get("CONTACT_EMAIL", "contact@vivamsofttech.com")

    if not smtp_user or not smtp_pass:
        logger.warning("SMTP credentials not configured — skipping email send")
        return False

    subject = f"New Project Inquiry from {form.name}"
    html_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
      <h2 style="color: #4F46E5;">🚀 New Project Inquiry</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">{form.name}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Company</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">{form.company or 'N/A'}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:{form.email}">{form.email}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">{form.phone or 'N/A'}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Budget</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">{form.budget or 'Not specified'}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Description</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">{form.description}</td></tr>
      </table>
      <p style="margin-top: 20px; color: #888; font-size: 12px;">Sent from Vivam Software Services & IT Trainings website contact form</p>
    </body>
    </html>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = smtp_user
    msg["To"] = contact_email
    msg["Reply-To"] = form.email
    msg.attach(MIMEText(html_body, "html"))

    try:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, contact_email, msg.as_string())
        logger.info(f"Contact email sent for inquiry from {form.name}")
        return True
    except Exception as e:
        logger.error(f"Failed to send contact email: {e}")
        return False

import aiohttp
import asyncio

async def send_to_google_sheet(form: ContactForm, timestamp: str):
    """Send contact form data to a Google Apps Script Webhook URL."""
    webhook_url = os.environ.get("GOOGLE_SHEET_WEBHOOK_URL", "")
    if not webhook_url:
        return False
        
    payload = {
        "timestamp": timestamp,
        "name": form.name,
        "company": form.company,
        "email": form.email,
        "phone": form.phone,
        "budget": form.budget,
        "description": form.description
    }

    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(webhook_url, json=payload) as response:
                if response.status == 200:
                    logger.info("Successfully pushed contact data to Google Sheet webhook.")
                    return True
                else:
                    logger.error(f"Failed to push to Google Sheet. Status: {response.status}")
                    return False
    except Exception as e:
        logger.error(f"Error sending to Google Sheet webhook: {e}")
        return False


@api_router.post("/contact")
async def submit_contact(form: ContactForm):
    # Prepare standard data
    doc = form.model_dump()
    doc["id"] = str(uuid.uuid4())
    timestamp = datetime.now(timezone.utc).isoformat()
    doc["timestamp"] = timestamp

    # Save to MongoDB
    await db.contact_submissions.insert_one(doc)
    logger.info(f"Contact submission saved from {form.name} ({form.email})")

    # Send email notification (synchronous, but fast enough)
    email_sent = send_contact_email(form)

    # Send to Google Sheets (asynchronous)
    asyncio.create_task(send_to_google_sheet(form, timestamp))

    return {
        "success": True,
        "message": "Thank you! We'll get back to you within 24 hours.",
        "email_sent": email_sent,
    }


@api_router.get("/contact")
async def get_contact_submissions():
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    return submissions


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)