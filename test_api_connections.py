#!/usr/bin/env python
"""
API Connection Test Script
Tests all API endpoints to ensure proper connectivity
"""
import requests
import json
from datetime import datetime, timedelta

# Your actual URLs
BACKEND_URL = "https://turf-backend-production.up.railway.app"
CUSTOMER_URL = "https://turf-customer.vercel.app"
ADMIN_URL = "https://turf-manage.vercel.app"

def test_backend_health():
    """Test if backend is accessible"""
    print("🔍 Testing Backend Health...")
    try:
        response = requests.get(f"{BACKEND_URL}/admin/", timeout=10)
        if response.status_code == 200:
            print("✅ Backend is accessible")
            return True
        else:
            print(f"❌ Backend returned status: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend connection failed: {e}")
        return False

def test_cricket_slots_api():
    """Test cricket slots API"""
    print("\n🏏 Testing Cricket Slots API...")
    try:
        today = datetime.now().strftime('%Y-%m-%d')
        response = requests.get(f"{BACKEND_URL}/api/cricket/slots/?date={today}", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Cricket slots API working - {len(data)} slots returned")
            if data:
                print(f"   Sample slot: {data[0]['start_time']} - {data[0]['end_time']}")
            return True
        else:
            print(f"❌ Cricket slots API failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Cricket slots API error: {e}")
        return False

def test_pickleball_slots_api():
    """Test pickleball slots API"""
    print("\n🏓 Testing Pickleball Slots API...")
    try:
        today = datetime.now().strftime('%Y-%m-%d')
        response = requests.get(f"{BACKEND_URL}/api/pickleball/slots/?date={today}", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Pickleball slots API working - {len(data)} slots returned")
            if data:
                print(f"   Sample slot: {data[0]['start_time']} - {data[0]['end_time']}")
            return True
        else:
            print(f"❌ Pickleball slots API failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Pickleball slots API error: {e}")
        return False

def test_admin_auth():
    """Test admin authentication"""
    print("\n🔐 Testing Admin Authentication...")
    try:
        auth_data = {
            "username": "admin",
            "password": "admin123"
        }
        response = requests.post(f"{BACKEND_URL}/api-token-auth/", 
                               json=auth_data, 
                               timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if 'token' in data:
                print("✅ Admin authentication working")
                print(f"   Token: {data['token'][:20]}...")
                return data['token']
            else:
                print("❌ No token in response")
                return None
        else:
            print(f"❌ Admin auth failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Admin auth error: {e}")
        return None

def test_dashboard_api(token):
    """Test dashboard API with authentication"""
    print("\n📊 Testing Dashboard API...")
    if not token:
        print("❌ No token available for dashboard test")
        return False
        
    try:
        headers = {"Authorization": f"Token {token}"}
        response = requests.get(f"{BACKEND_URL}/api/admin/dashboard/", 
                              headers=headers, 
                              timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Dashboard API working")
            print(f"   Today's bookings: Cricket={data.get('todayBookings', {}).get('cricket', 0)}, "
                  f"Pickleball={data.get('todayBookings', {}).get('pickleball', 0)}")
            print(f"   Available slots: Cricket={data.get('availableSlots', {}).get('cricket', 0)}, "
                  f"Pickleball={data.get('availableSlots', {}).get('pickleball', 0)}")
            return True
        else:
            print(f"❌ Dashboard API failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Dashboard API error: {e}")
        return False

def test_cors_headers():
    """Test CORS headers"""
    print("\n🌐 Testing CORS Configuration...")
    try:
        # Test preflight request
        headers = {
            'Origin': 'https://turf-customer.vercel.app',
            'Access-Control-Request-Method': 'GET',
            'Access-Control-Request-Headers': 'Content-Type'
        }
        response = requests.options(f"{BACKEND_URL}/api/cricket/slots/", 
                                  headers=headers, 
                                  timeout=10)
        
        cors_headers = {
            'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
            'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
            'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
        }
        
        if any(cors_headers.values()):
            print("✅ CORS headers present")
            for key, value in cors_headers.items():
                if value:
                    print(f"   {key}: {value}")
            return True
        else:
            print("❌ No CORS headers found")
            return False
    except Exception as e:
        print(f"❌ CORS test error: {e}")
        return False

def test_frontend_accessibility():
    """Test if frontend URLs are accessible"""
    print("\n🌍 Testing Frontend Accessibility...")
    
    frontends = {
        "Customer Frontend": CUSTOMER_URL,
        "Admin Frontend": ADMIN_URL
    }
    
    results = {}
    for name, url in frontends.items():
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                print(f"✅ {name} is accessible")
                results[name] = True
            else:
                print(f"❌ {name} returned status: {response.status_code}")
                results[name] = False
        except Exception as e:
            print(f"❌ {name} connection failed: {e}")
            results[name] = False
    
    return all(results.values())

def main():
    """Run all API connection tests"""
    print("🚀 API Connection Test Suite")
    print("=" * 50)
    
    results = []
    
    # Test backend health
    results.append(test_backend_health())
    
    # Test public APIs
    results.append(test_cricket_slots_api())
    results.append(test_pickleball_slots_api())
    
    # Test admin APIs
    token = test_admin_auth()
    results.append(token is not None)
    results.append(test_dashboard_api(token))
    
    # Test CORS
    results.append(test_cors_headers())
    
    # Test frontend accessibility
    results.append(test_frontend_accessibility())
    
    # Summary
    print("\n" + "=" * 50)
    print("📋 TEST SUMMARY")
    print("=" * 50)
    
    passed = sum(results)
    total = len(results)
    
    if passed == total:
        print(f"🎉 ALL TESTS PASSED ({passed}/{total})")
        print("\n✅ Your API connections are working perfectly!")
        print(f"✅ Backend: {BACKEND_URL}")
        print(f"✅ Customer Frontend: {CUSTOMER_URL}")
        print(f"✅ Admin Frontend: {ADMIN_URL}")
    else:
        print(f"⚠️  SOME TESTS FAILED ({passed}/{total})")
        print("\n❌ Please check the failed tests above and:")
        print("   1. Verify Railway deployment is running")
        print("   2. Check environment variables")
        print("   3. Ensure CORS settings are correct")
        print("   4. Verify frontend deployments")
    
    print("\n🔗 API Endpoints:")
    print(f"   Cricket: {BACKEND_URL}/api/cricket/slots/")
    print(f"   Pickleball: {BACKEND_URL}/api/pickleball/slots/")
    print(f"   Dashboard: {BACKEND_URL}/api/admin/dashboard/")
    print(f"   Auth: {BACKEND_URL}/api-token-auth/")

if __name__ == "__main__":
    main()