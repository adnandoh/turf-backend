#!/usr/bin/python3

import os
import sys
import subprocess
import time
import re
import logging
import traceback

def diagnose_railway_issues():
    print("🔍 Diagnosing Railway deployment issues...")
    
    # Check environment variables
    print("\n📋 Environment Variables:")
    port = os.environ.get('PORT', '8080')
    print(f"PORT: {port}")
    
    # Check if process is listening on the port
    try:
        result = subprocess.run(["lsof", "-i", f":{port}"], 
                              capture_output=True, text=True)
        if result.stdout:
            print(f"✅ Process is listening on port {port}:")
            print(result.stdout)
        else:
            print(f"❌ No process is listening on port {port}!")
    except Exception as e:
        print(f"Error checking port: {e}")
    
    # Check database connection
    print("\n🗄️ Database Connection:")
    db_url = os.environ.get('DATABASE_URL')
    if db_url:
        print(f"DATABASE_URL is set: {db_url[:20]}...")
        try:
            import psycopg2
            from urllib.parse import urlparse
            
            url = urlparse(db_url)
            conn = psycopg2.connect(
                host=url.hostname,
                port=url.port,
                user=url.username,
                password=url.password,
                database=url.path[1:],
                sslmode='require',
                connect_timeout=10
            )
            print("✅ Database connection successful!")
            conn.close()
        except Exception as e:
            print(f"❌ Database connection failed: {e}")
    else:
        print("❌ DATABASE_URL is not set!")
    
    # Check Django configuration
    print("\n⚙️ Django Configuration:")
    try:
        import django
        print(f"Django version: {django.get_version()}")
        
        django_settings = os.environ.get('DJANGO_SETTINGS_MODULE', 'turf.settings')
        print(f"DJANGO_SETTINGS_MODULE: {django_settings}")
        
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', django_settings)
        django.setup()
        
        from django.conf import settings
        print(f"DEBUG: {settings.DEBUG}")
        print(f"ALLOWED_HOSTS: {settings.ALLOWED_HOSTS}")
        print(f"CORS_ALLOWED_ORIGINS: {getattr(settings, 'CORS_ALLOWED_ORIGINS', 'Not set')}")
        
    except Exception as e:
        print(f"❌ Django configuration error: {e}")
    
    print("\n📊 System Information:")
    print(f"Python version: {sys.version}")
    
    # Check disk space
    try:
        result = subprocess.run(["df", "-h"], capture_output=True, text=True)
        print("\nDisk Space:")
        print(result.stdout)
    except Exception as e:
        print(f"Error checking disk space: {e}")
    
    # Check memory usage
    try:
        result = subprocess.run(["free", "-h"], capture_output=True, text=True)
        print("\nMemory Usage:")
        print(result.stdout)
    except Exception as e:
        print(f"Error checking memory: {e}")
    
    print("\n🔄 Running health checks...")

if __name__ == "__main__":
    diagnose_railway_issues() 