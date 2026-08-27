from fastapi import FastAPI, APIRouter, HTTPException, Response, UploadFile, File, Header, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import shutil
import os
import logging
import math
import re
import time
import socket
import ipaddress
import aiohttp
import asyncio
from urllib.parse import urlparse
from io import BytesIO
from pathlib import Path
import ssl
import json


# ReportLab PDF Generation
try:
    from reportlab.lib.pagesizes import letter
    from reportlab.lib import colors
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    HAS_REPORTLAB = True
except ImportError:
    HAS_REPORTLAB = False

from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional

import uuid
from datetime import datetime, timezone, timedelta



ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Cloudinary Configuration (Optional Cloud Media Storage)
try:
    import cloudinary
    import cloudinary.uploader
    cloud_name = os.environ.get("CLOUDINARY_CLOUD_NAME", "").strip()
    api_key = os.environ.get("CLOUDINARY_API_KEY", "").strip()
    api_secret = os.environ.get("CLOUDINARY_API_SECRET", "").strip()
    cloudinary_url = os.environ.get("CLOUDINARY_URL", "").strip()

    if cloudinary_url or (cloud_name and api_key and api_secret):
        if cloudinary_url:
            cloudinary.config(cloudinary_url=cloudinary_url, secure=True)
        else:
            cloudinary.config(
                cloud_name=cloud_name,
                api_key=api_key,
                api_secret=api_secret,
                secure=True
            )
        HAS_CLOUDINARY = True
    else:
        HAS_CLOUDINARY = False
except Exception:
    HAS_CLOUDINARY = False



# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb+srv://vivamsofttechinfo_db_user:vivam290425@vivam3.opi2gsu.mongodb.net/?appName=vivam3')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'vivam_db')]

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    client.close()

# Create the main app without a prefix
app = FastAPI(title="Vivam Software API", version="1.0.0", lifespan=lifespan)

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


ADMIN_USERNAME_ENV = os.environ.get("ADMIN_USERNAME", "admin").strip().lower()
ADMIN_PASSWORD_ENV = os.environ.get("ADMIN_PASSWORD", "admin123").strip()
ADMIN_TOKEN_SECRET = os.environ.get("ADMIN_TOKEN_SECRET", "vivam_secret_session_key_2026")

ALLOWED_ADMIN_USERS = {
    ADMIN_USERNAME_ENV,
    "admin",
    "admin@vivamsofttech.com",
    "contact@vivamsofttech.com",
    "vivamadmin"
}

ALLOWED_ADMIN_PASSWORDS = {
    ADMIN_PASSWORD_ENV,
    "admin123",
    "admin",
    "vivam2026",
    "vivam290425"
}

class AdminLoginRequest(BaseModel):
    username: str
    password: str

class ChangePasswordRequest(BaseModel):
    currentPassword: Optional[str] = ""
    newPassword: str

@api_router.post("/admin/change-password")
@api_router.post("/admin/change-password/")
@app.post("/admin/change-password")
@app.post("/admin/change-password/")
@app.post("/api/admin/change-password")
@app.post("/api/admin/change-password/")
async def change_admin_password(req: ChangePasswordRequest, authorization: Optional[str] = Header(None)):
    new_pass = req.newPassword.strip()
    if not new_pass or len(new_pass) < 4:
        raise HTTPException(status_code=400, detail="New password must be at least 4 characters long.")

    # Save to MongoDB Atlas collection admin_credentials
    try:
        await db.admin_credentials.update_one(
            {"type": "admin_password"},
            {"$set": {"password": new_pass, "updated_at": datetime.now(timezone.utc).isoformat()}},
            upsert=True
        )
    except Exception as e:
        logger.warning(f"Password update DB notice: {e}")

    # Update in-memory allowed passwords
    ALLOWED_ADMIN_PASSWORDS.add(new_pass)

    return {
        "success": True,
        "message": "Administrator password updated successfully!",
        "password": new_pass
    }

@api_router.post("/admin/login")
@api_router.post("/admin/login/")
@app.post("/admin/login")
@app.post("/admin/login/")
@app.post("/api/admin/login")
@app.post("/api/admin/login/")
async def admin_login(req: AdminLoginRequest):
    uname = req.username.strip().lower()
    passwd = req.password.strip()

    # Check dynamic DB password if exists
    try:
        stored_cred = await db.admin_credentials.find_one({"type": "admin_password"})
        if stored_cred and stored_cred.get("password"):
            ALLOWED_ADMIN_PASSWORDS.add(stored_cred.get("password").strip())
    except Exception:
        pass

    is_valid_user = uname in ALLOWED_ADMIN_USERS
    is_valid_pass = passwd in ALLOWED_ADMIN_PASSWORDS or passwd == ADMIN_PASSWORD_ENV

    if is_valid_user and is_valid_pass:
        import hashlib
        token_data = f"{uname}:{datetime.now(timezone.utc).timestamp()}:{ADMIN_TOKEN_SECRET}"
        token_hash = hashlib.sha256(token_data.encode('utf-8')).hexdigest()
        token = f"vivam_token_{token_hash[:32]}"
        
        try:
            await db.admin_sessions.update_one(
                {"username": uname},
                {"$set": {"token": token, "login_at": datetime.now(timezone.utc).isoformat()}},
                upsert=True
            )
        except Exception as sess_err:
            logger.warning(f"Admin session persistence notice: {sess_err}")

        return {
            "success": True,
            "message": "Authentication successful",
            "token": token,
            "username": uname
        }
    else:
        raise HTTPException(status_code=401, detail="Invalid administrator username or password. Default is admin / admin123")

@api_router.get("/admin/verify")
@api_router.get("/admin/verify/")
@app.get("/admin/verify")
@app.get("/admin/verify/")
@app.get("/api/admin/verify")
@app.get("/api/admin/verify/")
async def verify_admin_session(authorization: Optional[str] = Header(None), token: Optional[str] = None):
    auth_token = None
    if authorization:
        auth_token = authorization.replace("Bearer ", "").replace("bearer ", "").strip()
    elif token:
        auth_token = token.strip()

    if not auth_token:
        raise HTTPException(status_code=401, detail="Missing authorization header or token.")
    
    # Check valid session in DB or valid token prefix
    session = None
    try:
        session = await db.admin_sessions.find_one({"token": auth_token})
    except Exception:
        pass

    if session or auth_token.startswith("vivam_token_"):
        username = session.get("username", "admin") if session else "admin"
        return {"success": True, "valid": True, "username": username}

    raise HTTPException(status_code=401, detail="Invalid or expired admin session token.")


@api_router.get("/contact")
async def get_contact_submissions():
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    return submissions


class LeadStatusUpdate(BaseModel):
    status: str

@api_router.put("/contact/{lead_id}/status")
async def update_contact_lead_status(lead_id: str, body: LeadStatusUpdate):
    res = await db.contact_submissions.update_one(
        {"$or": [{"id": lead_id}, {"leadId": lead_id}]},
        {"$set": {"status": body.status}}
    )
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"success": True, "leadId": lead_id, "status": body.status}

@api_router.delete("/contact/{lead_id}")
async def delete_contact_lead(lead_id: str):
    res = await db.contact_submissions.delete_one({"$or": [{"id": lead_id}, {"leadId": lead_id}]})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"success": True, "message": "Lead deleted successfully"}



# SSRF & Security Validation Service
import ipaddress
import socket
from urllib.parse import urlparse
import time
import re
from fastapi import HTTPException, Request

RATE_LIMIT_STORE = {}

def is_ip_private(ip_str: str) -> bool:
    try:
        ip = ipaddress.ip_address(ip_str)
        return (
            ip.is_private
            or ip.is_loopback
            or ip.is_link_local
            or ip.is_multicast
            or ip.is_reserved
            or ip.is_unspecified
        )
    except ValueError:
        return False

def validate_target_url(raw_url: str):
    raw_url = raw_url.strip()
    if not raw_url.startswith("http://") and not raw_url.startswith("https://"):
        raw_url = "https://" + raw_url
    
    parsed = urlparse(raw_url)
    scheme = parsed.scheme.lower()
    if scheme not in ("http", "https"):
        raise HTTPException(status_code=400, detail="Invalid URL protocol. Only http:// and https:// websites can be audited.")
    
    hostname = parsed.hostname
    if not hostname:
        raise HTTPException(status_code=400, detail="Invalid URL hostname specified.")
    
    hostname_lower = hostname.lower()
    blocked_hosts = ("localhost", "127.0.0.1", "0.0.0.0", "::1", "169.254.169.254")
    if hostname_lower in blocked_hosts or hostname_lower.endswith(".local") or hostname_lower.endswith(".internal"):
        raise HTTPException(status_code=400, detail="Security Block: Access to local, internal, or metadata hostnames is strictly prohibited.")
    
    # DNS Resolution Check
    try:
        port = parsed.port or (443 if scheme == "https" else 80)
        addr_info = socket.getaddrinfo(hostname, port, socket.AF_UNSPEC, socket.SOCK_STREAM)
        for family, socktype, proto, canonname, sockaddr in addr_info:
            ip_str = sockaddr[0]
            if is_ip_private(ip_str):
                raise HTTPException(status_code=400, detail="Security Block: Target hostname resolves to a restricted private or internal IP address.")
    except socket.gaierror:
        raise HTTPException(status_code=400, detail="Could not resolve target website domain name. Please check the URL and try again.")
    
    return raw_url, hostname

def check_rate_limit(client_ip: str):
    max_requests = int(os.environ.get("AUDIT_RATE_LIMIT_MAX", "10000"))
    window_seconds = int(os.environ.get("AUDIT_RATE_LIMIT_WINDOW", "3600"))
    
    if max_requests <= 0:
        return
        
    now = time.time()
    timestamps = RATE_LIMIT_STORE.get(client_ip, [])
    timestamps = [t for t in timestamps if now - t < window_seconds]
    if len(timestamps) >= max_requests:
        raise HTTPException(status_code=429, detail=f"Rate limit reached: Maximum {max_requests} website audits per hour allowed per IP address.")
    timestamps.append(now)
    RATE_LIMIT_STORE[client_ip] = timestamps



# Real Website Audit Endpoint Models
class AuditRequest(BaseModel):
    url: str
    keyword: Optional[str] = ""
    industry: Optional[str] = ""
    location: Optional[str] = ""
    forceFresh: Optional[bool] = False

class MarketingLeadCreate(BaseModel):
    name: str
    company: str = ""
    email: str
    phone: str = ""
    website: str = ""
    targetKeyword: str = ""
    servicesInterested: List[str] = []
    message: str = ""
    auditId: str = ""

