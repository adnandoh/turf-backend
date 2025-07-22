#!/usr/bin/env python
"""
Check admin user credentials
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()
admin_user = User.objects.filter(username='admin').first()

if admin_user:
    print(f'Admin user exists: {admin_user.username}')
    print(f'Email: {admin_user.email}')
    print(f'Is staff: {admin_user.is_staff}')
    print(f'Is superuser: {admin_user.is_superuser}')
    print(f'Is active: {admin_user.is_active}')
    print(f'Check password admin123: {admin_user.check_password("admin123")}')
    
    # Test different passwords
    test_passwords = ['admin123', 'admin', 'password', '123456']
    for pwd in test_passwords:
        if admin_user.check_password(pwd):
            print(f'Correct password found: {pwd}')
            break
    else:
        print('None of the test passwords work')
        # Reset password
        admin_user.set_password('admin123')
        admin_user.save()
        print('Password reset to admin123')
else:
    print('Admin user does not exist')
    # Create admin user
    User.objects.create_superuser('admin', 'admin@turfbooking.com', 'admin123')
    print('Admin user created with username: admin, password: admin123')