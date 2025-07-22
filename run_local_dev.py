#!/usr/bin/env python
"""
Local development setup script
"""
import os
import sys
import subprocess
import time

def run_command(command, description, cwd=None):
    """Run a command and handle errors"""
    print(f"\n🔧 {description}...")
    try:
        result = subprocess.run(command, shell=True, cwd=cwd, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ {description} successful")
            if result.stdout.strip():
                print(f"   Output: {result.stdout.strip()[:200]}...")
        else:
            print(f"❌ {description} failed")
            print(f"   Error: {result.stderr.strip()}")
            return False
        return True
    except Exception as e:
        print(f"❌ {description} failed with exception: {e}")
        return False

def check_local_postgres():
    """Check if local PostgreSQL is running"""
    print("\n🔍 Checking local PostgreSQL...")
    try:
        import psycopg2
        conn = psycopg2.connect(
            host='localhost',
            port='5432',
            user='postgres',
            password='adnan12',
            database='turf_project',
            connect_timeout=5
        )
        conn.close()
        print("✅ Local PostgreSQL is running and accessible")
        return True
    except Exception as e:
        print(f"❌ Local PostgreSQL connection failed: {e}")
        print("\n📋 To fix this:")
        print("1. Make sure PostgreSQL is installed and running")
        print("2. Create database: createdb turf_project")
        print("3. Or update DB credentials in .env file")
        return False

def setup_local_development():
    """Setup local development environment"""
    print("🚀 Setting up local development environment...")
    
    # Check if we're in the right directory
    if not os.path.exists('manage.py'):
        print("❌ Please run this script from the project root directory")
        return False
    
    # Set environment variables for local development
    os.environ['DEBUG'] = 'True'
    os.environ['DATABASE_URL'] = ''  # Use local PostgreSQL settings
    
    # Check local PostgreSQL
    if not check_local_postgres():
        return False
    
    # Run Django setup
    steps = [
        ("python manage.py migrate", "Database migrations"),
        ("python manage.py collectstatic --noinput", "Static files collection"),
    ]
    
    for command, description in steps:
        if not run_command(command, description):
            return False
    
    # Create superuser if it doesn't exist
    print("\n👤 Setting up admin user...")
    create_superuser_script = """
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')
django.setup()
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@turfbooking.com', 'admin123')
    print('Superuser created: admin/admin123')
else:
    print('Superuser already exists')
"""
    with open('temp_create_superuser.py', 'w') as f:
        f.write(create_superuser_script)
    
    run_command("python temp_create_superuser.py", "Superuser creation")
    if os.path.exists('temp_create_superuser.py'):
        os.remove('temp_create_superuser.py')
    
    # Load initial data
    print("\n📊 Loading initial data...")
    load_data_script = """
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')
django.setup()
from booking.models import Activity
if Activity.objects.count() == 0:
    Activity.objects.create(name='Cricket', description='Cricket court booking')
    Activity.objects.create(name='Pickleball', description='Pickleball court booking')
    print('Initial activities created')
else:
    print('Activities already exist')
"""
    with open('temp_load_data.py', 'w') as f:
        f.write(load_data_script)
    
    run_command("python temp_load_data.py", "Initial data loading")
    if os.path.exists('temp_load_data.py'):
        os.remove('temp_load_data.py')
    
    print("\n🎉 Local development setup completed!")
    print("\n📋 Next steps:")
    print("1. Start Django backend: python manage.py runserver")
    print("2. Start admin frontend: cd turf-admin && npm run dev")
    print("3. Start customer frontend: cd turf-main && npm run dev")
    print("\n🔗 URLs:")
    print("- Backend API: http://localhost:8000")
    print("- Admin Panel: http://localhost:8000/admin (admin/admin123)")
    print("- Health Check: http://localhost:8000/health")
    print("- Customer Frontend: http://localhost:5173")
    print("- Admin Frontend: http://localhost:5174")
    
    return True

if __name__ == "__main__":
    success = setup_local_development()
    sys.exit(0 if success else 1)