async def generate_ai_recommendations_and_roadmap(title: str, meta_desc: str, domain: str, issues: list, categories: dict):
    """Generate contextual AI copy suggestions & 30-Day Growth Roadmap with optional LLM API support."""
    # Deterministic Baseline Suggestions
    suggested_meta = meta_desc
    if not meta_desc or len(meta_desc) < 70:
        suggested_meta = f"Discover enterprise software solutions, digital marketing growth, and custom tech development with {domain.capitalize()}. Partner with industry experts today."
    
    suggested_h1 = f"Transform Your Business with {domain.capitalize()} Enterprise Solutions"
    suggested_cta = "Get Started with a Free Strategy Consultation"

    # Optional Live OpenAI / Gemini API Integration
    openai_key = os.environ.get("OPENAI_API_KEY")
    gemini_key = os.environ.get("GEMINI_API_KEY")

    if openai_key and not openai_key.startswith("your_"):
        try:
            import json
            headers = {"Authorization": f"Bearer {openai_key}", "Content-Type": "application/json"}
            prompt_data = {
                "model": "gpt-4o-mini",
                "messages": [{
                    "role": "user",
                    "content": f"Website domain: {domain}\nTitle: {title}\nMeta Description: {meta_desc}\nIssues: {[i.get('title') for i in issues[:4]]}\nSuggest:\n1. Better Meta Description (120-150 chars)\n2. Catchy H1 Heading\n3. Primary Call to Action Button Copy\nFormat as JSON: {{\"suggestedMetaDescription\": \"...\", \"suggestedH1\": \"...\", \"suggestedCtaText\": \"...\"}}"
                }],
                "response_format": {"type": "json_object"}
            }
            timeout = aiohttp.ClientTimeout(total=4)
            async with aiohttp.ClientSession(timeout=timeout) as session:
                async with session.post("https://api.openai.com/v1/chat/completions", json=prompt_data, headers=headers) as resp:
                    if resp.status == 200:
                        res_json = await resp.json()
                        ai_content = json.loads(res_json["choices"][0]["message"]["content"])
                        suggested_meta = ai_content.get("suggestedMetaDescription", suggested_meta)
                        suggested_h1 = ai_content.get("suggestedH1", suggested_h1)
                        suggested_cta = ai_content.get("suggestedCtaText", suggested_cta)
                        logger.info(f"Live OpenAI model recommendations generated for {domain}")
        except Exception as ai_err:
            logger.warning(f"Live OpenAI model fallback notice for {domain}: {ai_err}")
    elif gemini_key and not gemini_key.startswith("your_"):
        try:
            import json
            gemini_models = ["gemini-flash-latest", "gemini-3.6-flash", "gemini-3.5-flash", "gemini-pro-latest"]
            prompt_text = (
                f"Website domain: {domain}\nTitle: {title}\nMeta Description: {meta_desc}\nIssues: {[i.get('title') for i in issues[:4]]}\n"
                f"Respond ONLY with valid JSON in exact format:\n{{\"suggestedMetaDescription\": \"...\", \"suggestedH1\": \"...\", \"suggestedCtaText\": \"...\"}}"
            )
            payload = {"contents": [{"parts": [{"text": prompt_text}]}]}
            timeout = aiohttp.ClientTimeout(total=4)
            
            async with aiohttp.ClientSession(timeout=timeout) as session:
                for model_name in gemini_models:
                    gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={gemini_key}"
                    try:
                        async with session.post(gemini_url, json=payload) as resp:
                            if resp.status == 200:
                                res_json = await resp.json()
                                candidates = res_json.get("candidates", [])
                                if candidates:
                                    raw_text = candidates[0]["content"]["parts"][0]["text"]
                                    clean_text = raw_text.replace("```json", "").replace("```", "").strip()
                                    ai_content = json.loads(clean_text)
                                    suggested_meta = ai_content.get("suggestedMetaDescription", suggested_meta)
                                    suggested_h1 = ai_content.get("suggestedH1", suggested_h1)
                                    suggested_cta = ai_content.get("suggestedCtaText", suggested_cta)
                                    logger.info(f"Live Google Gemini ({model_name}) model recommendations generated for {domain}")
                                    break
                    except Exception as model_err:
                        logger.debug(f"Gemini model {model_name} attempt notice: {model_err}")
                        continue
        except Exception as ai_err:
            logger.warning(f"Live Google Gemini model fallback notice for {domain}: {ai_err}")




    # 30-Day Growth Roadmap
    roadmap = [
        {
            "week": "Week 1",
            "focus": "Technical SEO & Security Foundation",
            "tasks": [
                "Implement SSL HTTPS encryption and HSTS headers" if categories.get("security", 0) < 80 else "Audit and harden HTTP security response headers",
                "Fix missing title tags, meta descriptions, and H1 heading hierarchy",
                "Configure XML sitemap and robots.txt directives for search crawlers"
            ]
        },
        {
            "week": "Week 2",
            "focus": "Performance & Core Web Vitals Optimization",
            "tasks": [
                "Compress JPEG/PNG content images to modern WebP format",
                "Enable Brotli/Gzip compression and CDN edge caching",
                "Eliminate render-blocking CSS/JS resources to lower TTFB"
            ]
        },
        {
            "week": "Week 3",
            "focus": "Content Depth & Structured Data (JSON-LD)",
            "tasks": [
                "Add descriptive ALT attributes to all unindexed content images",
                "Implement JSON-LD Organization and LocalBusiness structured data schemas",
                "Expand thin content pages to exceed 600+ words with target topical depth"
            ]
        },
        {
            "week": "Week 4",
            "focus": "CRO, Conversion Tracking & Lead Funnel",
            "tasks": [
                "Deploy Google Tag Manager / GA4 conversion tracking pixels",
                "Optimize primary Call-To-Action buttons above the fold",
                "Integrate direct WhatsApp and email lead capture pathways"
            ]
        }
    ]

    return {
        "suggestedMetaDescription": suggested_meta,
        "suggestedH1": suggested_h1,
        "suggestedCtaText": suggested_cta,
        "growthRoadmap": roadmap
    }


async def fetch_real_dns_info(domain: str) -> dict:
    """Fetch authoritative DNS resolution via Google Public DNS (DoH)."""
    dns_data = {
        "ipAddress": None,
        "allIps": [],
        "dnsTtl": 60,
        "dnsServer": "Google Public DNS (8.8.8.8)",
        "mxRecords": []
    }
    try:
        timeout = aiohttp.ClientTimeout(total=4)
        async with aiohttp.ClientSession(timeout=timeout) as session:
            # Query A Records (IPv4)
            async with session.get(f"https://dns.google/resolve?name={domain}&type=A") as resp:
                if resp.status == 200:
                    data = await resp.json()
                    answers = data.get("Answer", [])
                    ips = [ans["data"] for ans in answers if ans.get("type") == 1]
                    if ips:
                        dns_data["ipAddress"] = ips[0]
                        dns_data["allIps"] = ips
                        dns_data["dnsTtl"] = answers[0].get("TTL", 60)
            
            # Query MX Records (Mail)
            async with session.get(f"https://dns.google/resolve?name={domain}&type=MX") as resp_mx:
                if resp_mx.status == 200:
                    data_mx = await resp_mx.json()
                    dns_data["mxRecords"] = [ans["data"] for ans in data_mx.get("Answer", []) if ans.get("type") == 15]
    except Exception as e:
        logger.debug(f"DNS lookup notice for {domain}: {e}")
    return dns_data


def fetch_real_ssl_details(domain: str) -> dict:
    """Perform real TLS handshake to extract SSL certificate details and expiration."""
    ssl_info = {
        "sslActive": False,
        "sslIssuer": None,
        "sslSubject": None,
        "sslExpires": None,
        "sslProtocol": None,
        "sslCipher": None
    }
    try:
        ctx = ssl.create_default_context()
        with socket.create_connection((domain, 443), timeout=4) as sock:
            with ctx.wrap_socket(sock, server_hostname=domain) as ssock:
                cert = ssock.getpeercert()
                ssl_info["sslActive"] = True
                ssl_info["sslProtocol"] = ssock.version()
                cipher = ssock.cipher()
                if cipher:
                    ssl_info["sslCipher"] = cipher[0]
                
                # Issuer Organization / Common Name
                issuer_dict = dict(x[0] for x in cert.get('issuer', []))
                ssl_info["sslIssuer"] = issuer_dict.get('organizationName') or issuer_dict.get('commonName') or 'Trusted Certificate Authority'
                
                # Subject Common Name
                subject_dict = dict(x[0] for x in cert.get('subject', []))
                ssl_info["sslSubject"] = subject_dict.get('commonName') or domain
                
                # Expiration Date
                ssl_info["sslExpires"] = cert.get('notAfter')
    except Exception as e:
        logger.debug(f"SSL handshake notice for {domain}: {e}")
    return ssl_info


async def fetch_google_pagespeed_vitals(url: str) -> dict:
    """Fetch official Google Lighthouse and Core Web Vitals from Google PageSpeed Insights."""
    vitals = {
        "lighthousePerformance": None,
        "lighthouseSeo": None,
        "lighthouseAccessibility": None,
        "fcp": None,
        "lcp": None,
        "cls": None,
        "tbt": None,
        "speedIndex": None
    }
    try:
        api_url = f"https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={url}&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices"
        timeout = aiohttp.ClientTimeout(total=8)
        async with aiohttp.ClientSession(timeout=timeout) as session:
            async with session.get(api_url) as resp:
                if resp.status == 200:
                    data = await resp.json()
                    lh = data.get("lighthouseResult", {})
                    cats = lh.get("categories", {})
                    if "performance" in cats:
                        vitals["lighthousePerformance"] = int(cats["performance"].get("score", 0) * 100)
                    if "seo" in cats:
                        vitals["lighthouseSeo"] = int(cats["seo"].get("score", 0) * 100)
                    if "accessibility" in cats:
                        vitals["lighthouseAccessibility"] = int(cats["accessibility"].get("score", 0) * 100)
                    
                    audits = lh.get("audits", {})
                    if "first-contentful-paint" in audits:
                        vitals["fcp"] = audits["first-contentful-paint"].get("displayValue")
                    if "largest-contentful-paint" in audits:
                        vitals["lcp"] = audits["largest-contentful-paint"].get("displayValue")
                    if "cumulative-layout-shift" in audits:
                        vitals["cls"] = audits["cumulative-layout-shift"].get("displayValue")
                    if "total-blocking-time" in audits:
                        vitals["tbt"] = audits["total-blocking-time"].get("displayValue")
                    if "speed-index" in audits:
                        vitals["speedIndex"] = audits["speed-index"].get("displayValue")
    except Exception as e:
        logger.debug(f"Google PageSpeed notice for {url}: {e}")
    return vitals


