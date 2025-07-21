#!/usr/bin/env python
"""
Debug script to check what's actually in the database
"""
import os
import sys
import django
from datetime import datetime

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')
django.setup()

from booking.models import Activity, Slot, Booking

def debug_slots():
    """Debug slots for today's date"""
    today = datetime.now().date()
    
    print(f"=== SLOT DEBUG FOR {today} ===\n")
    
    activities = Activity.objects.all()
    
    for activity in activities:
        print(f"🏏 {activity.name.upper()}")
        print("-" * 40)
        
        slots = Slot.objects.filter(activity=activity, date=today).order_by('start_time')
        
        print(f"Total slots in database: {slots.count()}")
        
        available_slots = slots.filter(is_blocked=False)
        blocked_slots = slots.filter(is_blocked=True)
        
        print(f"Available slots: {available_slots.count()}")
        print(f"Blocked slots: {blocked_slots.count()}")
        
        if blocked_slots.exists():
            print("\n🚫 BLOCKED SLOTS:")
            for slot in blocked_slots:
                print(f"  - {slot.start_time} - {slot.end_time}: {slot.block_reason}")
        
        # Check for bookings
        booked_slots = []
        for slot in slots:
            if slot.bookings.exists():
                booked_slots.append(slot)
        
        if booked_slots:
            print(f"\n📅 BOOKED SLOTS: {len(booked_slots)}")
            for slot in booked_slots:
                booking = slot.bookings.first()
                print(f"  - {slot.start_time} - {slot.end_time}: {booking.user_name}")
        
        print(f"\n📋 ALL SLOTS:")
        for slot in slots:
            status = "🚫 BLOCKED" if slot.is_blocked else ("📅 BOOKED" if slot.bookings.exists() else "✅ AVAILABLE")
            print(f"  {slot.start_time} - {slot.end_time}: {status}")
        
        print("\n" + "="*50 + "\n")

if __name__ == '__main__':
    debug_slots()