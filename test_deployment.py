#!/usr/bin/env python
"""
Simple deployment test script
"""
import os
import sys
import django
from pathlib import Path

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')
django.setup()

from django.http import JsonResponse
from django.test import RequestFactory
from turf.urls import health_check

def test_health_check():
    """Test the health check endpoint"""
    factory = RequestFactory()
    request = factory.get('/')
    
    try:
        response = health_check(request)
        print("✅ Health check endpoint working")
        print(f"Response status: {response.status_code}")
        print(f"Response content: {response.content.decode()}")
        return True
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return False

def test_database():
    """Test database connection"""
    try:
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
        print("✅ Database connection working")
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

def test_models():
    """Test model imports"""
    try:
        from booking.models import Activity, Slot, Booking
        print("✅ Models import successfully")
        
        # Test basic queries
        activities = Activity.objects.all()
        print(f"Activities count: {activities.count()}")
        return True
    except Exception as e:
        print(f"❌ Models test failed: {e}")
        return False

if __name__ == "__main__":
    print("🧪 Testing deployment components...")
    print("-" * 40)
    
    test_health_check()
    test_database()
    test_models()
    
    print("-" * 40)
    print("Test complete!")