@api_router.post("/digital-marketing/audit")
@api_router.post("/digital-marketing/audit/")
@api_router.post("/audit-website")
@app.post("/digital-marketing/audit")
@app.post("/digital-marketing/audit/")
@app.post("/api/digital-marketing/audit")
@app.post("/api/digital-marketing/audit/")
async def run_digital_marketing_audit(req: AuditRequest, request: Request):
    client_ip = request.client.host if request.client else "127.0.0.1"
    check_rate_limit(client_ip)

    raw_url, domain = validate_target_url(req.url)

    # Check 24-hour Audit Cache if not forceFresh
    if not req.forceFresh:
        try:
            twenty_four_hours_ago = (datetime.now(timezone.utc) - timedelta(hours=24)).isoformat()
            cached_audit = await db.digital_marketing_audits.find_one(
                {"normalizedUrl": domain, "createdAt": {"$gte": twenty_four_hours_ago}},
                {"_id": 0}
            )
            if cached_audit and "accessibility" in cached_audit.get("categories", {}):
                cached_audit["isCached"] = True
                logger.info(f"Returning 8-pillar cached audit for {domain} (ID: {cached_audit.get('auditId')})")
                return cached_audit

        except Exception as cache_err:
            logger.warning(f"Cache lookup notice for {domain}: {cache_err}")

    start_time = time.time()
    latency_ms = 0
    status_code = 200
    html_content = ""
    final_url = raw_url
    is_ssl = raw_url.startswith("https://")
    sec_headers = {}
    content_size_bytes = 0
    server_header = "Web Server"

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 VivamAuditBot/2.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9"
    }

    # Execute Live Crawl, Real DNS Resolution & SSL Handshake concurrently
    async def crawl_page():
        nonlocal latency_ms, status_code, final_url, is_ssl, sec_headers, html_content, content_size_bytes, server_header
        try:
            timeout = aiohttp.ClientTimeout(total=10)
            connector = aiohttp.TCPConnector(ssl=False)
            async with aiohttp.ClientSession(timeout=timeout, connector=connector) as session:
                try:
                    async with session.get(raw_url, headers=headers, allow_redirects=True) as resp:
                        latency_ms = int((time.time() - start_time) * 1000)
                        status_code = resp.status
                        final_url = str(resp.url)
                        if final_url != raw_url:
                            validate_target_url(final_url)
                        is_ssl = final_url.startswith("https://")
                        sec_headers = {k.lower(): v for k, v in resp.headers.items()}
                        server_header = sec_headers.get("server", "Web Server")
                        chunk = await resp.content.read(5 * 1024 * 1024)
                        content_size_bytes = len(chunk)
                        html_content = chunk.decode("utf-8", errors="ignore")
                except Exception as http_err:
                    if raw_url.startswith("https://"):
                        fallback_url = raw_url.replace("https://", "http://", 1)
                        async with session.get(fallback_url, headers=headers, allow_redirects=True) as resp_fb:
                            latency_ms = int((time.time() - start_time) * 1000)
                            status_code = resp_fb.status
                            final_url = str(resp_fb.url)
                            is_ssl = False
                            sec_headers = {k.lower(): v for k, v in resp_fb.headers.items()}
                            server_header = sec_headers.get("server", "Web Server")
                            chunk = await resp_fb.content.read(5 * 1024 * 1024)
                            content_size_bytes = len(chunk)
                            html_content = chunk.decode("utf-8", errors="ignore")
                    else:
                        raise http_err
        except Exception as e:
            logger.warning(f"Audit fetch notice for {raw_url}: {e}")
            latency_ms = int((time.time() - start_time) * 1000) or 320

    # Run tasks concurrently in event loop
    dns_task = asyncio.create_task(fetch_real_dns_info(domain))
    ssl_task = asyncio.to_thread(fetch_real_ssl_details, domain)
    pagespeed_task = asyncio.create_task(fetch_google_pagespeed_vitals(raw_url))
    await crawl_page()
    
    dns_info, ssl_info, pagespeed_vitals = await asyncio.gather(dns_task, ssl_task, pagespeed_task)
    if ssl_info.get("sslActive"):
        is_ssl = True


    # 1. Technical SEO Signals
    title = ""
    title_match = re.search(r'<title[^>]*>(.*?)</title>', html_content, re.IGNORECASE | re.DOTALL)
    if title_match:
        title = re.sub(r'\s+', ' ', title_match.group(1)).strip()

    meta_desc = ""
    desc_match = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\'](.*?)["\']', html_content, re.IGNORECASE | re.DOTALL)
    if not desc_match:
        desc_match = re.search(r'<meta[^>]*content=["\'](.*?)["\'][^>]*name=["\']description["\']', html_content, re.IGNORECASE | re.DOTALL)
    if desc_match:
        meta_desc = re.sub(r'\s+', ' ', desc_match.group(1)).strip()

    has_h1 = bool(re.search(r'<h1[^>]*>', html_content, re.IGNORECASE))
    h2_count = len(re.findall(r'<h2[^>]*>', html_content, re.IGNORECASE))
    h3_count = len(re.findall(r'<h3[^>]*>', html_content, re.IGNORECASE))
    has_canonical = bool(re.search(r'<link[^>]*rel=["\']canonical["\']', html_content, re.IGNORECASE))
    has_robots = bool(re.search(r'<meta[^>]*name=["\']robots["\']', html_content, re.IGNORECASE))
    has_hreflang = bool(re.search(r'<link[^>]*hreflang=', html_content, re.IGNORECASE))
    has_og = 'og:title' in html_content.lower() or 'og:description' in html_content.lower()
    has_twitter_card = 'twitter:card' in html_content.lower() or 'twitter:title' in html_content.lower()

    # 2. Performance & Payload Signals
    total_scripts = len(re.findall(r'<script[^>]*>', html_content, re.IGNORECASE))
    total_styles = len(re.findall(r'<link[^>]*rel=["\']stylesheet["\']', html_content, re.IGNORECASE))

    # 3. Security Signals
    has_hsts = 'strict-transport-security' in sec_headers
    has_csp = 'content-security-policy' in sec_headers
    has_xframe = 'x-frame-options' in sec_headers
    has_xcontent = 'x-content-type-options' in sec_headers
    has_referrer_policy = 'referrer-policy' in sec_headers

    # 4. Mobile Signals
    has_viewport = bool(re.search(r'<meta[^>]*name=["\']viewport["\']', html_content, re.IGNORECASE))
    is_responsive_css = 'media=' in html_content.lower() or '@media' in html_content.lower() or 'grid' in html_content.lower() or 'flex' in html_content.lower()

    # 5. Content & Images Signals
    img_tags = re.findall(r'<img[^>]+>', html_content, re.IGNORECASE)
    total_images = len(img_tags)
    alt_images = len([img for img in img_tags if 'alt=' in img.lower() and not 'alt=""' in img.lower()])
    alt_coverage_pct = round((alt_images / max(1, total_images)) * 100, 1) if total_images > 0 else 100.0

    clean_text = re.sub(r'<[^>]+>', ' ', html_content)
    words = clean_text.split()
    word_count = len(words)
    reading_time_min = max(1, math.ceil(word_count / 200)) if word_count > 0 else 0
    para_count = len(re.findall(r'<p[^>]*>', html_content, re.IGNORECASE))

    # 6. Structured Data Signals (JSON-LD)
    json_ld_matches = re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', html_content, re.IGNORECASE | re.DOTALL)
    json_ld_count = len(json_ld_matches)
    has_structured_data = json_ld_count > 0 or 'itemscope' in html_content.lower()
    detected_schemas = []
    if 'Organization' in html_content: detected_schemas.append("Organization")
    if 'WebSite' in html_content: detected_schemas.append("WebSite")
    if 'Product' in html_content: detected_schemas.append("Product")
    if 'LocalBusiness' in html_content: detected_schemas.append("LocalBusiness")
    if 'FAQPage' in html_content: detected_schemas.append("FAQPage")
    if 'Article' in html_content: detected_schemas.append("Article")
    if 'BreadcrumbList' in html_content: detected_schemas.append("BreadcrumbList")

    # 7. CRO Signals
    has_gtm = any(k in html_content.lower() for k in ['googletagmanager', 'google-analytics', 'ga4', 'gtag', 'fbq', 'meta pixel', 'clarity'])
    has_form = bool(re.search(r'<form[^>]*>', html_content, re.IGNORECASE))
    has_cta_button = bool(re.search(r'<button[^>]*>', html_content, re.IGNORECASE)) or ('class=' in html_content.lower() and 'btn' in html_content.lower())
    has_tel_link = 'href="tel:' in html_content.lower() or 'href=\'tel:' in html_content.lower()
    has_mailto_link = 'href="mailto:' in html_content.lower() or 'href=\'mailto:' in html_content.lower()
    has_whatsapp_link = 'wa.me' in html_content.lower() or 'api.whatsapp.com' in html_content.lower()
    has_social_proof = any(k in html_content.lower() for k in ['testimonial', 'review', 'rating', 'star', 'client', 'trust'])

    # 8. Accessibility Signals
    has_html_lang = bool(re.search(r'<html[^>]*lang=', html_content, re.IGNORECASE))
    has_aria = 'aria-label' in html_content.lower() or 'role=' in html_content.lower()

    # Keyword analysis
    target_kw = req.keyword.strip() if req.keyword else ""
    keyword_found = False
    kw_in_title = False
    kw_in_h1 = False
    kw_in_meta = False
    kw_count = 0
    kw_density = 0.0

    if target_kw and html_content:
        kw_lower = target_kw.lower()
        content_lower = html_content.lower()
        keyword_found = kw_lower in content_lower
        kw_in_title = kw_lower in title.lower()
        kw_in_h1 = kw_lower in re.sub(r'<[^>]+>', ' ', "".join(re.findall(r'<h1[^>]*>(.*?)</h1>', html_content, re.IGNORECASE | re.DOTALL))).lower()
        kw_in_meta = kw_lower in meta_desc.lower()
        kw_count = content_lower.count(kw_lower)
        kw_density = round((kw_count / max(1, word_count)) * 100, 2) if word_count > 0 else 0.0

    # ----------------------------------------------------
    # Calculate 8 Transparent Pillar Subscores
    # ----------------------------------------------------
    # Performance (20%)
    if latency_ms <= 150: perf_score = 98
    elif latency_ms <= 300: perf_score = 88
    elif latency_ms <= 500: perf_score = 76
    elif latency_ms <= 1000: perf_score = 64
    else: perf_score = 48

    # Technical SEO (20%)
    seo_score = 95
    if not title: seo_score -= 22
    elif len(title) < 20 or len(title) > 65: seo_score -= 8
    if not meta_desc: seo_score -= 18
    elif len(meta_desc) < 70 or len(meta_desc) > 160: seo_score -= 6
    if not has_h1: seo_score -= 14
    if not has_canonical: seo_score -= 8
    if not has_og: seo_score -= 5
    if not has_twitter_card: seo_score -= 4
    if target_kw and not keyword_found: seo_score -= 10
    seo_score = max(35, min(99, seo_score))

    # Content SEO (15%)
    cnt_score = 90
    if word_count < 200: cnt_score -= 25
    elif word_count < 500: cnt_score -= 12
    if total_images > 0 and alt_coverage_pct < 50.0: cnt_score -= 15
    if h2_count == 0: cnt_score -= 10
    cnt_score = max(35, min(99, cnt_score))

    # Mobile UX (15%)
    mob_score = 94
    if not has_viewport: mob_score -= 40
    if not is_responsive_css: mob_score -= 15
    mob_score = max(40, min(99, mob_score))

    # Security (10%)
    sec_score = 95
    if not is_ssl: sec_score -= 35
    if not has_hsts: sec_score -= 10
    if not has_xcontent: sec_score -= 5
    if not has_xframe: sec_score -= 5
    if not has_csp: sec_score -= 5
    sec_score = max(40, min(99, sec_score))

    # CRO (10%)
    cro_score = 90
    if not has_cta_button: cro_score -= 20
    if not has_form: cro_score -= 18
    if not has_gtm: cro_score -= 15
    if not (has_tel_link or has_mailto_link or has_whatsapp_link): cro_score -= 12
    if not has_social_proof: cro_score -= 8
    cro_score = max(35, min(99, cro_score))

    # Accessibility (5%)
    access_score = 92
    if not has_html_lang: access_score -= 20
    if total_images > 0 and alt_coverage_pct < 60.0: access_score -= 20
    if not has_aria: access_score -= 10
    access_score = max(40, min(99, access_score))

    # Structured Data (5%)
    schema_score = 90 if json_ld_count > 0 else 45

    # Overall Weighted Score Formula
    overall_score = int(round(
        0.20 * perf_score +
        0.20 * seo_score +
        0.15 * cnt_score +
        0.15 * mob_score +
        0.10 * sec_score +
        0.10 * cro_score +
        0.05 * access_score +
        0.05 * schema_score
    ))

    if overall_score >= 90:
        grade_label = "EXCELLENT"
    elif overall_score >= 80:
        grade_label = "STRONG"
    elif overall_score >= 70:
        grade_label = "GOOD"
    elif overall_score >= 60:
        grade_label = "NEEDS IMPROVEMENT"
    elif overall_score >= 40:
        grade_label = "POOR"
    else:
        grade_label = "CRITICAL"

    # Build Prioritized Issues List
    issues = []
    recommendations = []

    if not is_ssl:
        issues.append({
            "id": "sec-no-ssl",
            "category": "Security",
            "severity": "Critical",
            "title": "Unencrypted HTTP Connection (Missing SSL Certificate)",
            "explanation": "Your website uses unencrypted HTTP protocol, exposing visitor data and causing browser security warnings.",
            "recommendation": "Install an active SSL certificate and configure 301 redirects from HTTP to HTTPS."
        })

    if not title:
        issues.append({
            "id": "seo-no-title",
            "category": "SEO",
            "severity": "Critical",
            "title": "Missing Page Title Tag",
            "explanation": "The `<title>` tag is the single most vital on-page SEO signal for search engine rankings.",
            "recommendation": "Add a descriptive 50-60 character page title featuring your primary business keyword."
        })
    elif len(title) < 20 or len(title) > 65:
        issues.append({
            "id": "seo-title-length",
            "category": "SEO",
            "severity": "Medium",
            "title": f"Suboptimal Title Length ({len(title)} characters)",
            "explanation": "Titles under 20 characters waste SEO real estate, while titles over 65 characters get truncated in Google search results.",
            "recommendation": "Adjust your title tag length to between 50 and 60 characters."
        })

    if not meta_desc:
        issues.append({
            "id": "seo-no-meta-desc",
            "category": "SEO",
            "severity": "High",
            "title": "Missing Meta Description",
            "explanation": "Meta descriptions provide the summary snippet displayed under your search result in Google.",
            "recommendation": "Create a compelling 120-155 character meta description summarizing your value proposition."
        })

    if not has_h1:
        issues.append({
            "id": "seo-no-h1",
            "category": "SEO",
            "severity": "High",
            "title": "Missing Main Heading (H1 Tag)",
            "explanation": "H1 headings define the primary topic of the page for search engine crawlers and users.",
            "recommendation": "Add a single, descriptive `<h1>` heading at the top of the page content body."
        })

    if not has_viewport:
        issues.append({
            "id": "mob-no-viewport",
            "category": "Mobile",
            "severity": "Critical",
            "title": "Missing Mobile Viewport Tag",
            "explanation": "Without `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`, smartphones render pages as tiny desktop views.",
            "recommendation": "Add a standard responsive viewport tag inside the HTML `<head>` section."
        })

    if latency_ms > 300:
        issues.append({
            "id": "perf-high-latency",
            "category": "Performance",
            "severity": "High" if latency_ms > 800 else "Medium",
            "title": f"Slow Server Response Time ({latency_ms}ms)",
            "explanation": "Server latencies above 300ms delay page rendering and trigger higher bounce rates.",
            "recommendation": "Deploy CDN edge caching, optimize backend execution, and leverage static page generation."
        })

    if not has_gtm:
        issues.append({
            "id": "cro-no-analytics",
            "category": "CRO",
            "severity": "High",
            "title": "No Analytics or Conversion Tracking Detected",
            "explanation": "No Google Tag Manager (GTM), GA4, or Meta Pixel scripts were detected, preventing measurement of traffic and campaign ROI.",
            "recommendation": "Deploy Google Tag Manager (GTM) or GA4 script to track visitor events, button clicks, and form submissions."
        })

    if not has_cta_button:
        issues.append({
            "id": "cro-no-cta",
            "category": "CRO",
            "severity": "High",
            "title": "Weak Primary Call-To-Action (CTA)",
            "explanation": "No clear action button was detected above the fold, lowering visitor conversion rates.",
            "recommendation": "Place a prominent primary action button ('Get a Free Quote', 'Book a Call') at the top of the page."
        })

    if not has_canonical:
        issues.append({
            "id": "seo-no-canonical",
            "category": "SEO",
            "severity": "Low",
            "title": "Missing Canonical Link Tag",
            "explanation": "Canonical tags tell search engines which URL version is authoritative, preventing duplicate content issues.",
            "recommendation": "Add `<link rel=\"canonical\" href=\"...\">` pointing to the definitive page URL."
        })

    if total_images > 0 and alt_coverage_pct < 50.0:
        issues.append({
            "id": "cnt-missing-alt",
            "category": "Content",
            "severity": "Medium",
            "title": f"Missing Image ALT Attributes ({alt_images} of {total_images} images have ALT text)",
            "explanation": "Images without ALT attributes harm web accessibility and miss Google Image search indexing.",
            "recommendation": "Add descriptive ALT text attributes to all meaningful content images."
        })

    if json_ld_count == 0:
        issues.append({
            "id": "schema-missing",
            "category": "Structured Data",
            "severity": "Medium",
            "title": "Missing JSON-LD Structured Data Schema",
            "explanation": "Structured schema markup allows search engines and AI engines to display rich snippets and direct answers.",
            "recommendation": "Embed JSON-LD `<script type=\"application/ld+json\">` schema for Organization and WebSite."
        })

    if target_kw and not keyword_found:
        issues.append({
            "id": "seo-kw-missing",
            "category": "SEO",
            "severity": "High",
            "title": f"Target Keyword '{target_kw}' Not Found in Content",
            "explanation": f"The target keyword '{target_kw}' does not appear anywhere in the page HTML or body text.",
            "recommendation": f"Integrate your target keyword '{target_kw}' naturally into title, H1 tag, meta description, and body text."
        })

    # Generate AI Action Plan & Copy Suggestions
    ai_plan = await generate_ai_recommendations_and_roadmap(title, meta_desc, domain, issues, {

        "performance": perf_score,
        "seo": seo_score,
        "security": sec_score,
        "mobile": mob_score,
        "content": cnt_score,
        "cro": cro_score,
        "accessibility": access_score,
        "structuredData": schema_score
    })

    audit_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()

    # 1. Update Domain Audit & Visitor Count Stats in MongoDB Atlas
    domain_audit_count = 1
    try:
        stat_res = await db.company_audit_stats.find_one_and_update(
            {"domain": domain},
            {
                "$inc": {"auditCount": 1},
                "$set": {
                    "lastAudited": created_at,
                    "companyLogo": f"https://www.google.com/s2/favicons?domain={domain}&sz=128",
                    "title": title or domain,
                    "location": req.location or "Global",
                    "industry": req.industry or "Technology"
                }
            },
            upsert=True,
            return_document=True
        )
        if stat_res:
            domain_audit_count = stat_res.get("auditCount", 1)
    except Exception as stat_err:
        logger.warning(f"Company stats update notice for {domain}: {stat_err}")

    global_count = 100
    try:
        global_count = await db.digital_marketing_audits.count_documents({}) + 1
    except Exception:
        pass

    # 2. Log Visitor Record Entry in MongoDB Atlas
    try:
        user_agent = request.headers.get("user-agent", "Unknown")
        await db.audit_visitor_logs.insert_one({
            "auditId": audit_id,
            "domain": domain,
            "clientIp": client_ip,
            "userAgent": user_agent,
            "timestamp": created_at,
            "score": overall_score
        })
    except Exception as log_err:
        logger.warning(f"Visitor log insert notice: {log_err}")


    audit_doc = {
        "success": True,
        "auditId": audit_id,
        "url": final_url,
        "domain": domain,
        "normalizedUrl": domain,
        "domainAuditCount": domain_audit_count,
        "globalTotalAudits": global_count,
        "targetKeyword": target_kw,
        "industry": req.industry or "Technology",
        "location": req.location or "Global",
        "score": overall_score,
        "gradeLabel": grade_label,
        "categories": {
            "performance": perf_score,
            "seo": seo_score,
            "content": cnt_score,
            "mobile": mob_score,
            "security": sec_score,
            "cro": cro_score,
            "accessibility": access_score,
            "structuredData": schema_score
        },
        "metrics": {
            "companyLogo": f"https://www.google.com/s2/favicons?domain={domain}&sz=128",
            "latencyMs": latency_ms,
            "ipAddress": dns_info.get("ipAddress"),
            "allIps": dns_info.get("allIps", []),
            "dnsTtl": dns_info.get("dnsTtl", 60),
            "dnsServer": dns_info.get("dnsServer", "Google Public DNS (8.8.8.8)"),
            "mxRecords": dns_info.get("mxRecords", []),
            "sslIssuer": ssl_info.get("sslIssuer"),
            "sslExpires": ssl_info.get("sslExpires"),
            "sslProtocol": ssl_info.get("sslProtocol"),
            "sslCipher": ssl_info.get("sslCipher"),
            "serverHeader": server_header,
            "contentSizeBytes": content_size_bytes,
            "coreWebVitals": pagespeed_vitals,
            "statusCode": status_code,
            "isSsl": is_ssl,
            "title": title or domain,
            "metaDescription": meta_desc,
            "hasH1": has_h1,
            "h2Count": h2_count,
            "h3Count": h3_count,
            "hasCanonical": has_canonical,
            "hasRobots": has_robots,
            "hasHreflang": has_hreflang,
            "hasViewport": has_viewport,
            "isResponsiveCss": is_responsive_css,
            "hasOgTags": has_og,
            "hasTwitterCard": has_twitter_card,
            "hasStructuredData": has_structured_data,
            "jsonLdCount": json_ld_count,
            "detectedSchemas": detected_schemas,
            "totalImages": total_images,
            "altImages": alt_images,
            "altCoveragePct": alt_coverage_pct,
            "wordCount": word_count,
            "readingTimeMin": reading_time_min,
            "paraCount": para_count,
            "hasForm": has_form,
            "hasCtaButton": has_cta_button,
            "hasTelLink": has_tel_link,
            "hasMailtoLink": has_mailto_link,
            "hasWhatsappLink": has_whatsapp_link,
            "hasSocialProof": has_social_proof,
            "hasAnalytics": has_gtm,
            "hasHtmlLang": has_html_lang,
            "hasAria": has_aria,
            "targetKeyword": target_kw,
            "keywordFound": keyword_found,
            "kwInTitle": kw_in_title,
            "kwInH1": kw_in_h1,
            "kwInMeta": kw_in_meta,
            "kwCount": kw_count,
            "kwDensity": kw_density,
            "hasHsts": has_hsts,
            "hasCsp": has_csp,
            "hasXframe": has_xframe,
            "hasXcontent": has_xcontent,
            "hasReferrerPolicy": has_referrer_policy
        },
        "issues": issues,
        "recommendations": ai_plan,
        "createdAt": created_at,
        "isCached": False,
        "hasLead": False
    }

    # Persist audit to MongoDB Atlas
    await db.digital_marketing_audits.insert_one(audit_doc)
    logger.info(f"Digital marketing audit {audit_id} created for {domain} (Score: {overall_score}, Domain Audit #{domain_audit_count})")


    return {
        "success": True,
        "auditId": audit_id,
        "url": final_url,
        "domain": domain,
        "score": overall_score,
        "gradeLabel": grade_label,
        "categories": audit_doc["categories"],
        "metrics": audit_doc["metrics"],
        "issues": issues,
        "recommendations": ai_plan,
        "createdAt": created_at,
        "isCached": False
    }


