#!/usr/bin/env python
"""
Generate missing slots for activities
"""
import os
import sys
import django
from datetime import datetime, timedelta

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')
django.setup()

from booking.models import Activity, Slot

def generate_slots_for_activity(activity, start_date, end_date):
    """Generate slots for an activity between start_date and end_date"""
    slots_created = 0
    current_date = start_date
    
    while current_date <= end_date:
        # Generate slots from 6 AM to 10 PM (16 hours)
        for hour in range(6, 22):
            start_time = f"{hour:02d}:00"
            end_time = f"{hour+1:02d}:00"
            
            # Check if slot already exists
            existing_slot = Slot.objects.filter(
                activity=activity,
                date=current_date,
                start_time=start_time,
                end_time=end_time
            ).first()
            
            if not existing_slot:
                Slot.objects.create(
                    activity=activity,
                    date=current_date,
                    start_time=start_time,
                    end_time=end_time,
                    is_blocked=False
                )
                slots_created += 1
        
        current_date += timedelta(days=1)
    
    return slots_created

def generate_missing_slots():
    """Generate missing slots for all activities"""
    print("🔧 Generating missing slots...")
    
    # Get or create activities
    cricket, created = Activity.objects.get_or_create(name="Cricket")
    if created:
        print("✅ Cricket activity created")
    
    pickleball, created = Activity.objects.get_or_create(name="Pickleball")
    if created:
        print("✅ Pickleball activity created")
    
    # Generate slots for next 30 days
    start_date = datetime.now().date()
    end_date = start_date + timedelta(days=30)
    
    print(f"📅 Generating slots from {start_date} to {end_date}")
    
    # Generate cricket slots
    cricket_slots = generate_slots_for_activity(cricket, start_date, end_date)
    print(f"🏏 Cricket slots created: {cricket_slots}")
    
    # Generate pickleball slots
    pickleball_slots = generate_slots_for_activity(pickleball, start_date, end_date)
    print(f"🏓 Pickleball slots created: {pickleball_slots}")
    
    # Summary
    total_cricket = Slot.objects.filter(activity=cricket).count()
    total_pickleball = Slot.objects.filter(activity=pickleball).count()
    
    print(f"\n📊 Summary:")
    print(f"   Total Cricket slots: {total_cricket}")
    print(f"   Total Pickleball slots: {total_pickleball}")
    print(f"   New slots created: {cricket_slots + pickleball_slots}")
    
    print("✅ Slot generation completed!")

if __name__ == "__main__":
    generate_missing_slots()