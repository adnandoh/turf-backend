#!/usr/bin/env python
"""
PostgreSQL setup and connection test script
"""
import os
import sys
import django
from pathlib import Path

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')
django.setup()

from django.db import connection
from django.core.management import execute_from_command_line

def test_postgres_connection():
    """Test PostgreSQL connection"""
    print("🔍 Testing PostgreSQL connection...")
    
    try:
        # Test database connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT version();")
            version = cursor.fetchone()[0]
            print(f"✅ PostgreSQL connection successful!")
            print(f"   Database version: {version}")
            
        # Test database name
        db_name = connection.settings_dict['NAME']
        db_user = connection.settings_dict['USER']
        db_host = connection.settings_dict['HOST']
        db_port = connection.settings_dict['PORT']
        
        print(f"   Database: {db_name}")
        print(f"   User: {db_user}")
        print(f"   Host: {db_host}")
        print(f"   Port: {db_port}")
        
        return True
        
    except Exception as e:
        print(f"❌ PostgreSQL connection failed: {e}")
        print("\n🔧 Troubleshooting steps:")
        print("1. Make sure PostgreSQL is running")
        print("2. Verify database 'turf_project' exists")
        print("3. Check username/password: postgres/adnan12")
        print("4. Ensure PostgreSQL is listening on localhost:5432")
        return False

def setup_database():
    """Setup database with migrations"""
    print("\n🚀 Setting up database...")
    
    try:
        # Run migrations
        print("Running migrations...")
        execute_from_command_line(['manage.py', 'migrate'])
        print("✅ Migrations completed successfully!")
        
        return True
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        return False

def load_initial_data():
    """Load initial data if fixtures exist"""
    print("\n📊 Loading initial data...")
    
    try:
        # Check if fixtures exist
        fixtures_dir = Path('booking/fixtures')
        if fixtures_dir.exists():
            fixture_files = list(fixtures_dir.glob('*.json'))
            if fixture_files:
                for fixture in fixture_files:
                    print(f"Loading {fixture.name}...")
                    execute_from_command_line(['manage.py', 'loaddata', str(fixture)])
                print("✅ Initial data loaded successfully!")
            else:
                print("ℹ️  No fixture files found")
        else:
            print("ℹ️  No fixtures directory found")
            
        return True
        
    except Exception as e:
        print(f"❌ Loading initial data failed: {e}")
        return False

def main():
    """Main setup function"""
    print("🐘 PostgreSQL Setup for Turf Booking System")
    print("=" * 50)
    
    # Test connection
    if not test_postgres_connection():
        return False
    
    # Setup database
    if not setup_database():
        return False
    
    # Load initial data
    load_initial_data()
    
    print("\n" + "=" * 50)
    print("✅ PostgreSQL setup completed successfully!")
    print("\n🎯 Next steps:")
    print("1. Run: python manage.py createsuperuser")
    print("2. Run: python manage.py runserver")
    print("3. Visit: http://localhost:8000/admin/")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)