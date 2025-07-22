#!/usr/bin/env python
"""
Fix Railway deployment issues
"""
import os
import sys
import subprocess

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔧 {description}...")
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ {description} successful")
            if result.stdout.strip():
                print(f"   Output: {result.stdout.strip()}")
        else:
            print(f"❌ {description} failed")
            print(f"   Error: {result.stderr.strip()}")
            return False
        return True
    except Exception as e:
        print(f"❌ {description} failed with exception: {e}")
        return False

def fix_deployment():
    """Fix common Railway deployment issues"""
    print("🚀 Fixing Railway deployment issues...")
    
    # 1. Clean environment
    print("\n1. Cleaning environment variables...")
    os.system("python railway_env_cleanup.py")
    
    # 2. Test database connection
    print("\n2. Testing database connection...")
    if not run_command("python railway_deploy_test.py", "Database connection test"):
        print("⚠️ Database connection test failed, but continuing...")
    
    # 3. Run migrations
    print("\n3. Running database migrations...")
    if not run_command("python manage.py migrate --noinput", "Database migrations"):
        return False
    
    # 4. Create superuser
    print("\n4. Creating superuser...")
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
    os.remove('temp_create_superuser.py')
    
    # 5. Load initial data
    print("\n5. Loading initial data...")
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
    os.remove('temp_load_data.py')
    
    # 6. Collect static files
    print("\n6. Collecting static files...")
    if not run_command("python manage.py collectstatic --noinput --clear", "Static files collection"):
        print("⚠️ Static files collection failed, but continuing...")
    
    # 7. Test Django startup
    print("\n7. Testing Django startup...")
    if not run_command("python test_django_startup.py", "Django startup test"):
        print("⚠️ Django startup test failed, but continuing...")
    
    print("\n🎉 Deployment fix completed!")
    print("\n📋 Next steps:")
    print("1. Deploy to Railway using: railway up")
    print("2. Check logs: railway logs")
    print("3. Test health endpoint: https://turf-backend-production.up.railway.app/health/")
    print("4. Test admin: https://turf-backend-production.up.railway.app/admin/")
    
    return True

if __name__ == "__main__":
    success = fix_deployment()
    sys.exit(0 if success else 1)