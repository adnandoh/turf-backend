#!/usr/bin/env python
"""
Railway deployment setup script
Run this after deploying to Railway to set up the database
"""
import os
import sys
import django
from django.core.management import execute_from_command_line

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')
    django.setup()
    
    print("🚀 Setting up Railway deployment...")
    
    # Run migrations
    print("📊 Running database migrations...")
    execute_from_command_line(['manage.py', 'migrate'])
    
    # Create superuser if it doesn't exist
    print("👤 Creating admin user...")
    from django.contrib.auth.models import User
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        print("✅ Admin user created: admin/admin123")
    else:
        print("✅ Admin user already exists")
    
    # Generate slots for the next 30 days
    print("🎯 Generating time slots...")
    execute_from_command_line(['manage.py', 'generate_slots', '--days', '30'])
    
    print("🎉 Railway setup completed successfully!")
    print("🔗 Your API will be available at: https://your-app.railway.app/api/")
    print("🔑 Admin panel: https://your-app.railway.app/admin/")
    print("📚 API endpoints:")
    print("   - Cricket slots: /api/cricket/slots/")
    print("   - Pickleball slots: /api/pickleball/slots/")
    print("   - Admin dashboard: /api/admin/dashboard/")