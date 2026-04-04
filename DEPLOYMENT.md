# AWS Deployment Guide (GitHub Linked)

This guide explains how to deploy the **Vivam Software Services** application to AWS using your GitHub repository.

## Prerequisites
1.  Push all changes (including the new `Dockerfile` and `amplify.yml`) to your GitHub repository: `https://github.com/Vasu1405-tech/vivam_profile3.git`.
2.  Have an AWS Account ready.
3.  Have a MongoDB Atlas connection string.

---

## 1. Backend Deployment (AWS App Runner)
AWS App Runner will automatically build and deploy your FastAPI backend whenever you push to GitHub.

1.  **Create Service**: Go to the [AWS App Runner Console](https://console.aws.amazon.com/apprunner).
2.  **Source**: 
    -   Repository Type: **Source code repository**.
    -   Connect your GitHub account and select `Vasu1405-tech/vivam_profile3`.
    -   Deployment Settings: **Automatic**.
3.  **Configure Build**:
    -   Runtime: **Python 3**.
    -   Build Command: `pip install -r backend/requirements.txt`.
    -   Start Command: `python backend/server.py`.
    -   Port: `8001`.
    -   *Note: Since we added a `Dockerfile` in `/backend`, you can also choose "Configuration file" to use the Dockerfile automatically.*
4.  **Environment Variables**:
    -   `MONGO_URL`: `mongodb+srv://...` (Your Atlas string).
    -   `DB_NAME`: `vivam_db`.
    -   `CORS_ORIGINS`: `https://main.dXXXXXXXXXXXX.amplifyapp.com` (Your Amplify URL, come back here after Phase 2).

---

## 2. Frontend Deployment (AWS Amplify)
AWS Amplify provides a managed CDN it handles SSL and CI/CD.

1.  **Create App**: Go to the [AWS Amplify Console](https://console.aws.amazon.com/amplify).
2.  **Connect Repo**: Select GitHub and the `Vasu1405-tech/vivam_profile3` repository.
3.  **App Settings**:
    -   Amplify will detect the `frontend/` directory.
    -   It will use the `frontend/amplify.yml` we created.
4.  **Environment Variables**:
    -   Add `REACT_APP_BACKEND_URL`: Set this to your **App Runner URL** (e.g., `https://abc1234.us-east-1.awsapprunner.com`).
5.  **Save and Deploy**: Amplify will build your site and provide a `.amplifyapp.com` URL.

---

## 3. Important Loop-back
Once your Frontend is deployed and you have its URL (`https://...amplifyapp.com`), go back to your **App Runner Service** settings and update the `CORS_ORIGINS` environment variable with that URL. This allows the frontend to talk to the backend securely.
