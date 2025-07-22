# Local Development Setup Guide

## Problem Fixed

The issue was that your frontend applications were hardcoded to use the production Railway URL (`https://turf-backend-production.up.railway.app`) even in local development. This caused:

1. **CORS errors** - Local frontend trying to connect to production backend
2. **502 errors** - Production backend not responding properly
3. **Network errors** - Cross-origin requests being blocked

## Solution Applied

### 1. Created Local Environment Files

- **turf-admin/.env.local** - Points admin frontend to `http://localhost:8000`
- **turf-main/.env.local** - Points customer frontend to `http://localhost:8000`

### 2. Fixed CORS Configuration

- Removed `CORS_ALLOW_ALL_ORIGINS = True` (security risk)
- Added proper origin configuration for local and production environments
- Local development now allows `localhost:5173` and `localhost:5174`

### 3. Environment-Based Configuration

- **Local Development**: Uses `localhost:8000` for backend
- **Production**: Uses Railway URL for backend

## Quick Start

### Step 1: Setup Local Backend
```bash
# Run the setup script
python run_local_dev.py

# Start Django backend
python manage.py runserver
```

### Step 2: Start Frontend Applications
```bash
# Terminal 1 - Admin Frontend
cd turf-admin
npm install
npm run dev

# Terminal 2 - Customer Frontend  
cd turf-main
npm install
npm run dev
```

## Local Development URLs

- **Backend API**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin (admin/admin123)
- **Health Check**: http://localhost:8000/health
- **Customer Frontend**: http://localhost:5173
- **Admin Frontend**: http://localhost:5174

## Environment File Priority

Vite loads environment files in this order:
1. `.env.local` (highest priority - for local development)
2. `.env.development` (for development mode)
3. `.env` (default/fallback)

## Testing the Fix

### 1. Test Backend Health
```bash
curl http://localhost:8000/health
```

### 2. Test CORS
Open browser console on `http://localhost:5174` and check if API calls work without CORS errors.

### 3. Test Admin Login
1. Go to http://localhost:5174
2. Login with: admin/admin123
3. Should connect to local backend without errors

## Production vs Local

### Local Development (.env.local)
```env
VITE_API_BASE_URL=http://localhost:8000
```

### Production (.env)
```env
VITE_API_BASE_URL=https://turf-backend-production.up.railway.app
```

## Troubleshooting

### If you still get CORS errors:
1. Make sure Django backend is running on port 8000
2. Check that `.env.local` files exist in both frontend folders
3. Restart frontend dev servers after creating `.env.local`

### If backend won't start:
1. Check PostgreSQL is running locally
2. Verify database credentials in `.env`
3. Run migrations: `python manage.py migrate`

### If frontend shows production URL:
1. Delete browser cache
2. Restart frontend dev server
3. Check `.env.local` file exists and has correct URL

## Railway Deployment

For Railway deployment, the production `.env` files will be used automatically, pointing to the Railway backend URL.

The CORS settings now properly allow:
- **Local**: `localhost:5173`, `localhost:5174`
- **Production**: `turf-customer.vercel.app`, `turf-manage.vercel.app`