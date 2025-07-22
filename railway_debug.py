#!/usr/bin/env python
"""
Railway deployment debugging script
"""
import os
import sys
import django
from pathlib import Path

# Add the project directory to Python path
BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))

# Set Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')

def check_environment():
    """Check environment variables and configuration"""
    print("🔍 Environment Check:")
    print(f"  Python Version: {sys.version}")
    print(f"  Django Settings Module: {os.environ.get('DJANGO_SETTINGS_MODULE', 'Not set')}")
    print(f"  DEBUG: {os.environ.get('DEBUG', 'Not set')}")
    print(f"  SECRET_KEY: {'Set' if os.environ.get('SECRET_KEY') else 'Not set'}")
    print(f"  DATABASE_URL: {'Set' if os.environ.get('DATABASE_URL') else 'Not set'}")
    print(f"  PORT: {os.environ.get('PORT', 'Not set')}")
    print(f"  RAILWAY_STATIC_URL: {os.environ.get('RAILWAY_STATIC_URL', 'Not set')}")
    print()

def check_django_setup():
    """Check Django configuration"""
    try:
        django.setup()
        print("✅ Django setup successful")
        
        from django.conf import settings
        print(f"  DEBUG: {settings.DEBUG}")
        print(f"  ALLOWED_HOSTS: {settings.ALLOWED_HOSTS}")
        print(f"  DATABASE ENGINE: {settings.DATABASES['default']['ENGINE']}")
        print(f"  STATIC_URL: {settings.STATIC_URL}")
        print(f"  STATIC_ROOT: {settings.STATIC_ROOT}")
        print()
        
        return True
    except Exception as e:
        print(f"❌ Django setup failed: {e}")
        return False

def check_database():
    """Check database connection"""
    try:
        from django.db import connection
        cursor = connection.cursor()
        cursor.execute("SELECT 1")
        print("✅ Database connection successful")
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

def check_static_files():
    """Check static files configuration"""
    try:
        from django.conf import settings
        from django.contrib.staticfiles import finders
        
        static_root = Path(settings.STATIC_ROOT)
        print(f"📁 Static files check:")
        print(f"  STATIC_ROOT exists: {static_root.exists()}")
        print(f"  STATIC_ROOT path: {static_root}")
        
        if static_root.exists():
            files = list(static_root.rglob('*'))
            print(f"  Static files count: {len(files)}")
        
        return True
    except Exception as e:
        print(f"❌ Static files check failed: {e}")
        return False

def check_wsgi():
    """Check WSGI application"""
    try:
        from turf.wsgi import application
        print("✅ WSGI application import successful")
        return True
    except Exception as e:
        print(f"❌ WSGI application import failed: {e}")
        return False

def main():
    print("🚀 Railway Deployment Debug Report")
    print("=" * 50)
    
    check_environment()
    
    if check_django_setup():
        check_database()
        check_static_files()
        check_wsgi()
    
    print("=" * 50)
    print("Debug complete!")

if __name__ == "__main__":
    main()