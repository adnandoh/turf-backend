#!/usr/bin/env python
"""
Railway deployment setup and debugging script
"""
import os
import sys
import subprocess
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def run_command(command, description):
    """Run a command and log the result"""
    logger.info(f"Running: {description}")
    logger.info(f"Command: {command}")
    
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True, timeout=300)
        
        if result.returncode == 0:
            logger.info(f"✅ {description} - SUCCESS")
            if result.stdout:
                logger.info(f"Output: {result.stdout}")
        else:
            logger.error(f"❌ {description} - FAILED")
            logger.error(f"Error: {result.stderr}")
            return False
            
    except subprocess.TimeoutExpired:
        logger.error(f"❌ {description} - TIMEOUT")
        return False
    except Exception as e:
        logger.error(f"❌ {description} - EXCEPTION: {e}")
        return False
    
    return True

def check_environment():
    """Check environment variables"""
    logger.info("🔍 Checking environment variables...")
    
    required_vars = ['DATABASE_URL', 'SECRET_KEY']
    optional_vars = ['DEBUG', 'PORT', 'RAILWAY_STATIC_URL']
    
    for var in required_vars:
        value = os.environ.get(var)
        if value:
            logger.info(f"✅ {var}: Set")
        else:
            logger.error(f"❌ {var}: Not set")
    
    for var in optional_vars:
        value = os.environ.get(var)
        logger.info(f"ℹ️  {var}: {value if value else 'Not set'}")

def setup_django():
    """Setup Django environment"""
    logger.info("🔧 Setting up Django...")
    
    # Set Django settings module
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')
    
    # Import Django and setup
    try:
        import django
        django.setup()
        logger.info("✅ Django setup successful")
        return True
    except Exception as e:
        logger.error(f"❌ Django setup failed: {e}")
        return False

def main():
    """Main setup function"""
    logger.info("🚀 Starting Railway deployment setup...")
    
    # Check environment
    check_environment()
    
    # Setup Django
    if not setup_django():
        sys.exit(1)
    
    # Run migrations
    if not run_command("python manage.py migrate", "Database migrations"):
        logger.warning("⚠️  Migrations failed, continuing...")
    
    # Collect static files
    if not run_command("python manage.py collectstatic --noinput", "Collect static files"):
        logger.warning("⚠️  Static files collection failed, continuing...")
    
    # Test health check
    if not run_command("python test_deployment.py", "Test deployment"):
        logger.warning("⚠️  Deployment test failed, continuing...")
    
    logger.info("✅ Setup complete!")

if __name__ == "__main__":
    main()