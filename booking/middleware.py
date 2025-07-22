import re
from django.conf import settings

class CSRFExemptMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.csrf_exempt_urls = [re.compile(url) for url in getattr(settings, 'CSRF_EXEMPT_URLS', [])]

    def __call__(self, request):
        # Check if the path matches any of the exempt URLs
        path = request.path_info.lstrip('/')
        for exempt_url in self.csrf_exempt_urls:
            if exempt_url.match(path):
                request._dont_enforce_csrf_checks = True
                break
        
        response = self.get_response(request)
        return response 