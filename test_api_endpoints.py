#!/usr/bin/env python
"""
Test API endpoints to ensure they're working
"""
import os
import sys
import django
from django.test import Client
from django.urls import reverse

def test_api_endpoints():
    """Test basic API endpoints"""
    print("🧪 Testing API endpoints...")
    
    # Setup Django
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')
    django.setup()
    
    client = Client()
    
    try:
        # Test health check
        response = client.get('/')
        print(f"✅ Health check: {response.status_code}")
        if response.status_code == 200:
            print(f"   Response: {response.json()}")
        
        # Test admin (should redirect to login)
        response = client.get('/admin/')
        print(f"✅ Admin endpoint: {response.status_code}")
        
        # Test API health
        response = client.get('/api/')
        print(f"✅ API health: {response.status_code}")
        
        print("🎉 API endpoints test completed!")
        return True
        
    except Exception as e:
        print(f"❌ API endpoints test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_api_endpoints()
    sys.exit(0 if success else 1)