# Railway Deployment Fix Guide

## Current Issues Identified

1. **502 Error**: Server not responding properly
2. **PostgreSQL Error**: `unrecognized configuration parameter "db_type"`
3. **Database Connection Issues**: Connection timeouts or configuration problems

## Fixes Applied

### 1. Database Configuration Fix
- Cleaned up invalid PostgreSQL parameters that might cause `db_type` error
- Added proper connection timeout and SSL configuration
- Improved error handling for database URL parsing

### 2. Environment Variable Cleanup
- Created `railway_env_cleanup.py` to remove problematic variables
- Added environment variable validation in startup script

### 3. Enhanced Health Checks
- Updated health check endpoint at `/health/` to test database connectivity
- Added comprehensive status reporting

### 4. Improved Startup Script
- Added database readiness check
- Better error handling and logging
- Automatic superuser creation
- Initial data loading

## Deployment Steps

### Step 1: Test Locally
```bash
# Clean environment and test
python railway_env_cleanup.py
python railway_deploy_test.py
python fix_railway_deployment.py
```

### Step 2: Deploy to Railway
```bash
# If you have Railway CLI installed
railway up

# Or push to your connected Git repository
git add .
git commit -m "Fix Railway deployment issues"
git push origin main
```

### Step 3: Check Deployment
1. **Health Check**: Visit `https://turf-backend-production.up.railway.app/health/`
2. **Admin Panel**: Visit `https://turf-backend-production.up.railway.app/admin/`
3. **API Status**: Visit `https://turf-backend-production.up.railway.app/status/`

### Step 4: Monitor Logs
```bash
# If using Railway CLI
railway logs

# Or check logs in Railway dashboard
```

## Environment Variables to Set in Railway

Make sure these are set in your Railway project:

```bash
# Core Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=False
DJANGO_SETTINGS_MODULE=turf.settings

# Database (Railway PostgreSQL)
DATABASE_URL=postgresql://user:password@host:port/database

# Railway Settings
PORT=8000
RAILWAY_STATIC_URL=https://your-app.up.railway.app/static/
RAILWAY_PUBLIC_DOMAIN=your-app.up.railway.app

# CORS Settings
CORS_ALLOWED_ORIGINS=https://turf-customer.vercel.app,https://turf-manage.vercel.app

# Security
ALLOWED_HOSTS=your-app.up.railway.app,.railway.app,.up.railway.app
```

## Troubleshooting

### If 502 Error Persists:
1. Check Railway logs for specific error messages
2. Verify DATABASE_URL is correctly set
3. Ensure PostgreSQL service is running
4. Check if port binding is correct

### If Database Connection Fails:
1. Verify PostgreSQL service is deployed and running
2. Check DATABASE_URL format: `postgresql://user:password@host:port/database`
3. Ensure SSL mode is set to 'require'
4. Check network connectivity between services

### If Static Files Don't Load:
1. Verify STATIC_ROOT and STATIC_URL settings
2. Check if collectstatic ran successfully
3. Ensure WhiteNoise is properly configured

## Testing Endpoints

After deployment, test these endpoints:

1. **Health Check**: `GET /health/`
2. **API Status**: `GET /status/`
3. **Admin Panel**: `GET /admin/`
4. **Cricket Slots**: `GET /api/cricket/slots/`
5. **Pickleball Slots**: `GET /api/pickleball/slots/`

## Expected Response from Health Check

```json
{
  "status": "healthy",
  "message": "Turf Booking API is running!",
  "database": "connected - PostgreSQL 15.x...",
  "models": "working - 2 activities",
  "debug_info": {
    "django_version": "4.2.10",
    "environment": "production",
    "railway_commit": "abc123...",
    "allowed_hosts": "your-app.up.railway.app",
    "database_url_set": "yes"
  },
  "endpoints": {
    "admin": "/admin/",
    "cricket_slots": "/api/cricket/slots/",
    "pickleball_slots": "/api/pickleball/slots/",
    "dashboard": "/api/admin/dashboard/",
    "auth": "/api-token-auth/"
  }
}
```

## Admin Access

- **URL**: `https://turf-backend-production.up.railway.app/admin/`
- **Username**: `admin`
- **Password**: `admin123`

## Next Steps After Successful Deployment

1. Change default admin password
2. Configure proper CORS origins for your frontend
3. Set up proper SSL certificates if using custom domain
4. Configure monitoring and logging
5. Set up backup strategy for database