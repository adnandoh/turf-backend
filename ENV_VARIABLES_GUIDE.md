# 🔧 Environment Variables Guide - Turf Booking System

## 📋 Overview

This guide explains all environment variables used across the Turf Booking System components:
- **Backend** (Django API)
- **Customer Frontend** (turf-main)
- **Admin Frontend** (turf-admin)

## 🗂️ File Structure

```
├── .env                           # Backend development
├── .env.production               # Backend production
├── turf-main/.env               # Customer frontend development
├── turf-main/.env.production    # Customer frontend production
├── turf-admin/.env              # Admin frontend development
└── turf-admin/.env.production   # Admin frontend production
```

## 🔐 Backend Environment Variables

### Core Django Settings
| Variable | Description | Development | Production |
|----------|-------------|-------------|------------|
| `SECRET_KEY` | Django secret key | Auto-generated | **Change this!** |
| `DEBUG` | Debug mode | `True` | `False` |
| `ALLOWED_HOSTS` | Allowed hostnames | `localhost,127.0.0.1` | Your domains |

### Database Configuration
| Variable | Description | Value |
|----------|-------------|-------|
| `DATABASE_URL` | PostgreSQL connection string | Railway PostgreSQL URL |
| `DB_ENGINE` | Database engine | `django.db.backends.postgresql` |
| `DB_NAME` | Database name | `railway` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | Railway password |
| `DB_HOST` | Database host | Railway host |
| `DB_PORT` | Database port | Railway port |

### Railway Deployment
| Variable | Description | Set by Railway |
|----------|-------------|----------------|
| `RAILWAY_STATIC_URL` | Static files URL | ✅ Auto |
| `RAILWAY_GIT_COMMIT_SHA` | Git commit hash | ✅ Auto |
| `RAILWAY_PUBLIC_DOMAIN` | Public domain | ✅ Auto |

### CORS Configuration
| Variable | Description | Example |
|----------|-------------|---------|
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origins | `https://yourapp.com,https://admin.yourapp.com` |

## 🎯 Frontend Environment Variables

### Customer Frontend (turf-main)
| Variable | Description | Development | Production |
|----------|-------------|-------------|------------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:8000` | `https://your-app.railway.app` |
| `VITE_DEBUG` | Debug mode | `true` | `false` |
| `VITE_SITE_URL` | Frontend URL | `http://localhost:5173` | `https://yourapp.com` |

### Admin Frontend (turf-admin)
| Variable | Description | Development | Production |
|----------|-------------|-------------|------------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:8000` | `https://your-app.railway.app` |
| `VITE_DEBUG` | Debug mode | `true` | `false` |
| `VITE_SITE_URL` | Admin URL | `http://localhost:5174` | `https://admin.yourapp.com` |

## 🚀 Deployment Setup

### 1. Railway Backend Deployment
Set these environment variables in Railway dashboard:

```bash
DATABASE_URL=postgresql://postgres:rZmXHNPYZYODBemYJHzmKllSpzjiXFjZ@postgres.railway.internal:5432/railway
SECRET_KEY=your-super-secret-production-key
DEBUG=False
CORS_ALLOWED_ORIGINS=https://your-customer-app.vercel.app,https://your-admin-app.vercel.app
```

### 2. Vercel Frontend Deployment
For both customer and admin frontends, set:

```bash
VITE_API_BASE_URL=https://your-app.railway.app
VITE_NODE_ENV=production
VITE_DEBUG=false
```

### 3. Local Development Setup

**Backend:**
```bash
cp .env.example .env
# Edit .env with your local settings
```

**Customer Frontend:**
```bash
cd turf-main
cp .env.example .env
# Edit .env with your local settings
```

**Admin Frontend:**
```bash
cd turf-admin
cp .env.example .env
# Edit .env with your local settings
```

## 🔒 Security Best Practices

### ⚠️ Never Commit These to Git:
- Production secret keys
- Database passwords
- API keys
- Authentication tokens

### ✅ Always Change in Production:
- `SECRET_KEY` - Generate new one
- `ADMIN_PASSWORD` - Use strong password
- `DEBUG=False` - Never true in production
- Database credentials - Use environment-specific

### 🛡️ Security Headers (Production):
```bash
SECURE_SSL_REDIRECT=True
SECURE_BROWSER_XSS_FILTER=True
SECURE_CONTENT_TYPE_NOSNIFF=True
SECURE_HSTS_SECONDS=31536000
X_FRAME_OPTIONS=DENY
```

## 🔧 Common Configuration Patterns

### API URLs by Environment:
```bash
# Development
VITE_API_BASE_URL=http://localhost:8000

# Staging
VITE_API_BASE_URL=https://staging-api.yourapp.com

# Production
