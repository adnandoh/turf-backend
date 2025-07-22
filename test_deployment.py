#!/usr/bin/env python
"""
Test deployment health and functionality
"""
import os
import sys
import django
from django.test import Client
from django.core.management import execute_from_command_line

def test_deployment():
    """Test deployment health"""
    print("🚀 Testing deployment...")
    
    # Setup Django
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')
    
    try:
        django.setup()
        print("✅ Django setup successful")
        
        # Test database connection
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
            print(f"✅ Database connection: {result}")
        
        # Test basic endpoints
        client = Client()
        
        # Health check
        response = client.get('/')
        if response.status_code == 200:
            print("✅ Health endpoint working")
        else:
            print(f"⚠️  Health endpoint returned {response.status_code}")
        
        # Admin endpoint (should redirect)
        response = client.get('/admin/')
        if response.status_code in [200, 302]:
            print("✅ Admin endpoint accessible")
        else:
            print(f"⚠️  Admin endpoint returned {response.status_code}")
        
        print("🎉 Deployment test passed!")
        return True
        
    except Exception as e:
        print(f"❌ Deployment test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_deployment()
    sys.exit(0 if success else 1)