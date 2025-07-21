# 🚀 Railway Deployment Guide - Turf Booking System

## 📋 Prerequisites
- Railway account with PostgreSQL database created
- Backend code uploaded to Railway
- PostgreSQL connection details available

## 🔧 Railway Environment Variables Setup

In your Railway project dashboard, add these environment variables:

### Required Variables:
```bash
DATABASE_URL=postgresql://postgres:rZmXHNPYZYODBemYJHzmKllSpzjiXFjZ@postgres.railway.internal:5432/railway
SECRET_KEY=your-super-secret-key-here
DEBUG=False
```

### Optional Variables:
```bash
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com,https://another-domain.com
RAILWAY_PUBLIC_DOMAIN=your-custom-domain.com
```

## 🗄️ Database Configuration

### Production (Railway):
- **Database**: PostgreSQL (Railway managed)
- **Connection**: Uses `DATABASE_URL` environment variable
- **SSL**: Required (automatically configured)

### Local Development:
- **Database**: Same Railway PostgreSQL (for consistency)
- **Connection**: Direct connection to Railway PostgreSQL
- **Host**: `maglev.proxy.rlwy.net:40181`

## 🚀 Deployment Steps

### 1. Deploy to Railway
```bash
# Railway will automatically:
# - Install dependencies from requirements.txt
# - Run database migrations
# - Collect static files
# - Start the application with Gunicorn
```

### 2. Post-Deployment Setup
After successful deployment, run the setup script:

```bash
# SSH into your Railway container or use Railway CLI
python railway_setup.py
```

This will:
- ✅ Run database migrations
- ✅ Create admin user (admin/admin123)
- ✅ Generate time slots for 30 days
- ✅ Display API endpoints

### 3. Verify Deployment
Check these endpoints:
- **Health Check**: `https://your-app.railway.app/admin/`
- **API Root**: `https://your-app.railway.app/api/`
- **Cricket Slots**: `https://your-app.railway.app/api/cricket/slots/?date=2025-07-21`
- **Pickleball Slots**: `https://your-app.railway.app/api/pickleball/slots/?date=2025-07-21`
- **Dashboard**: `https://your-app.railway.app/api/admin/dashboard/`

## 📊 Database Schema

The system will automatically create these tables:
- `booking_activity` - Sports activities (Cricket, Pickleball)
- `booking_slot` - Time slots for each activity
- `booking_booking` - Customer bookings
- `auth_user` - Admin users
- `authtoken_token` - API authentication tokens

## 🔐 Admin Access

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`
- URL: `https://your-app.railway.app/admin/`

**⚠️ Important**: Change the admin password after first login!

## 🌐 API Endpoints

### Public Endpoints (No Auth Required):
```bash
GET /api/cricket/slots/?date=YYYY-MM-DD          # Get cricket slots
GET /api/pickleball/slots/?date=YYYY-MM-DD       # Get pickleball slots
POST /api/cricket/bookings/                      # Create cricket booking
POST /api/pickleball/bookings/                   # Create pickleball booking
```

### Admin Endpoints (Auth Required):
```bash
POST /api-token-auth/                            # Get auth token
GET /api/admin/dashboard/                        # Admin dashboard data
POST /api/cricket/blocks/                        # Block cricket slots
POST /api/pickleball/blocks/                     # Block pickleball slots
GET /api/cricket/bookings/                       # View cricket bookings
GET /api/pickleball/bookings/                    # View pickleball bookings
```

## 🔧 Local Development Setup

1. **Install Dependencies:**
```bash
pip install -r requirements.txt
```

2. **Set Environment Variables:**
```bash
# Create .env file (copy from .env.example)
DATABASE_URL=postgresql://postgres:rZmXHNPYZYODBemYJHzmKllSpzjiXFjZ@maglev.proxy.rlwy.net:40181/railway
DEBUG=True
```

3. **Run Migrations:**
```bash
python manage.py migrate
```

4. **Create Admin User:**
```bash
python manage.py createsuperuser
```

5. **Generate Slots:**
```bash
python manage.py generate_slots --days 30
```

6. **Start Development Server:**
```bash
python manage.py runserver
```

## 🐛 Troubleshooting

### Common Issues:

1. **Database Connection Error:**
   - Verify `DATABASE_URL` environment variable
   - Check PostgreSQL service is running on Railway
   - Ensure SSL is enabled

2. **Static Files Not Loading:**
   - Run `python manage.py collectstatic`
   - Check `STATIC_ROOT` and `STATIC_URL` settings
   - Verify Whitenoise middleware is installed

3. **CORS Errors:**
   - Add your frontend domain to `CORS_ALLOWED_ORIGINS`
   - Check CORS middleware is properly configured
   - Verify preflight requests are handled

4. **Migration Errors:**
   - Run `python manage.py makemigrations`
   - Then `python manage.py migrate`
   - Check database permissions

### Logs and Debugging:
```bash
# View Railway logs
railway logs

# Check database connection
python manage.py dbshell

# Test API endpoints
curl https://your-app.railway.app/api/cricket/slots/?date=2025-07-21
```

## 📈 Performance Optimization

### Production Settings:
- ✅ `DEBUG=False` for security
- ✅ PostgreSQL with connection pooling
- ✅ Whitenoise for static file serving
- ✅ Gunicorn WSGI server
- ✅ Proper CORS configuration

### Monitoring:
- Railway provides built-in metrics
- Monitor database performance
- Set up error tracking (optional)

## 🔄 Updates and Maintenance

### Deploying Updates:
1. Push code changes to Railway
2. Railway auto-deploys on git push
3. Run migrations if needed: `python manage.py migrate`
4. Restart if necessary

### Database Maintenance:
- Regular backups (Railway handles this)
- Monitor database size and performance
- Clean up old booking data periodically

## 📞 Support

If you encounter issues:
1. Check Railway logs first
2. Verify environment variables
3. Test database connection
4. Check API endpoints manually

**Your Railway PostgreSQL is configured and ready! 🎉**