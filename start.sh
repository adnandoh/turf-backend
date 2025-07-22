#!/bin/bash
set -e

echo "🚀 Starting Django application..."

# Set default port if not provided
export PORT=${PORT:-8000}

echo "📊 Environment Info:"
echo "  PORT: $PORT"
echo "  DEBUG: ${DEBUG:-False}"
echo "  DATABASE_URL: ${DATABASE_URL:0:20}..."

# Run migrations
echo "🔄 Running database migrations..."
python manage.py migrate --noinput

# Collect static files
echo "📦 Collecting static files..."
python manage.py collectstatic --noinput --clear

# Test Django startup
echo "🧪 Testing Django startup..."
python test_django_startup.py

# Start gunicorn
echo "🌟 Starting Gunicorn server on port $PORT..."
exec gunicorn turf.wsgi:application \
    --bind 0.0.0.0:$PORT \
    --workers 2 \
    --timeout 120 \
    --log-level info \
    --access-logfile - \
    --error-logfile - \
    --preload \
    --max-requests 1000 \
    --max-requests-jitter 100