from rest_framework import serializers
from .models import Activity, Slot, Booking
from django.utils import timezone
from django.db import transaction

class SlotSerializer(serializers.ModelSerializer):
    is_booked = serializers.SerializerMethodField()
    user_name = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()
    start_time_formatted = serializers.SerializerMethodField()
    end_time_formatted = serializers.SerializerMethodField()
    
    class Meta:
        model = Slot
        fields = ['id', 'date', 'start_time', 'end_time', 'start_time_formatted', 'end_time_formatted', 'is_blocked', 'block_reason', 'is_booked', 'user_name', 'price']
        read_only_fields = ['is_blocked', 'block_reason']
    
    def get_is_booked(self, obj):
        return obj.bookings.exists()
    
    def get_user_name(self, obj):
        booking = obj.bookings.first()
        return booking.user_name if booking else None
    
    def get_price(self, obj):
        # Pricing logic based on time and activity
        hour = obj.start_time.hour
        activity_name = obj.activity.name.lower()
        
        if activity_name == 'cricket':
            # Morning rates (6 AM - 12 PM): ₹1200-1500
            if 6 <= hour < 12:
                return 1200 if hour < 7 else 1500
            # Afternoon/Evening rates (12 PM - 10 PM): ₹1500-2000
            else:
                return 1500 if hour < 18 else 2000
        elif activity_name == 'pickle ball':
            # Morning rates: ₹800-1000
            if 6 <= hour < 12:
                return 800 if hour < 7 else 1000
            # Afternoon/Evening rates: ₹1000-1200
            else:
                return 1000 if hour < 18 else 1200
        
        return 1000  # Default price
    
    def get_start_time_formatted(self, obj):
        """Format start time in 12-hour AM/PM format"""
        return obj.start_time.strftime('%I:%M %p').lstrip('0')
    
    def get_end_time_formatted(self, obj):
        """Format end time in 12-hour AM/PM format"""
        return obj.end_time.strftime('%I:%M %p').lstrip('0')

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'slot', 'user_name', 'user_email', 'user_phone', 'created_at']
        read_only_fields = ['created_at']
    
    def validate(self, data):
        slot = data.get('slot')
        
        # Check if slot is blocked
        if slot.is_blocked:
            raise serializers.ValidationError("This slot is blocked and not available for booking.")
        
        # Check if slot is already booked
        if Booking.objects.filter(slot=slot).exists():
            raise serializers.ValidationError("This slot is already booked.")
        
        # Check if slot belongs to the correct activity
        activity = self.context.get('activity')
        if slot.activity.id != activity.id:
            raise serializers.ValidationError(f"This slot is not for {activity.name}.")
        
        return data
    
    def create(self, validated_data):
        # Use transaction to ensure atomicity and prevent race conditions
        with transaction.atomic():
            # Re-check if slot is available (to handle concurrent requests)
            slot = validated_data.get('slot')
            if slot.is_blocked or Booking.objects.filter(slot=slot).exists():
                raise serializers.ValidationError("This slot is no longer available.")
            
            # Set activity from context
            validated_data['activity'] = self.context.get('activity')
            return super().create(validated_data)

class BookingDetailSerializer(serializers.ModelSerializer):
    slot = SlotSerializer(read_only=True)
    
    class Meta:
        model = Booking
        fields = ['id', 'slot', 'user_name', 'user_email', 'user_phone', 'created_at']

class BlockSlotSerializer(serializers.Serializer):
    date = serializers.DateField()
    start_time = serializers.TimeField()
    end_time = serializers.TimeField()
    reason = serializers.CharField(max_length=255)
    
    def validate(self, data):
        # Check if end_time is after start_time
        if data['end_time'] <= data['start_time']:
            raise serializers.ValidationError("End time must be after start time.")
        
        # Check if date is not in the past
        if data['date'] < timezone.now().date():
            raise serializers.ValidationError("Cannot block slots in the past.")
            
        return data 