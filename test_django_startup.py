#!/usr/bin/env python
"""
Test Django startup and basic functionality
"""
import os
import sys
import django
from django.conf import settings
from django.core.wsgi import get_wsgi_application

def test_django_startup():
    """Test if Django can start properly"""
    print("🔧 Testing Django startup...")
    
    # Set Django settings
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')
    
    try:
        # Setup Django
        django.setup()
        print("✅ Django setup successful")
        
        # Test WSGI application
        application = get_wsgi_application()
        print("✅ WSGI application created successfully")
        
        # Test database connection
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
            print(f"✅ Database connection successful: {result}")
        
        # Test basic model import
        from booking.models import Activity
        print("✅ Models imported successfully")
        
        print("🎉 All tests passed!")
        return True
        
    except Exception as e:
        print(f"❌ Django startup failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_django_startup()
    sys.exit(0 if success else 1)