#!/usr/bin/env python
"""
Test script to verify admin authentication and slot filtering
"""
import os
import sys
import django
import requests
from datetime import datetime

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')
django.setup()

from django.contrib.auth.models import User
from booking.models import Activity, Slot

def test_api_responses():
    """Test API responses for admin vs customer"""
    today = datetime.now().date().strftime('%Y-%m-%d')
    base_url = 'http://localhost:8000'
    
    print(f"=== TESTING API RESPONSES FOR {today} ===\n")
    
    # Test customer API (no auth)
    print("1. Testing Customer API (no authentication):")
    try:
        response = requests.get(f'{base_url}/api/cricket/slots/?date={today}')
        print(f"   Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Slots returned: {len(data)}")
            blocked_count = sum(1 for slot in data if slot.get('is_blocked', False))
            print(f"   Blocked slots: {blocked_count}")
        else:
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"   Error: {e}")
    
    print()
    
    # Test admin API (with auth)
    print("2. Testing Admin API (with authentication):")
    
    # First, try to get auth token
    try:
        # Check if admin user exists
        admin_user = User.objects.filter(username='admin').first()
        if not admin_user:
            print("   Creating admin user...")
            admin_user = User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
            print("   Admin user created: admin/admin123")
        else:
            print("   Admin user exists")
        
        # Get auth token
        auth_response = requests.post(f'{base_url}/api-token-auth/', {
            'username': 'admin',
            'password': 'admin123'
        })
        
        if auth_response.status_code == 200:
            token = auth_response.json()['token']
            print(f"   Auth token obtained: {token[:20]}...")
            
            # Test authenticated API call
            headers = {'Authorization': f'Token {token}'}
            response = requests.get(f'{base_url}/api/cricket/slots/?date={today}', headers=headers)
            
            print(f"   Status: {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                print(f"   Slots returned: {len(data)}")
                blocked_count = sum(1 for slot in data if slot.get('is_blocked', False))
                available_count = len(data) - blocked_count
                print(f"   Available slots: {available_count}")
                print(f"   Blocked slots: {blocked_count}")
            else:
                print(f"   Error: {response.text}")
        else:
            print(f"   Auth failed: {auth_response.text}")
            
    except Exception as e:
        print(f"   Error: {e}")
    
    print()
    
    # Check database directly
    print("3. Database Direct Check:")
    try:
        cricket = Activity.objects.get(name='Cricket')
        slots = Slot.objects.filter(activity=cricket, date=today)
        total = slots.count()
        blocked = slots.filter(is_blocked=True).count()
        available = total - blocked
        
        print(f"   Total slots in DB: {total}")
        print(f"   Available slots: {available}")
        print(f"   Blocked slots: {blocked}")
        
        if blocked > 0:
            print("   Blocked slot details:")
            for slot in slots.filter(is_blocked=True):
                print(f"     - {slot.start_time} - {slot.end_time}: {slot.block_reason}")
                
    except Exception as e:
        print(f"   Error: {e}")

if __name__ == '__main__':
    test_api_responses()