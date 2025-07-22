#!/usr/bin/env python
"""
Railway deployment test script
"""
import os
import sys
import django
from django.conf import settings

def test_railway_deployment():
    """Test Railway deployment configuration"""
    print("🚀 Testing Railway deployment configuration...")
    
    # Set Django settings
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')
    
    try:
        # Setup Django
        django.setup()
        print("✅ Django setup successful")
        
        # Test environment variables
        print("\n📊 Environment Variables:")
        env_vars = [
            'DATABASE_URL', 'SECRET_KEY', 'DEBUG', 'PORT',
            'PGHOST', 'PGPORT', 'PGDATABASE', 'PGUSER', 'PGPASSWORD'
        ]
        
        for var in env_vars:
            value = os.environ.get(var, 'NOT SET')
            if 'PASSWORD' in var or 'SECRET' in var:
                value = value[:10] + '...' if value != 'NOT SET' else 'NOT SET'
            print(f"  {var}: {value}")
        
        # Test database configuration
        print(f"\n🗄️ Database Configuration:")
        db_config = settings.DATABASES['default']
        print(f"  Engine: {db_config.get('ENGINE')}")
        print(f"  Name: {db_config.get('NAME')}")
        print(f"  Host: {db_config.get('HOST')}")
        print(f"  Port: {db_config.get('PORT')}")
        print(f"  User: {db_config.get('USER')}")
        print(f"  Options: {db_config.get('OPTIONS', {})}")
        
        # Test database connection
        print("\n🔌 Testing database connection...")
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT version()")
            result = cursor.fetchone()
            print(f"✅ Database connection successful: PostgreSQL {result[0]}")
        
        # Test models
        print("\n📋 Testing models...")
        from booking.models import Activity, Slot, Booking
        activity_count = Activity.objects.count()
        slot_count = Slot.objects.count()
        booking_count = Booking.objects.count()
        print(f"✅ Models working - Activities: {activity_count}, Slots: {slot_count}, Bookings: {booking_count}")
        
        # Test static files
        print(f"\n📁 Static files configuration:")
        print(f"  STATIC_URL: {settings.STATIC_URL}")
        print(f"  STATIC_ROOT: {settings.STATIC_ROOT}")
        
        print("\n🎉 All Railway deployment tests passed!")
        return True
        
    except Exception as e:
        print(f"❌ Railway deployment test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_railway_deployment()
    sys.exit(0 if success else 1)