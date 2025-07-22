#!/usr/bin/env python
"""
Simple test script to verify the Django API is working correctly
"""
import requests
import json

def test_health_endpoint():
    """Test the health check endpoint"""
    try:
        response = requests.get('http://127.0.0.1:8000/')
        print(f"Status Code: {response.status_code}")
        print(f"Content-Type: {response.headers.get('content-type')}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Health check passed!")
            print(f"Status: {data.get('status')}")
            print(f"Message: {data.get('message')}")
        else:
            print("❌ Health check failed!")
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to server. Make sure Django is running on port 8000")
    except Exception as e:
        print(f"❌ Error: {e}")

def test_production_endpoint():
    """Test the production endpoint"""
    try:
        response = requests.get('https://turf-backend-production.up.railway.app/')
        print(f"\nProduction Test:")
        print(f"Status Code: {response.status_code}")
        print(f"Content-Type: {response.headers.get('content-type')}")
        print(f"Response: {response.text[:500]}...")  # First 500 chars
        
        if response.status_code == 200:
            try:
                data = response.json()
                print("✅ Production API is working!")
                print(f"Status: {data.get('status')}")
            except:
                print("❌ Response is not JSON - might be serving wrong content")
        else:
            print("❌ Production API failed!")
            
    except Exception as e:
        print(f"❌ Production Error: {e}")

if __name__ == "__main__":
    print("Testing Django API endpoints...")
    test_health_endpoint()
    test_production_endpoint()