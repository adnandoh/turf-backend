"""
URL configuration for turf project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from rest_framework.authtoken import views as token_views
from django.views.decorators.csrf import csrf_exempt

def health_check(request):
    import os
    
    # Test database connection
    db_status = "unknown"
    try:
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT version()")
            result = cursor.fetchone()
            db_status = f"connected - {result[0][:50]}..."
    except Exception as e:
        db_status = f"error: {str(e)}"
    
    # Test models
    model_status = "unknown"
    try:
        from booking.models import Activity
        activity_count = Activity.objects.count()
        model_status = f"working - {activity_count} activities"
    except Exception as e:
        model_status = f"error: {str(e)}"
    
    return JsonResponse({
        'status': 'healthy',
        'message': 'Turf Booking API is running!',
        'database': db_status,
        'models': model_status,
        'debug_info': {
            'django_version': '4.2.10',
            'environment': 'production' if not os.environ.get('DEBUG', 'True').lower() == 'true' else 'development',
            'git_commit': os.environ.get('GIT_COMMIT_SHA', 'unknown'),
            'allowed_hosts': os.environ.get('ALLOWED_HOSTS', 'default'),
            'database_url_set': 'yes' if os.environ.get('DATABASE_URL') else 'no',
        },
        'endpoints': {
            'admin': '/admin/',
            'cricket_slots': '/api/cricket/slots/',
            'pickleball_slots': '/api/pickleball/slots/',
            'dashboard': '/api/admin/dashboard/',
            'auth': '/api-token-auth/'
        }
    })

urlpatterns = [
    path('', health_check, name='health_check'),
    path('health/', health_check, name='health_check_alt'),
    path('api/', health_check, name='api_health_check'),
    path('admin/', admin.site.urls),
    path('', include('booking.urls')),
    path('api-token-auth/', csrf_exempt(token_views.obtain_auth_token)),
]
