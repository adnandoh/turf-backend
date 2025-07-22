#!/usr/bin/env python
"""
Test all API endpoints to ensure they work properly
"""
import os
import sys
import django
import requests
import json
from datetime import datetime, timedelta

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')
django.setup()

from django.contrib.auth import get_user_model
from booking.models import Activity, Slot, Booking

BASE_URL = "http://localhost:8000"

def test_health_endpoint():
    """Test health check endpoint"""
    print("\n🔍 Testing Health Endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health/", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed: {data.get('message', 'OK')}")
            print(f"   Database: {data.get('database', 'unknown')}")
            print(f"   Models: {data.get('models', 'unknown')}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_admin_authentication():
    """Test admin authentication"""
    print("\n🔐 Testing Admin Authentication...")
    try:
        auth_data = {
            "username": "admin",
            "password": "admin123"
        }
        response = requests.post(f"{BASE_URL}/api-token-auth/", 
                               json=auth_data, 
                               headers={"Content-Type": "application/json"},
                               timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            token = data.get('token')
            if token:
                print(f"✅ Authentication successful")
                print(f"   Token: {token[:20]}...")
                return token
            else:
                print(f"❌ No token in response: {data}")
                return None
        else:
            print(f"❌ Authentication failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Authentication error: {e}")
        return None

def test_cricket_slots():
    """Test cricket slots endpoint"""
    print("\n🏏 Testing Cricket Slots...")
    try:
        today = datetime.now().strftime('%Y-%m-%d')
        response = requests.get(f"{BASE_URL}/api/cricket/slots/?date={today}", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Cricket slots retrieved: {len(data)} slots")
            if data:
                print(f"   Sample slot: {data[0].get('start_time')} - {data[0].get('end_time')}")
            return True
        else:
            print(f"❌ Cricket slots failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Cricket slots error: {e}")
        return False

def test_pickleball_slots():
    """Test pickleball slots endpoint"""
    print("\n🏓 Testing Pickleball Slots...")
    try:
        today = datetime.now().strftime('%Y-%m-%d')
        response = requests.get(f"{BASE_URL}/api/pickleball/slots/?date={today}", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Pickleball slots retrieved: {len(data)} slots")
            if data:
                print(f"   Sample slot: {data[0].get('start_time')} - {data[0].get('end_time')}")
            return True
        else:
            print(f"❌ Pickleball slots failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Pickleball slots error: {e}")
        return False

def test_admin_dashboard(token):
    """Test admin dashboard endpoint"""
    print("\n📊 Testing Admin Dashboard...")
    try:
        headers = {
            "Authorization": f"Token {token}",
            "Content-Type": "application/json"
        }
        response = requests.get(f"{BASE_URL}/api/admin/dashboard/", 
                              headers=headers, 
                              timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Dashboard data retrieved")
            print(f"   Today's cricket bookings: {data.get('todayBookings', {}).get('cricket', 0)}")
            print(f"   Today's pickleball bookings: {data.get('todayBookings', {}).get('pickleball', 0)}")
            print(f"   Total users: {data.get('totalUsers', 0)}")
            return True
        else:
            print(f"❌ Dashboard failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Dashboard error: {e}")
        return False

def test_booking_creation():
    """Test booking creation"""
    print("\n📝 Testing Booking Creation...")
    try:
        # First get available slots
        today = datetime.now().strftime('%Y-%m-%d')
        slots_response = requests.get(f"{BASE_URL}/api/cricket/slots/?date={today}", timeout=10)
        
        if slots_response.status_code != 200:
            print("❌ Cannot get slots for booking test")
            return False
        
        slots = slots_response.json()
        available_slots = [slot for slot in slots if not slot.get('is_blocked') and not slot.get('is_booked')]
        
        if not available_slots:
            print("⚠️ No available slots for booking test")
            return True
        
        # Create a test booking
        slot = available_slots[0]
        booking_data = {
            "slot": slot['id'],
            "user_name": "Test User",
            "user_email": "test@example.com",
            "user_phone": "+91-9876543210"
        }
        
        response = requests.post(f"{BASE_URL}/api/cricket/bookings/", 
                               json=booking_data,
                               headers={"Content-Type": "application/json"},
                               timeout=10)
        
        if response.status_code == 201:
            data = response.json()
            print(f"✅ Booking created successfully")
            print(f"   Booking ID: {data.get('id')}")
            print(f"   User: {data.get('user_name')}")
            return True
        else:
            print(f"❌ Booking creation failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Booking creation error: {e}")
        return False

def setup_test_data():
    """Setup test data for API testing"""
    print("\n🔧 Setting up test data...")
    
    # Ensure activities exist
    cricket, created = Activity.objects.get_or_create(name="Cricket")
    if created:
        print("✅ Cricket activity created")
    
    pickleball, created = Activity.objects.get_or_create(name="Pickleball")
    if created:
        print("✅ Pickleball activity created")
    
    # Create some test slots for today
    today = datetime.now().date()
    
    # Create cricket slots
    cricket_slots_created = 0
    for hour in range(6, 22):  # 6 AM to 10 PM
        start_time = f"{hour:02d}:00"
        end_time = f"{hour+1:02d}:00"
        
        slot, created = Slot.objects.get_or_create(
            activity=cricket,
            date=today,
            start_time=start_time,
            end_time=end_time,
            defaults={"is_blocked": False}
        )
        if created:
            cricket_slots_created += 1
    
    # Create pickleball slots
    pickleball_slots_created = 0
    for hour in range(6, 22):  # 6 AM to 10 PM
        start_time = f"{hour:02d}:00"
        end_time = f"{hour+1:02d}:00"
        
        slot, created = Slot.objects.get_or_create(
            activity=pickleball,
            date=today,
            start_time=start_time,
            end_time=end_time,
            defaults={"is_blocked": False}
        )
        if created:
            pickleball_slots_created += 1
    
    print(f"✅ Test data setup complete")
    print(f"   Cricket slots created: {cricket_slots_created}")
    print(f"   Pickleball slots created: {pickleball_slots_created}")

def run_all_tests():
    """Run all API tests"""
    print("🚀 Starting API Tests...")
    
    # Setup test data
    setup_test_data()
    
    # Test results
    results = {}
    
    # Test health endpoint
    results['health'] = test_health_endpoint()
    
    # Test authentication
    token = test_admin_authentication()
    results['auth'] = token is not None
    
    # Test slots endpoints
    results['cricket_slots'] = test_cricket_slots()
    results['pickleball_slots'] = test_pickleball_slots()
    
    # Test admin dashboard (requires token)
    if token:
        results['dashboard'] = test_admin_dashboard(token)
    else:
        results['dashboard'] = False
    
    # Test booking creation
    results['booking'] = test_booking_creation()
    
    # Summary
    print("\n📋 Test Results Summary:")
    print("=" * 50)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.upper():20} {status}")
        if result:
            passed += 1
    
    print("=" * 50)
    print(f"Tests passed: {passed}/{total}")
    
    if passed == total:
        print("🎉 All tests passed! API is working correctly.")
        return True
    else:
        print("⚠️ Some tests failed. Check the output above.")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)