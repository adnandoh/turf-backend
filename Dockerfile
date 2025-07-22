# Use Python 3.11 slim image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
        build-essential \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Create staticfiles directory and collect static files
RUN mkdir -p /app/staticfiles
RUN python manage.py collectstatic --noinput --clear

# Expose port
EXPOSE 8000

# Run the application
CMD python manage.py migrate && python manage.py collectstatic --noinput && gunicorn turf.wsgi:application --bind 0.0.0.0:$PORT --workers 1 --timeout 120 --log-level debug --access-logfile - --error-logfile -