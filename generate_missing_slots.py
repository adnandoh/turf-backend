#!/usr/bin/env python
"""
Script to generate missing slots for today to test the fixes
"""
import os
import sys
import django
from datetime import datetime, time, timedelta

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')
django.setup()

from booking.models import Activity, Slot

def generate_slots_for_today():
    """Generate slots for today's date"""
    today = datetime.now().date()
    
    # Define time slots (6 AM to 10 PM - reasonable booking hours)
    time_slots = [
        # Morning slots (6 AM - 12 PM)
        (time(6, 0), time(7, 0)),   # 6:00 AM - 7:00 AM
        (time(7, 0), time(8, 0)),   # 7:00 AM - 8:00 AM
        (time(8, 0), time(9, 0)),   # 8:00 AM - 9:00 AM
        (time(9, 0), time(10, 0)),  # 9:00 AM - 10:00 AM
        (time(10, 0), time(11, 0)), # 10:00 AM - 11:00 AM
        (time(11, 0), time(12, 0)), # 11:00 AM - 12:00 PM
        
        # Afternoon slots (12 PM - 6 PM)
        (time(12, 0), time(13, 0)), # 12:00 PM - 1:00 PM
        (time(13, 0), time(14, 0)), # 1:00 PM - 2:00 PM
        (time(14, 0), time(15, 0)), # 2:00 PM - 3:00 PM
        (time(15, 0), time(16, 0)), # 3:00 PM - 4:00 PM
        (time(16, 0), time(17, 0)), # 4:00 PM - 5:00 PM
        (time(17, 0), time(18, 0)), # 5:00 PM - 6:00 PM
        
        # Evening slots (6 PM - 10 PM)
        (time(18, 0), time(19, 0)), # 6:00 PM - 7:00 PM
        (time(19, 0), time(20, 0)), # 7:00 PM - 8:00 PM
        (time(20, 0), time(21, 0)), # 8:00 PM - 9:00 PM
        (time(21, 0), time(22, 0)), # 9:00 PM - 10:00 PM
    ]
    
    activities = Activity.objects.all()
    created_count = 0
    
    print(f"Generating slots for {today}")
    
    for activity in activities:
        print(f"Processing {activity.name}...")
        
        for start_time, end_time in time_slots:
            # Check if slot already exists
            if not Slot.objects.filter(
                activity=activity,
                date=today,
                start_time=start_time,
                end_time=end_time
            ).exists():
                Slot.objects.create(
                    activity=activity,
                    date=today,
                    start_time=start_time,
                    end_time=end_time,
                    is_blocked=False
                )
                created_count += 1
                print(f"  Created slot: {start_time} - {end_time}")
            else:
                print(f"  Slot already exists: {start_time} - {end_time}")
    
    print(f"\nSuccessfully created {created_count} new slots for {today}")
    
    # Show current slot counts
    for activity in activities:
        total_slots = Slot.objects.filter(activity=activity, date=today).count()
        blocked_slots = Slot.objects.filter(activity=activity, date=today, is_blocked=True).count()
        available_slots = total_slots - blocked_slots
        
        print(f"\n{activity.name} slots for {today}:")
        print(f"  Total: {total_slots}")
        print(f"  Available: {available_slots}")
        print(f"  Blocked: {blocked_slots}")

if __name__ == '__main__':
    generate_slots_for_today()