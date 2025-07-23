#!/bin/bash
set -e

echo "🚀 Starting Django application..."

# Set default port if not provided
export PORT=${PORT:-8080}

# Clean up any problematic environment variables that might cause PostgreSQL errors
unset db_type
unset DB_TYPE
unset database_type
unset DATABASE_TYPE

echo "📊 Environment Info:"
echo "  PORT: $PORT"
echo "  DEBUG: ${DEBUG:-False}"
echo "  DJANGO_SETTINGS_MODULE: ${DJANGO_SETTINGS_MODULE:-turf.settings}"
if [ -n "$DATABASE_URL" ]; then
    echo "  DATABASE_URL: ${DATABASE_URL:0:30}..."
else
    echo "  DATABASE_URL: Not set"
fi

# Run diagnostic script if it exists
if [ -f "turf-backend-production.py" ]; then
    echo "🔍 Running diagnostic script..."
    python turf-backend-production.py
fi

# Wait for database to be ready (Railway PostgreSQL)
echo "⏳ Waiting for database to be ready..."
python -c "
import os
import time
import psycopg2
from urllib.parse import urlparse

if os.environ.get('DATABASE_URL'):
    url = urlparse(os.environ['DATABASE_URL'])
    max_attempts = 30
    for attempt in range(max_attempts):
        try:
            conn = psycopg2.connect(
                host=url.hostname,
                port=url.port,
                user=url.username,
                password=url.password,
                database=url.path[1:],
                sslmode='require',
                connect_timeout=10
            )
            conn.close()
            print('✅ Database is ready!')
            break
        except Exception as e:
            if attempt < max_attempts - 1:
                print(f'⏳ Database not ready (attempt {attempt + 1}/{max_attempts}): {e}')
                time.sleep(2)
            else:
                print(f'❌ Database connection failed after {max_attempts} attempts: {e}')
                exit(1)
else:
    print('⚠️ No DATABASE_URL found, skipping database check')
"

# Test Railway deployment configuration
echo "🧪 Testing Railway deployment configuration..."
python railway_deploy_test.py

# Run migrations
echo "🔄 Running database migrations..."
python manage.py migrate --noinput

# Create superuser if it doesn't exist
echo "👤 Creating superuser if needed..."
python -c "
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')
django.setup()
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@turfbooking.com', 'admin123')
    print('✅ Superuser created: admin/admin123')
else:
    print('✅ Superuser already exists')
"

# Load initial data
echo "📊 Loading initial data..."
python -c "
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')
django.setup()
from booking.models import Activity
if Activity.objects.count() == 0:
    Activity.objects.create(name='Cricket', description='Cricket court booking')
    Activity.objects.create(name='Pickleball', description='Pickleball court booking')
    print('✅ Initial activities created')
else:
    print('✅ Activities already exist')
"

# Collect static files
echo "📦 Collecting static files..."
python manage.py collectstatic --noinput --clear

# Start gunicorn
echo "🌟 Starting Gunicorn server on port $PORT..."
echo "🔗 Binding to 0.0.0.0:$PORT"
exec gunicorn turf.wsgi:application \
    --bind 0.0.0.0:$PORT \
    --workers 1 \
    --timeout 120 \
    --log-level info \
    --access-logfile - \
    --error-logfile - \
    --preload \
    --max-requests 1000 \
    --max-requests-jitter 100