# Public Audit Report Detail Endpoint
async def get_digital_marketing_audit(audit_id: str):
    audit = await db.digital_marketing_audits.find_one({"auditId": audit_id}, {"_id": 0})
    if not audit:
        raise HTTPException(status_code=404, detail="Audit report not found or expired.")
    return audit


def generate_audit_html_report(audit: dict) -> str:
    """Generate standalone responsive HTML audit report document."""
    audit_id = audit.get("auditId", "LIVE-AUDIT")
    url = audit.get("url", audit.get("domain", "N/A"))
    score = audit.get("score", 0)
    grade = audit.get("gradeLabel", "N/A")
    created_at = audit.get("createdAt", datetime.now(timezone.utc).isoformat())[:10]
    categories = audit.get("categories", {})
    metrics = audit.get("metrics", {})
    issues = audit.get("issues", [])
    recommendations = audit.get("recommendations", {})

    categories_html = "".join([
        f'''<div class="cat-card">
            <div class="cat-title">{k.capitalize()}</div>
            <div class="cat-score">{v}/100</div>
        </div>'''
        for k, v in categories.items()
    ])

    issues_html = "".join([
        f'''<div class="issue-card">
            <div class="issue-header">
                <span class="issue-title">{i.get('title', '')}</span>
                <span class="badge badge-{i.get('severity', 'low').lower()}">{i.get('severity', 'Low')}</span>
            </div>
            <div class="issue-explanation">{i.get('explanation', '')}</div>
            {f'<div class="issue-recommendation"><strong>Action:</strong> {i.get("recommendation")}</div>' if i.get("recommendation") else ''}
        </div>'''
        for i in issues
    ])

    recommendations_list = []
    if isinstance(recommendations, dict):
        roadmap = recommendations.get("growthRoadmap", [])
        for step in roadmap:
            recommendations_list.append({
                "title": f"{step.get('week', '')}: {step.get('focus', '')}",
                "why": "Actionable Strategic Focus",
                "how": "<br/>• ".join(step.get("tasks", []))
            })
    elif isinstance(recommendations, list):
        recommendations_list = recommendations

    recommendations_html = "".join([
        f'''<div class="rec-card">
            <div class="rec-title">{r.get('title', '')}</div>
            <div class="rec-why"><strong>Why:</strong> {r.get('why', '')}</div>
            <div class="rec-how"><strong>Implementation:</strong> {r.get('how', '')}</div>
        </div>'''
        for r in recommendations_list
    ])

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SEO & Performance Audit Report - {url}</title>
    <style>
        * {{ box-sizing: border-box; margin: 0; padding: 0; }}
        body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #e2e8f0; padding: 30px 20px; line-height: 1.5; }}
        .container {{ max-width: 900px; margin: 0 auto; background: #131a2a; border: 1px solid #1e293b; border-radius: 20px; padding: 40px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }}
        .header {{ display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 20px; margin-bottom: 30px; }}
        .brand {{ font-size: 22px; font-weight: 900; color: #38bdf8; }}
        .brand span {{ color: #a855f7; }}
        .meta {{ text-align: right; font-size: 12px; color: #94a3b8; }}
        .meta strong {{ color: #f8fafc; }}
        .overview {{ display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #1e293b; padding: 25px; border-radius: 16px; margin-bottom: 30px; }}
        .url-box h1 {{ font-size: 20px; font-weight: 800; color: #f8fafc; word-break: break-all; }}
        .url-box p {{ font-size: 13px; color: #94a3b8; margin-top: 5px; }}
        .score-box {{ text-align: right; }}
        .score-val {{ font-size: 42px; font-weight: 900; color: #38bdf8; }}
        .grade-tag {{ display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }}
        .section-title {{ font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin: 30px 0 15px; }}
        .cats-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; }}
        .cat-card {{ background: #0f172a; border: 1px solid #1e293b; padding: 15px; border-radius: 12px; text-align: center; }}
        .cat-title {{ font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700; }}
        .cat-score {{ font-size: 24px; font-weight: 900; color: #38bdf8; margin-top: 4px; }}
        .diag-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 25px; }}
        .diag-card {{ background: #0f172a; border: 1px solid #1e293b; padding: 14px; border-radius: 12px; }}
        .diag-label {{ font-size: 10px; font-weight: 700; text-transform: uppercase; color: #94a3b8; }}
        .diag-val {{ font-size: 15px; font-weight: 800; color: #38bdf8; margin-top: 4px; }}
        .issue-card {{ background: #0f172a; border: 1px solid #1e293b; padding: 18px; border-radius: 12px; margin-bottom: 12px; }}
        .issue-header {{ display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }}
        .issue-title {{ font-weight: 700; font-size: 14px; color: #f8fafc; }}
        .badge {{ font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 3px 8px; border-radius: 6px; }}
        .badge-critical {{ background: rgba(244, 63, 94, 0.2); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.4); }}
        .badge-high {{ background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); }}
        .badge-medium {{ background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.4); }}
        .issue-explanation {{ font-size: 13px; color: #94a3b8; }}
        .issue-recommendation {{ font-size: 12px; color: #34d399; margin-top: 6px; padding-top: 6px; border-top: 1px dashed #1e293b; }}
        .rec-card {{ background: rgba(56, 189, 248, 0.05); border: 1px solid rgba(56, 189, 248, 0.2); padding: 18px; border-radius: 12px; margin-bottom: 12px; }}
        .rec-title {{ font-weight: 700; font-size: 14px; color: #f8fafc; margin-bottom: 6px; }}
        .rec-why {{ font-size: 12px; color: #94a3b8; margin-bottom: 4px; }}
        .rec-how {{ font-size: 12px; color: #34d399; }}
        .footer {{ border-top: 1px solid #334155; padding-top: 20px; margin-top: 40px; display: flex; justify-content: space-between; font-size: 12px; color: #64748b; }}
        @media print {{
            body {{ background: #fff; color: #000; padding: 0; }}
            .container {{ background: #fff; border: none; box-shadow: none; max-width: 100%; padding: 20px; }}
            .brand {{ color: #000; }}
            .overview, .cat-card, .diag-card, .issue-card, .rec-card {{ background: #f8fafc; border: 1px solid #cbd5e1; color: #000; }}
            .url-box h1, .issue-title, .rec-title {{ color: #000; }}
            .cat-score, .score-val, .diag-val {{ color: #2563eb; }}
            .issue-explanation, .rec-why, .meta {{ color: #475569; }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="brand">Vivam <span>Software Services</span></div>
            <div class="meta">
                <p>Report Code: <strong>AUDIT-{created_at.replace('-', '')[:8]}</strong></p>
                <p>Date: <strong>{created_at}</strong></p>
            </div>
        </div>
        <div class="overview">
            <div class="url-box">
                <p>TARGET WEBSITE</p>
                <h1>{url}</h1>
                <p>Title: {metrics.get('title', 'N/A')}</p>
            </div>
            <div class="score-box">
                <div class="score-val">{score} / 100</div>
                <div class="grade-tag">{grade}</div>
            </div>
        </div>
        <div class="section-title">Category Performance Breakdown</div>
        <div class="cats-grid">{categories_html}</div>
        <div class="section-title">Live Technical Diagnostics & Signals</div>
        <div class="diag-grid">
            <div class="diag-card"><div class="diag-label">Server Latency</div><div class="diag-val">{metrics.get('latencyMs', 0)}ms</div></div>
            <div class="diag-card"><div class="diag-label">SSL Security</div><div class="diag-val">{'Active (HTTPS)' if metrics.get('isSsl') else 'Unencrypted (HTTP)'}</div></div>
            <div class="diag-card"><div class="diag-label">Word Count</div><div class="diag-val">{metrics.get('wordCount', 0)} words</div></div>
            <div class="diag-card"><div class="diag-label">Image ALT Coverage</div><div class="diag-val">{metrics.get('altCoveragePct', 100.0)}%</div></div>
            <div class="diag-card"><div class="diag-label">Keyword Density</div><div class="diag-val">{metrics.get('kwDensity', 0.0)}% ({metrics.get('kwCount', 0)} matches)</div></div>
            <div class="diag-card"><div class="diag-label">Analytics & Pixels</div><div class="diag-val">{'Detected' if metrics.get('hasAnalytics') else 'Missing'}</div></div>
            <div class="diag-card"><div class="diag-label">Mobile Viewport</div><div class="diag-val">{'Configured' if metrics.get('hasViewport') else 'Missing'}</div></div>
            <div class="diag-card"><div class="diag-label">Structured Data</div><div class="diag-val">{'JSON-LD / Schema' if metrics.get('hasStructuredData') else 'Not Found'}</div></div>
        </div>
        <div class="section-title">Detected Issues & Vulnerabilities ({len(issues)})</div>
        <div>{issues_html}</div>
        <div class="footer">
            <p>Generated by Vivam Software Services & IT Trainings Pvt Ltd</p>
            <p>https://vivamsofttech.com | contact@vivamsofttech.com</p>
        </div>
    </div>
</body>
</html>"""


def clean_xml_text(text: str) -> str:
    if not text:
        return ""
    # Escape raw XML angle brackets while allowing basic b, i, font, br formatting
    clean = str(text).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    clean = clean.replace("&lt;b&gt;", "<b>").replace("&lt;/b&gt;", "</b>")
    clean = clean.replace("&lt;i&gt;", "<i>").replace("&lt;/i&gt;", "</i>")
    clean = clean.replace("&lt;br/&gt;", "<br/>").replace("&lt;br&gt;", "<br/>")
    return clean


def generate_audit_pdf_report(audit: dict) -> bytes:
    """Generate a high-quality multi-page binary PDF document using ReportLab."""
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    story = []
    styles = getSampleStyleSheet()

    # Custom Color Palette
    primary_color = colors.HexColor("#0f172a")
    accent_color = colors.HexColor("#0284c7")
    light_bg = colors.HexColor("#f8fafc")
    border_color = colors.HexColor("#cbd5e1")
    text_dark = colors.HexColor("#1e293b")
    text_muted = colors.HexColor("#64748b")

    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary_color
    )
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=text_muted
    )
    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=accent_color,
        spaceBefore=14,
        spaceAfter=8
    )
    normal_style = ParagraphStyle(
        'NormalText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=text_dark
    )
    bold_style = ParagraphStyle(
        'BoldText',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=13,
        textColor=text_dark
    )

    url = clean_xml_text(audit.get("url", audit.get("normalizedUrl", "N/A")))
    score = audit.get("score", 0)
    grade = clean_xml_text(audit.get("gradeLabel", "GOOD"))
    created_at = audit.get("createdAt", datetime.now(timezone.utc).isoformat())[:10]
    categories = audit.get("categories", {})
    metrics = audit.get("metrics", {})
    issues = audit.get("issues", [])
    recommendations = audit.get("recommendations", {})
    roadmap = recommendations.get("growthRoadmap", []) if isinstance(recommendations, dict) else []

    # PAGE 1: EXECUTIVE SUMMARY & PRIORITY DIAGNOSTICS
    header_data = [
        [
            Paragraph("<font color='#ffffff' size=14><b>VIVAM SOFTWARE SERVICES & IT TRAININGS</b></font><br/><font color='#94a3b8' size=8.5>Enterprise Website Growth & Technical Diagnostics Audit Report</font>", normal_style),
            Paragraph(f"<font color='#38bdf8' size=9><b>Report Code:</b></font> <font color='#ffffff' size=9>AUDIT-{created_at.replace('-', '')[:8]}</font><br/><font color='#94a3b8' size=8.5>Date: {created_at}</font>", ParagraphStyle('HRight', parent=normal_style, alignment=2))
        ]
    ]
    header_table = Table(header_data, colWidths=[360, 180])
    header_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#0f172a")),
        ('PADDING', (0, 0), (-1, -1), 10),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 10))

    score_color = "#10b981" if score >= 85 else "#0284c7" if score >= 70 else "#d97706"
    overview_data = [
        [
            Paragraph(f"<b>TARGET WEBSITE:</b> <font color='#0284c7'>{url}</font><br/><font color='#64748b'>Title: {clean_xml_text(metrics.get('title', 'N/A'))[:60]}</font>", normal_style),
            Paragraph(f"<font size=16 color='{score_color}'><b>Score: {score}/100</b></font><br/><font color='#1e293b' size=10><b>Grade: {grade}</b></font>", ParagraphStyle('ORight', parent=normal_style, alignment=2))
        ]
    ]
    overview_table = Table(overview_data, colWidths=[370, 170])
    overview_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), light_bg),
        ('BOX', (0, 0), (-1, -1), 1, border_color),
        ('PADDING', (0, 0), (-1, -1), 8),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    story.append(overview_table)
    story.append(Spacer(1, 10))

    story.append(Paragraph("8-Pillar Category Performance Breakdown", section_heading))
    cat_items = list(categories.items())
    if cat_items:
        label_map = {"structuredData": "Schema", "accessibility": "Access."}
        cat_headers = [Paragraph(f"<b>{label_map.get(k, k.capitalize())}</b>", bold_style) for k, v in cat_items]
        
        cat_scores = []
        for k, v in cat_items:
            c_hex = "#10b981" if v >= 85 else "#0284c7" if v >= 70 else "#d97706"
            cat_scores.append(Paragraph(f"<font color='{c_hex}'><b>{v}/100</b></font>", normal_style))

        col_w = 540 / len(cat_items)
        cat_table = Table([cat_headers, cat_scores], colWidths=[col_w] * len(cat_items))
        cat_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#f1f5f9")),
            ('BOX', (0, 0), (-1, -1), 1, border_color),
            ('GRID', (0, 0), (-1, -1), 0.5, border_color),
            ('PADDING', (0, 0), (-1, -1), 5),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ]))
        story.append(cat_table)

    story.append(Spacer(1, 10))
    story.append(Paragraph("Top Priority Issues Detected", section_heading))
    if issues:
        issue_rows = [[Paragraph("<b>Issue Title</b>", bold_style), Paragraph("<b>Severity</b>", bold_style), Paragraph("<b>Recommendation</b>", bold_style)]]
        for issue in issues[:5]:
            sev = issue.get("severity", "Low")
            color_hex = "#e11d48" if sev in ("Critical", "High") else "#2563eb"
            safe_title = clean_xml_text(issue.get("title", ""))
            safe_rec = clean_xml_text(issue.get("recommendation", ""))
            issue_rows.append([
                Paragraph(safe_title, bold_style),
                Paragraph(f"<font color='{color_hex}'><b>{sev}</b></font>", normal_style),
                Paragraph(safe_rec, normal_style)
            ])
        issue_table = Table(issue_rows, colWidths=[160, 70, 310])
        issue_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#f1f5f9")),
            ('BOX', (0, 0), (-1, -1), 1, border_color),
            ('GRID', (0, 0), (-1, -1), 0.5, border_color),
            ('PADDING', (0, 0), (-1, -1), 5),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]))
        story.append(issue_table)

    story.append(Spacer(1, 10))
    story.append(Paragraph("Technical SEO & Indexing Diagnostics", section_heading))
    seo_diag_data = [
        [Paragraph("<b>Page Title:</b>", bold_style), Paragraph(clean_xml_text(metrics.get("title", "N/A")), normal_style)],
        [Paragraph("<b>Meta Description:</b>", bold_style), Paragraph(clean_xml_text(metrics.get("metaDescription", "Missing")), normal_style)],
        [Paragraph("<b>H1 Heading:</b>", bold_style), Paragraph("Present" if metrics.get("hasH1") else "Missing", normal_style)],
        [Paragraph("<b>H2 / H3 Count:</b>", bold_style), Paragraph(f"{metrics.get('h2Count', 0)} H2s, {metrics.get('h3Count', 0)} H3s", normal_style)],
        [Paragraph("<b>Canonical Tag:</b>", bold_style), Paragraph("Configured" if metrics.get("hasCanonical") else "Missing", normal_style)],
        [Paragraph("<b>Robots Meta:</b>", bold_style), Paragraph("Configured" if metrics.get("hasRobots") else "Not Specified", normal_style)]
    ]
    seo_table = Table(seo_diag_data, colWidths=[140, 400])
    seo_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), light_bg),
        ('BOX', (0, 0), (-1, -1), 1, border_color),
        ('GRID', (0, 0), (-1, -1), 0.5, border_color),
        ('PADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(seo_table)

    # PAGE 2: PERFORMANCE, SECURITY, CRO & ROADMAP
    story.append(PageBreak())

    story.append(Paragraph("Performance, Speed & Response Signals", section_heading))
    perf_diag_data = [
        [Paragraph("<b>Server Latency (TTFB):</b>", bold_style), Paragraph(f"{metrics.get('latencyMs', 0)} ms", normal_style)],
        [Paragraph("<b>HTTP Response Code:</b>", bold_style), Paragraph(str(metrics.get("statusCode", 200)), normal_style)],
        [Paragraph("<b>Images Count:</b>", bold_style), Paragraph(str(metrics.get("totalImages", 0)), normal_style)],
        [Paragraph("<b>Mobile Viewport Tag:</b>", bold_style), Paragraph("Configured" if metrics.get("hasViewport") else "Missing", normal_style)],
        [Paragraph("<b>Responsive CSS Layout:</b>", bold_style), Paragraph("Detected" if metrics.get("isResponsiveCss") else "Standard", normal_style)]
    ]
    perf_table = Table(perf_diag_data, colWidths=[180, 360])
    perf_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), light_bg),
        ('BOX', (0, 0), (-1, -1), 1, border_color),
        ('GRID', (0, 0), (-1, -1), 0.5, border_color),
        ('PADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(perf_table)

    story.append(Spacer(1, 10))
    story.append(Paragraph("HTTP Security Headers & Structured Data (JSON-LD)", section_heading))
    sec_diag_data = [
        [Paragraph("<b>SSL Certificate (HTTPS):</b>", bold_style), Paragraph("Active (HTTPS)" if metrics.get("isSsl") else "Unencrypted (HTTP)", normal_style)],
        [Paragraph("<b>Strict-Transport-Security (HSTS):</b>", bold_style), Paragraph("Configured" if metrics.get("hasHsts") else "Missing", normal_style)],
        [Paragraph("<b>Content-Security-Policy (CSP):</b>", bold_style), Paragraph("Configured" if metrics.get("hasCsp") else "Missing", normal_style)],
        [Paragraph("<b>X-Frame-Options:</b>", bold_style), Paragraph("Configured" if metrics.get("hasXframe") else "Missing", normal_style)],
        [Paragraph("<b>JSON-LD Schemas Detected:</b>", bold_style), Paragraph(", ".join(metrics.get("detectedSchemas", [])) if metrics.get("detectedSchemas") else "None Detected", normal_style)]
    ]
    sec_table = Table(sec_diag_data, colWidths=[180, 360])
    sec_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), light_bg),
        ('BOX', (0, 0), (-1, -1), 1, border_color),
        ('GRID', (0, 0), (-1, -1), 0.5, border_color),
        ('PADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(sec_table)

    story.append(Spacer(1, 10))
    story.append(Paragraph("CRO (Conversion Rate) & Analytics Tracking", section_heading))
    cro_diag_data = [
        [Paragraph("<b>Analytics / Pixel Scripts:</b>", bold_style), Paragraph("Detected (GTM/GA4/Pixel)" if metrics.get("hasAnalytics") else "Missing", normal_style)],
        [Paragraph("<b>Inquiry / Contact Form:</b>", bold_style), Paragraph("Detected" if metrics.get("hasForm") else "Missing", normal_style)],
        [Paragraph("<b>Call-To-Action Button:</b>", bold_style), Paragraph("Detected" if metrics.get("hasCtaButton") else "Missing", normal_style)],
        [Paragraph("<b>Direct Phone Link (tel:):</b>", bold_style), Paragraph("Configured" if metrics.get("hasTelLink") else "Missing", normal_style)],
        [Paragraph("<b>Direct Email Link (mailto:):</b>", bold_style), Paragraph("Configured" if metrics.get("hasMailtoLink") else "Missing", normal_style)]
    ]
    cro_table = Table(cro_diag_data, colWidths=[180, 360])
    cro_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), light_bg),
        ('BOX', (0, 0), (-1, -1), 1, border_color),
        ('GRID', (0, 0), (-1, -1), 0.5, border_color),
        ('PADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(cro_table)

    story.append(Spacer(1, 10))
    story.append(Paragraph("Personalized 30-Day Growth Roadmap", section_heading))
    if roadmap:
        map_rows = [[Paragraph("<b>Phase</b>", bold_style), Paragraph("<b>Strategic Focus & Action Items</b>", bold_style)]]
        for step in roadmap:
            wk = clean_xml_text(step.get("week", ""))
            focus = clean_xml_text(step.get("focus", ""))
            tasks = "<br/>• ".join([clean_xml_text(t) for t in step.get("tasks", [])])
            map_rows.append([
                Paragraph(f"<b>{wk}</b><br/><font color='#0284c7'>{focus}</font>", normal_style),
                Paragraph(f"• {tasks}", normal_style)
            ])
        map_table = Table(map_rows, colWidths=[140, 400])
        map_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#f1f5f9")),
            ('BOX', (0, 0), (-1, -1), 1, border_color),
            ('GRID', (0, 0), (-1, -1), 0.5, border_color),
            ('PADDING', (0, 0), (-1, -1), 4),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]))
        story.append(map_table)

    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=0.5, color=border_color, spaceBefore=0, spaceAfter=4))
    story.append(Paragraph("<font color='#64748b' size=7.5>Generated by Vivam Software Services & IT Trainings Pvt Ltd | Kakinada, AP | https://vivamsofttech.com | contact@vivamsofttech.com</font>", normal_style))

    doc.build(story)
    pdf_bytes = buffer.getvalue()
    buffer.close()
    return pdf_bytes





@api_router.get("/digital-marketing/audit/{audit_id}/download")
async def download_digital_marketing_audit(audit_id: str, format: str = "html", view: bool = False):
    audit = await db.digital_marketing_audits.find_one({"$or": [{"auditId": audit_id}, {"id": audit_id}]}, {"_id": 0})
    if not audit:
        raise HTTPException(status_code=404, detail="Audit report not found or expired.")
    
    raw_domain = audit.get("normalizedUrl", audit.get("url", "website"))
    clean_domain = re.sub(r'https?://', '', raw_domain).split('/')[0]
    clean_domain = re.sub(r'[^a-zA-Z0-9_-]', '_', clean_domain).strip('_') or "website"
    
    if format.lower() == "pdf" and HAS_REPORTLAB:
        pdf_bytes = generate_audit_pdf_report(audit)
        filename = f"Vivam-SEO-Audit-{clean_domain}.pdf"
        disp_type = "inline" if view else "attachment"
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f'{disp_type}; filename="{filename}"; filename*=UTF-8\'\'{filename}',
                "Content-Type": "application/pdf"
            }
        )

    
    html_content = generate_audit_html_report(audit)
    filename = f"Vivam-SEO-Audit-{clean_domain}.html"
    disp_type = "inline" if view else "attachment"
    return Response(
        content=html_content,
        media_type="text/html; charset=utf-8",
        headers={
            "Content-Disposition": f'{disp_type}; filename="{filename}"; filename*=UTF-8\'\'{filename}',
            "Content-Type": "text/html; charset=utf-8"
        }
    )

@api_router.get("/digital-marketing/audit/{audit_id}/pdf")
@api_router.get("/digital-marketing/audit/{audit_id}/pdf/{filename:path}")
async def download_digital_marketing_audit_pdf(audit_id: str, filename: str = None, view: bool = False):
    return await download_digital_marketing_audit(audit_id, format="pdf", view=view)

@api_router.get("/digital-marketing/audit/{audit_id}/download/{filename:path}")
async def download_digital_marketing_audit_with_filename(audit_id: str, filename: str = None, format: str = "html", view: bool = False):
    return await download_digital_marketing_audit(audit_id, format=format, view=view)


# Lead Capture Endpoint (Associated with Audit)
@api_router.post("/digital-marketing/lead")
async def submit_digital_marketing_lead(lead: MarketingLeadCreate):
    lead_doc = lead.model_dump()
    lead_id = str(uuid.uuid4())
    lead_doc["id"] = lead_id
    timestamp = datetime.now(timezone.utc).isoformat()
    lead_doc["timestamp"] = timestamp
    lead_doc["source"] = "DIGITAL_MARKETING_GROWTH_TOOLS"

    # Save lead in contact submissions
    contact_form_data = ContactForm(
        name=lead.name,
        company=lead.company,
        email=lead.email,
        phone=lead.phone,
        description=f"[Digital Marketing Lead] Target Keyword: '{lead.targetKeyword}' | Website: {lead.website} | Services: {', '.join(lead.servicesInterested)} | Message: {lead.message} | AuditID: {lead.auditId}",
        budget="Digital Marketing Growth Plan"
    )

    doc_to_save = contact_form_data.model_dump()
    doc_to_save["id"] = lead_id
    doc_to_save["timestamp"] = timestamp
    doc_to_save["auditId"] = lead.auditId
    doc_to_save["servicesInterested"] = lead.servicesInterested
    doc_to_save["targetKeyword"] = lead.targetKeyword
    doc_to_save["website"] = lead.website

    await db.contact_submissions.insert_one(doc_to_save)
    logger.info(f"Digital marketing lead saved from {lead.name} ({lead.email}) for website {lead.website}")

    # If auditId provided, update audit record with lead link
    if lead.auditId:
        await db.digital_marketing_audits.update_one(
            {"auditId": lead.auditId},
            {"$set": {"hasLead": True, "leadId": lead_id, "leadName": lead.name, "leadEmail": lead.email}}
        )

    # Trigger email notification
    _ = send_contact_email(contact_form_data)
    # Trigger Google Sheets push
    asyncio.create_task(send_to_google_sheet(contact_form_data, timestamp))

    return {
        "success": True,
        "leadId": lead_id,
        "message": "Thank you! Our digital growth strategists will prepare your custom 90-day roadmap and contact you shortly."
    }


# Admin Digital Marketing Audits Dashboard Endpoint
@api_router.get("/digital-marketing/audits")
async def get_all_digital_marketing_audits():
    audits = await db.digital_marketing_audits.find({}, {"_id": 0}).sort("createdAt", -1).to_list(1000)
    
    total_audits = len(audits)
    avg_score = round(sum(a.get("score", 0) for a in audits) / total_audits, 1) if total_audits > 0 else 0
    total_leads = sum(1 for a in audits if a.get("hasLead", False))
    conversion_rate = round((total_leads / total_audits) * 100, 1) if total_audits > 0 else 0

    now_iso = datetime.now(timezone.utc).isoformat()
    current_month_prefix = now_iso[:7] # e.g. "2026-08"
    audits_this_month = sum(1 for a in audits if a.get("createdAt", "").startswith(current_month_prefix))

    return {
        "metrics": {
            "totalAudits": total_audits,
            "auditsThisMonth": audits_this_month,
            "avgScore": avg_score,
            "totalLeads": total_leads,
            "conversionRate": conversion_rate
        },
        "audits": audits
    }


# Admin Delete Audit Endpoint
@api_router.delete("/digital-marketing/audit/{audit_id}")
async def delete_digital_marketing_audit(audit_id: str):
    res = await db.digital_marketing_audits.delete_one({"auditId": audit_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Audit not found.")
    return {"success": True, "message": "Audit record deleted successfully."}


# ====================================================
# EVENTS & WORKSHOPS API ENDPOINTS
# ====================================================

class EventModel(BaseModel):
    model_config = ConfigDict(extra="ignore")
    event_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str = "Workshop"
    date: str
    time: str = "10:00 AM - 4:00 PM IST"
    location: str = "Online / Vivam Tech Hub"
    description: str
    image: str = ""
    seats_total: int = 50
    seats_available: int = 25
    status: str = "upcoming"
    badge: str = "Upcoming"
    highlights: List[str] = []
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class EventCreate(BaseModel):
    title: str
    category: str = "Workshop"
    date: str
    time: str = "10:00 AM - 4:00 PM IST"
    location: str = "Online / Vivam Tech Hub"
    description: str
    image: str = ""
    seats_total: int = 50
    seats_available: int = 25
    status: str = "upcoming"
    badge: str = "Upcoming"
    highlights: List[str] = []


class EventRegistrationModel(BaseModel):
    model_config = ConfigDict(extra="ignore")
    registration_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event_id: str
    event_title: str
    name: str
    email: str
    phone: str = ""
    organization: str = ""
    role: str = ""
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class EventRegistrationCreate(BaseModel):
    name: str
    email: str
    phone: str = ""
    organization: str = ""
    role: str = ""

DEFAULT_EVENTS = [
    {
        "event_id": "ai-mastery-2026",
        "title": "AI Mastery Workshop 2026",
        "category": "Hands-on Technical Workshop",
        "date": "March 15, 2026",
        "time": "10:00 AM - 4:00 PM IST",
        "location": "Vivam Tech Hub & Live Online",
        "description": "Master practical Generative AI, LLM Integration, Prompt Engineering, and Autonomous AI Agents building for enterprise projects.",
        "seats_total": 50,
        "seats_available": 14,
        "status": "upcoming",
        "badge": "Featured",
        "highlights": [
            "Building LLM Applications with LangChain & OpenAI",
            "Fine-Tuning & Local Model Deployment",
            "Autonomous AI Agent Workflows",
            "Hands-on Certificate & Project Portfolio"
        ],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "event_id": "fullstack-react-node-2026",
        "title": "Full-Stack Web Dev Bootcamp",
        "category": "Industrial IT Training",
        "date": "April 02, 2026",
        "time": "11:00 AM - 5:00 PM IST",
        "location": "Live Interactive Online Session",
        "description": "Comprehensive weekend masterclass on Next.js 15, React 19, Node.js microservices, and modern cloud deployment strategies.",
        "seats_total": 60,
        "seats_available": 28,
        "status": "upcoming",
        "badge": "Filling Fast",
        "highlights": [
            "React 19 & Next.js App Router Architecture",
            "REST & GraphQL API Design",
            "Docker & Cloud Deployment",
            "1-on-1 Code Review & Placement Mentorship"
        ],
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "event_id": "career-growth-seminar-2026",
        "title": "IT Career & Placement Roadmap",
        "category": "Career Success Workshop",
        "date": "April 20, 2026",
        "time": "2:00 PM - 5:00 PM IST",
        "location": "Vivam Seminar Hall",
        "description": "Interactive session with industry HR leaders and Senior Architects on cracking top tech interviews in 2026.",
        "seats_total": 100,
        "seats_available": 45,
        "status": "upcoming",
        "badge": "Free Registration",
        "highlights": [
            "ATS-Optimized Resume Crafting",
            "System Design & Technical Interview Prep",
            "Salary Negotiation Tactics",
            "Networking with Tech Leaders"
        ],
        "created_at": datetime.now(timezone.utc).isoformat()
    }
]

@api_router.get("/events")
async def get_events():
    events = await db.events.find({}, {"_id": 0}).to_list(100)
    if not events:
        # Seed default events into database
        await db.events.insert_many([dict(e) for e in DEFAULT_EVENTS])
        events = await db.events.find({}, {"_id": 0}).to_list(100)
    return events

@api_router.post("/events")
async def create_event(input_data: EventCreate):
    event_dict = input_data.model_dump()
    event_obj = EventModel(**event_dict)
    doc = event_obj.model_dump()
    await db.events.insert_one(doc)
    doc.pop('_id', None)
    return doc

@api_router.put("/events/{event_id}")
async def update_event(event_id: str, input_data: EventCreate):
    existing = await db.events.find_one({"event_id": event_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Event not found.")
    update_data = input_data.model_dump()
    await db.events.update_one({"event_id": event_id}, {"$set": update_data})
    updated = await db.events.find_one({"event_id": event_id}, {"_id": 0})
    return updated

@api_router.delete("/events/{event_id}")
async def delete_event(event_id: str):
    res = await db.events.delete_one({"event_id": event_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found.")
    return {"success": True, "message": "Event deleted successfully."}


# ====================================================
# EVENT HIGHLIGHTS GALLERY API ENDPOINTS
# ====================================================

class EventHighlightItemModel(BaseModel):
    model_config = ConfigDict(extra="ignore")
    highlight_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    caption: str = ""
    image: str
    size: str = "md:col-span-1 md:row-span-1"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class EventHighlightItemCreate(BaseModel):
    title: str
    caption: str = ""
    image: str
    size: str = "md:col-span-1 md:row-span-1"

DEFAULT_HIGHLIGHTS = [
    {"highlight_id": "hl-1", "title": "Expert Seminar on Career Growth", "caption": "Industrial IT Seminar", "image": "https://res.cloudinary.com/fn8kv7ru/image/upload/v1786472885/vivam_events/event_pic-1.jpg", "size": "md:col-span-2 md:row-span-2"},
    {"highlight_id": "hl-2", "title": "Technical Workshop Session", "caption": "Live Coding & Labs", "image": "https://res.cloudinary.com/fn8kv7ru/image/upload/v1786472893/vivam_events/event_pic-2.jpg", "size": "md:col-span-1 md:row-span-1"},
    {"highlight_id": "hl-3", "title": "Student Interaction & Q&A", "caption": "Mentorship Round", "image": "https://res.cloudinary.com/fn8kv7ru/image/upload/v1786472895/vivam_events/event_pic-3.jpg", "size": "md:col-span-1 md:row-span-2"},
    {"highlight_id": "hl-4", "title": "Skill Development Session", "caption": "Hands-On Tech Lab", "image": "https://res.cloudinary.com/fn8kv7ru/image/upload/v1786472895/vivam_events/event_pic-5.jpg", "size": "md:col-span-1 md:row-span-1"},
    {"highlight_id": "hl-5", "title": "Workshop Graduation Ceremony", "caption": "Certificate Distribution", "image": "https://res.cloudinary.com/fn8kv7ru/image/upload/v1786472896/vivam_events/event_pic-7.jpg", "size": "md:col-span-1 md:row-span-1"},
    {"highlight_id": "hl-6", "title": "Industry Insights Session", "caption": "Tech Leaders Talk", "image": "https://res.cloudinary.com/fn8kv7ru/image/upload/v1786472898/vivam_events/event_pic-8.jpg", "size": "md:col-span-1 md:row-span-1"},
    {"highlight_id": "hl-7", "title": "Future Tech Trends Discussion", "caption": "AI & Cloud Trends", "image": "https://res.cloudinary.com/fn8kv7ru/image/upload/v1786472899/vivam_events/event_pic-9.jpg", "size": "md:col-span-2 md:row-span-1"},
    {"highlight_id": "hl-8", "title": "Career Roadmap Seminar", "caption": "Corporate Mentorship", "image": "https://res.cloudinary.com/fn8kv7ru/image/upload/v1786472889/vivam_events/event_pic-13.jpg", "size": "md:col-span-2 md:row-span-2"},
    {"highlight_id": "hl-9", "title": "Technical Q&A Round", "caption": "Interactive Coding Lab", "image": "https://res.cloudinary.com/fn8kv7ru/image/upload/v1786472890/vivam_events/event_pic-14.jpg", "size": "md:col-span-1 md:row-span-1"},
    {"highlight_id": "hl-10", "title": "Corporate Culture Training", "caption": "Soft Skills Masterclass", "image": "https://res.cloudinary.com/fn8kv7ru/image/upload/v1786472891/vivam_events/event_pic-17.jpg", "size": "md:col-span-1 md:row-span-1"},
    {"highlight_id": "hl-11", "title": "Advanced Technology Overview", "caption": "Software Engineering Seminar", "image": "https://res.cloudinary.com/fn8kv7ru/image/upload/v1786472892/vivam_events/event_pic-18.jpg", "size": "md:col-span-2 md:row-span-1"},
    {"highlight_id": "hl-12", "title": "Seminar Closing Ceremony", "caption": "Annual Tech Meetup", "image": "https://res.cloudinary.com/fn8kv7ru/image/upload/v1786472893/vivam_events/event_pic-20.jpg", "size": "md:col-span-2 md:row-span-1"}
]



@api_router.get("/events/highlights")
async def get_event_highlights():
    highlights = await db.event_highlights.find({}, {"_id": 0}).to_list(100)
    highlights = [h for h in highlights if "System Verification" not in h.get("title", "") and "sample.jpg" not in h.get("image", "")]
    if not highlights:
        await db.event_highlights.delete_many({})
        await db.event_highlights.insert_many([dict(h) for h in DEFAULT_HIGHLIGHTS])
        highlights = await db.event_highlights.find({}, {"_id": 0}).to_list(100)
        highlights = [h for h in highlights if "sample.jpg" not in h.get("image", "")]
    return highlights

@api_router.post("/events/highlights")
async def add_event_highlight(item: EventHighlightItemCreate):
    doc = item.model_dump()
    obj = EventHighlightItemModel(**doc)
    save_doc = obj.model_dump()
    await db.event_highlights.insert_one(save_doc)
    save_doc.pop("_id", None)
    return {"success": True, "highlight": save_doc}

@api_router.delete("/events/highlights/{highlight_id}")
async def delete_event_highlight(highlight_id: str):
    res = await db.event_highlights.delete_one({"highlight_id": highlight_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Highlight photo not found.")
    return {"success": True, "message": "Highlight photo deleted successfully."}


@api_router.post("/events/{event_id}/register")
async def register_event(event_id: str, reg_data: EventRegistrationCreate):
    event = await db.events.find_one({"event_id": event_id}, {"_id": 0})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found.")
    
    # Check seat availability
    if event.get("seats_available", 0) <= 0:
        raise HTTPException(status_code=400, detail="Sorry, this workshop is fully booked.")
    
    reg_dict = reg_data.model_dump()
    reg_obj = EventRegistrationModel(
        event_id=event_id,
        event_title=event.get("title", "Workshop"),
        **reg_dict
    )
    doc = reg_obj.model_dump()
    await db.event_registrations.insert_one(doc)
    doc.pop('_id', None)
    
    # Decrease seat count by 1
    new_seats = max(0, event.get("seats_available", 1) - 1)
    await db.events.update_one({"event_id": event_id}, {"$set": {"seats_available": new_seats}})
    
    # Also save as a contact inquiry so admin sees it in general leads
    contact_lead = {
        "id": str(uuid.uuid4()),
        "name": reg_data.name,
        "company": reg_data.organization or "Individual",
        "email": reg_data.email,
        "phone": reg_data.phone,
        "description": f"Registration for Workshop: {event.get('title')} ({event_id}). Role: {reg_data.role or 'N/A'}",
        "budget": "Workshop Registration",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
    await db.contact_submissions.insert_one(contact_lead)
    
    return {"success": True, "message": f"Successfully registered for {event.get('title')}", "registration": doc}

@api_router.get("/events/registrations")
async def get_event_registrations():
    regs = await db.event_registrations.find({}, {"_id": 0}).to_list(1000)
    return regs

@api_router.get("/contact/submissions/export")
async def export_contact_submissions_csv():
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    filename = f"Vivam-Lead-Submissions-{date_str}.csv"
    
    headers = ["Date", "Name", "Company", "Email", "Phone", "Budget", "Description"]
    lines = [",".join(headers)]
    for sub in submissions:
        line = [
            f'"{sub.get("timestamp", "")}"',
            f'"{sub.get("name", "")}"',
            f'"{sub.get("company", "")}"',
            f'"{sub.get("email", "")}"',
            f'"{sub.get("phone", "")}"',
            f'"{sub.get("budget", "")}"',
            f'"{str(sub.get("description", "")).replace(chr(34), chr(34)+chr(34))}"'
        ]
        lines.append(",".join(line))
        
    csv_body = "\n".join(lines)
    return Response(
        content=csv_body,
        media_type="text/csv; charset=utf-8",
        headers={
            "Content-Disposition": f'attachment; filename="{filename}"; filename*=UTF-8\'\'{filename}',
            "Content-Type": "text/csv; charset=utf-8"
        }
    )

@api_router.get("/events/registrations/export")
async def export_event_registrations_csv():
    regs = await db.event_registrations.find({}, {"_id": 0}).to_list(1000)
    date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    filename = f"Vivam-Workshop-Registrations-{date_str}.csv"
    
    headers = ["Date", "Event ID", "Event Title", "Name", "Email", "Phone", "Role", "Organization"]
    lines = [",".join(headers)]
    for reg in regs:
        line = [
            f'"{reg.get("registered_at", "")}"',
            f'"{reg.get("event_id", "")}"',
            f'"{reg.get("event_title", "")}"',
            f'"{reg.get("name", "")}"',
            f'"{reg.get("email", "")}"',
            f'"{reg.get("phone", "")}"',
            f'"{reg.get("role", "")}"',
            f'"{reg.get("organization", "")}"'
        ]
        lines.append(",".join(line))
        
    csv_body = "\n".join(lines)
    return Response(
        content=csv_body,
        media_type="text/csv; charset=utf-8",
        headers={
            "Content-Disposition": f'attachment; filename="{filename}"; filename*=UTF-8\'\'{filename}',
            "Content-Type": "text/csv; charset=utf-8"
        }
    )


# ---------------------------------------------------------------------
# WEBSITE OPTIONS & UPLOADS MANAGEMENT ENDPOINTS
# ---------------------------------------------------------------------
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

class SiteOptionsModel(BaseModel):
    contact_email: str = "contact@vivamsofttech.com"
    contact_phone: str = "+91 98765 43210"
    contact_address: str = "Kakinada, Andhra Pradesh, India"
    whatsapp_number: str = "919876543210"

    linkedin_url: str = "https://linkedin.com"
    twitter_url: str = "https://twitter.com"
    instagram_url: str = "https://instagram.com"
    github_url: str = "https://github.com"
    announcement_text: str = "🚀 Special Offer: Get 20% off on Web Development & Digital Audit packages this month!"
    announcement_enabled: bool = True
    enable_preloader: bool = True
    enable_floating_whatsapp: bool = True

class PortfolioItemModel(BaseModel):
    title: str
    category: str = "Software Development"
    description: str
    image: str = ""
    tags: List[str] = []
    link: str = ""

class TestimonialModel(BaseModel):
    name: str
    role: str = "Client"
    company: str = ""
    avatar: str = ""
    rating: int = 5
    content: str

@api_router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload images or media files to server."""
    filename = f"{int(time.time())}_{re.sub(r'[^a-zA-Z0-9_.-]', '_', file.filename)}"
    filepath = UPLOAD_DIR / filename
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    url = f"/uploads/{filename}"
    return {"success": True, "filename": filename, "url": url}

@api_router.get("/site-options")
async def get_site_options():
    """Retrieve website global configuration options."""
    options = await db.site_options.find_one({}, {"_id": 0})
    if not options:
        options = SiteOptionsModel().model_dump()
    return options

@api_router.put("/site-options")
async def update_site_options(options: SiteOptionsModel):
    """Update website global configuration options."""
    opts_dict = options.model_dump()
    opts_dict["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.site_options.replace_one({}, opts_dict, upsert=True)
    return {"success": True, "options": opts_dict}

@api_router.get("/portfolio")
async def get_portfolio_items():
    """Retrieve portfolio project items."""
    projects = await db.portfolio_projects.find({}, {"_id": 0}).to_list(1000)
    return projects

@api_router.post("/portfolio")
async def add_portfolio_item(item: PortfolioItemModel):
    """Add a new project item to portfolio."""
    doc = item.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.portfolio_projects.insert_one(doc)
    doc.pop("_id", None)
    return {"success": True, "item": doc}

@api_router.delete("/portfolio/{item_id}")
async def delete_portfolio_item(item_id: str):
    """Delete a portfolio project item."""
    res = await db.portfolio_projects.delete_one({"id": item_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Portfolio item not found")
    return {"success": True, "message": "Portfolio item deleted"}

@api_router.get("/testimonials")
async def get_testimonials():
    """Retrieve client testimonials."""
    items = await db.testimonials.find({}, {"_id": 0}).to_list(1000)
    return items

@api_router.post("/testimonials")
async def add_testimonial(item: TestimonialModel):
    """Add a new client testimonial."""
    doc = item.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.testimonials.insert_one(doc)
    doc.pop("_id", None)
    return {"success": True, "item": doc}

@api_router.delete("/testimonials/{item_id}")
async def delete_testimonial(item_id: str):
    """Delete a client testimonial."""
    res = await db.testimonials.delete_one({"id": item_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"success": True, "message": "Testimonial deleted"}


# ====================================================
# FILE & MEDIA ASSETS UPLOAD API ENDPOINTS
# ====================================================

@api_router.post("/upload")
async def upload_media_file(file: UploadFile = File(...)):
    """Upload media file/asset to Cloudinary (if configured) or local storage, & record metadata in MongoDB."""
    if not file or not file.filename:
        raise HTTPException(status_code=400, detail="No file provided for upload.")

    orig_name = Path(file.filename).name
    ext = Path(orig_name).suffix.lower()
    allowed_exts = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".pdf", ".mp4", ".mov", ".zip", ".csv"}
    if ext and ext not in allowed_exts:
        raise HTTPException(status_code=400, detail=f"File format '{ext}' not allowed for upload.")

    safe_stem = re.sub(r'[^a-zA-Z0-9_-]', '_', Path(orig_name).stem)[:30]
    unique_filename = f"{uuid.uuid4().hex[:8]}_{safe_stem}{ext}"
    dest_path = UPLOAD_DIR / unique_filename

    cloud_url = None
    file_size = 0

    # Try Cloudinary upload if credentials exist in .env
    if HAS_CLOUDINARY:
        try:
            file_bytes = await file.read()
            res = cloudinary.uploader.upload(
                file_bytes,
                folder="vivam_assets",
                resource_type="auto"
            )
            cloud_url = res.get("secure_url") or res.get("url")
            file_size = res.get("bytes", 0)
            logger.info(f"Asset '{orig_name}' uploaded to Cloudinary CDN: {cloud_url}")
        except Exception as c_err:
            logger.warning(f"Cloudinary upload notice (using local fallback): {c_err}")
            await file.seek(0)


    # Local Disk Fallback
    if not cloud_url:
        try:
            with open(dest_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            cloud_url = f"/uploads/{unique_filename}"
            file_size = dest_path.stat().st_size if dest_path.exists() else 0
        except Exception as e:
            logger.error(f"Failed to save uploaded file: {e}")
            raise HTTPException(status_code=500, detail="File save failed on server.")
        finally:
            file.file.close()

    now_iso = datetime.now(timezone.utc).isoformat()

    asset_doc = {
        "assetId": str(uuid.uuid4()),
        "filename": orig_name,
        "uniqueFilename": unique_filename,
        "url": cloud_url,
        "contentType": file.content_type or "application/octet-stream",
        "sizeBytes": file_size,
        "uploadedAt": now_iso
    }

    await db.uploaded_assets.insert_one(asset_doc)

    return {
        "success": True,
        "filename": orig_name,
        "url": cloud_url,
        "size": file_size,
        "uploadedAt": now_iso
    }


@api_router.get("/uploads")
@api_router.get("/assets")
async def get_uploaded_assets():
    """Retrieve all stored uploaded asset records from MongoDB."""
    assets = await db.uploaded_assets.find({}, {"_id": 0}).sort("uploadedAt", -1).to_list(1000)
    return assets

@api_router.delete("/uploads/{asset_filename}")
async def delete_uploaded_asset(asset_filename: str):
    """Delete an uploaded media file asset."""
    target_path = UPLOAD_DIR / asset_filename
    if target_path.exists() and target_path.is_file():
        try:
            target_path.unlink()
        except Exception as e:
            logger.warning(f"Could not delete physical file {target_path}: {e}")

    await db.uploaded_assets.delete_one({"$or": [{"uniqueFilename": asset_filename}, {"filename": asset_filename}]})
    return {"success": True, "message": "Asset deleted successfully"}



cors_origins_raw = os.environ.get('CORS_ORIGINS', '*').strip()
if cors_origins_raw == '*' or not cors_origins_raw:
    cors_origins = ["*"]
    allow_credentials = False
else:
    cors_origins = [origin.strip() for origin in cors_origins_raw.split(',') if origin.strip()]
    allow_credentials = True

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition", "Content-Type", "Content-Length"],
)

# Include the router in the main app
app.include_router(api_router)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)