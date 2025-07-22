# 🚂 Railway Deployment Guide - Turf Booking System

## 🔧 Recent Fixes Applied

### 1. Fixed Health Check Endpoint
- Updated `/` endpoint to return proper JSON response
- Added debug information for troubleshooting
- Added `/api/` endpoint for explicit API access

### 2. Improved Deployment Configuration
- Updated `Dockerfile` with better static file handling
- Enhanced `railway.json` with proper startup command
- Added comprehensive logging for debugging

### 3. Database Configuration
- Improved PostgreSQL connection handling
- Added fallback configuration for Railway internal networking
- Better error handling for database connection issues

### 4. Static Files Configuration
- Fixed WhiteNoise middleware positioning
- Improved static file collection process
- Added proper static file serving configuration

## 🚀 Deployment Steps

### 1. Environment Variables (Set in Railway Dashboard)
```bash
DATABASE_URL=postgresql://postgres:password@postgres.railway.internal:5432/railway
SECRET_KEY=your-production-secret-key-here
DEBUG=False
ALLOWED_HOSTS=.railway.app,.up.railway.app
PORT=8000
```

### 2. Deploy to Railway
```bash
# Push your changes to trigger deployment
git add .
git commit -m "Fix Railway deployment configuration"
git push origin main
```

### 3. Verify Deployment
After deployment, test these endpoints:

- **Health Check**: `https://turf-backend-production.up.railway.app/`
- **API Health**: `https://turf-backend-production.up.railway.app/api/`
- **Admin Panel**: `https://turf-backend-production.up.railway.app/admin/`

## 🔍 Troubleshooting

### Common Issues and Solutions

#### 1. 502 Bad Gateway Error
**Cause**: Application not starting properly
**Solution**: 
- Check Railway logs for startup errors
- Verify environment variables are set
- Run `python railway_debug.py` locally to test

#### 2. Database Connection Error
**Cause**: DATABASE_URL not set or incorrect
**Solution**:
- Verify DATABASE_URL in Railway dashboard
- Check if PostgreSQL service is running
- Test connection with `python test_deployment.py`

#### 3. Static Files Not Loading
**Cause**: Static files not collected or served properly
**Solution**:
- Verify `collectstatic` runs during deployment
- Check WhiteNoise configuration
- Ensure STATIC_ROOT is properly set

#### 4. CORS Errors
**Cause**: Frontend domains not allowed
**Solution**:
- Update CORS_ALLOWED_ORIGINS in settings
- Verify frontend URLs are correct
- Check CORS middleware is properly configured

## 📊 Deployment Checklist

### Pre-Deployment
- [ ] Environment variables set in Railway
- [ ] Database service connected
- [ ] Static files configuration verified
- [ ] CORS settings updated for frontend domains

### Post-Deployment
- [ ] Health check endpoint returns 200
- [ ] Admin panel accessible
- [ ] API endpoints responding
- [ ] Database migrations applied
- [ ] Static files loading correctly

## 🛠️ Debug Commands

### Local Testing
```bash
# Test deployment configuration
python test_deployment.py

# Debug Railway setup
python railway_debug.py

# Test API endpoints
python test_api_local.py
```

### Production Testing
```bash
# Test health endpoint
curl https://turf-backend-production.up.railway.app/

# Test API endpoint
curl https://turf-backend-production.up.railway.app/api/

# Test with verbose output
curl -v https://turf-backend-production.up.railway.app/
```

## 📝 Expected Responses

### Health Check Response
```json
{
  "status": "healthy",
  "message": "Turf Booking API is running!",
  "debug_info": {
    "django_version": "4.2.10",
    "environment": "production",
    "railway_commit": "abc123",
    "allowed_hosts": ".railway.app,.up.railway.app"
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

## 🔐 Security Notes

### Production Security Settings
- `DEBUG=False` - Never enable debug in production
- Strong `SECRET_KEY` - Generate new key for production
- Proper `ALLOWED_HOSTS` - Restrict to your domains only
- SSL/HTTPS enforced through Railway
- Database credentials secured through Railway environment

### CORS Configuration
- Restrict `CORS_ALLOWED_ORIGINS` to your frontend domains
- Never use `CORS_ALLOW_ALL_ORIGINS=True` in production
- Verify frontend URLs are HTTPS in production

## 📞 Support

If deployment issues persist:
1. Check Railway deployment logs
2. Run local debug scripts
3. Verify environment variables
4. Test database connectivity
5. Check static file configuration

The deployment should now work correctly with proper error handling and debugging information.