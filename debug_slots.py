#!/usr/bin/env python
"""
Debug slots and activities
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'turf.settings')
django.setup()

from booking.models import Activity, Slot, Booking
from datetime import datetime

def debug_activities_and_slots():
    """Debug activities and slots"""
    print("🔍 Debugging Activities and Slots...")
    
    # Check activities
    activities = Activity.objects.all()
    print(f"\n📊 Activities ({activities.count()}):")
    for activity in activities:
        print(f"   - {activity.name} (ID: {activity.id})")
    
    # Check slots for today
    today = datetime.now().date()
    print(f"\n📅 Slots for {today}:")
    
    for activity in activities:
        slots = Slot.objects.filter(activity=activity, date=today)
        print(f"\n🎯 {activity.name} slots: {slots.count()}")
        
        if slots.exists():
            # Show first few slots
            for slot in slots[:5]:
                status = "BLOCKED" if slot.is_blocked else "AVAILABLE"
                bookings = slot.bookings.count()
                booking_status = f" ({bookings} bookings)" if bookings > 0 else ""
                print(f"   {slot.start_time}-{slot.end_time}: {status}{booking_status}")
            
            if slots.count() > 5:
                print(f"   ... and {slots.count() - 5} more slots")
    
    # Check bookings
    bookings = Booking.objects.all()
    print(f"\n📝 Total Bookings: {bookings.count()}")
    
    if bookings.exists():
        print("Recent bookings:")
        for booking in bookings[:5]:
            print(f"   {booking.user_name} - {booking.slot.activity.name} - {booking.slot.date} {booking.slot.start_time}")
    
    print("\n✅ Debug completed!")

if __name__ == "__main__":
    debug_activities_and_slots()