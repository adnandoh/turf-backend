from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from django.shortcuts import get_object_or_404
from django.db import transaction
from django.db.models import Q, Count
from django.utils import timezone
from datetime import datetime, timedelta

from .models import Activity, Slot, Booking
from .serializers import SlotSerializer, BookingSerializer, BookingDetailSerializer, BlockSlotSerializer

class IsAdminUser(permissions.BasePermission):
    """
    Permission to only allow admin users to access the view.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class ActivityViewSet:
    """
    Base class for activity-specific viewsets.
    """
    activity_name = None
    
    def get_activity(self):
        return get_object_or_404(Activity, name=self.activity_name)
    
    def get_slots_for_date(self, date):
        activity = self.get_activity()
        return Slot.objects.filter(activity=activity, date=date)

class SlotViewSet(ActivityViewSet, viewsets.ViewSet):
    """
    ViewSet for listing slots for an activity.
    """
    permission_classes = [permissions.AllowAny]
    
    def list(self, request):
        date = request.query_params.get('date', None)
        if not date:
            return Response({"error": "Date parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        slots = self.get_slots_for_date(date).order_by('start_time')
        
        # For admin users, return all slots; for regular users, exclude blocked slots
        if request.user.is_authenticated and request.user.is_staff:
            # Admin view - return all slots with full details
            serializer = SlotSerializer(slots, many=True)
        else:
            # Public view - return only available (non-blocked) slots
            available_slots = slots.filter(is_blocked=False)
            serializer = SlotSerializer(available_slots, many=True)
        
        return Response(serializer.data)

class BookingViewSet(ActivityViewSet, viewsets.ModelViewSet):
    """
    ViewSet for managing bookings for an activity.
    """
    serializer_class = BookingSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        activity = self.get_activity()
        queryset = Booking.objects.filter(activity=activity)
        
        date = self.request.query_params.get('date', None)
        if date and self.action == 'list':
            queryset = queryset.filter(slot__date=date)
            
        return queryset
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['activity'] = self.get_activity()
        return context
    
    def get_serializer_class(self):
        if self.action in ['retrieve', 'list']:
            return BookingDetailSerializer
        return BookingSerializer
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

class BlockViewSet(ActivityViewSet, viewsets.ViewSet):
    """
    ViewSet for blocking and unblocking slots.
    """
    permission_classes = [IsAdminUser]
    
    def create(self, request):
        serializer = BlockSlotSerializer(data=request.data)
        if serializer.is_valid():
            activity = self.get_activity()
            date = serializer.validated_data['date']
            start_time = serializer.validated_data['start_time']
            end_time = serializer.validated_data['end_time']
            reason = serializer.validated_data['reason']
            
            # Find or create a slot for this time period
            with transaction.atomic():
                # Check if there are any existing bookings for this time slot
                existing_slots = Slot.objects.filter(
                    activity=activity,
                    date=date,
                    start_time=start_time,
                    end_time=end_time
                )
                
                if existing_slots.exists():
                    slot = existing_slots.first()
                    # Check if slot is already booked
                    if slot.bookings.exists():
                        return Response(
                            {"error": "Cannot block a slot that has existing bookings"},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    slot.is_blocked = True
                    slot.block_reason = reason
                    slot.save()
                else:
                    # Create a new blocked slot
                    slot = Slot.objects.create(
                        activity=activity,
                        date=date,
                        start_time=start_time,
                        end_time=end_time,
                        is_blocked=True,
                        block_reason=reason
                    )
                
                return Response(SlotSerializer(slot).data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        activity = self.get_activity()
        slot = get_object_or_404(Slot, pk=pk, activity=activity, is_blocked=True)
        
        slot.is_blocked = False
        slot.block_reason = None
        slot.save()
        
        return Response(status=status.HTTP_204_NO_CONTENT)

# Cricket specific viewsets
class CricketSlotViewSet(SlotViewSet):
    activity_name = "Cricket"

class CricketBookingViewSet(BookingViewSet):
    activity_name = "Cricket"

class CricketBlockViewSet(BlockViewSet):
    activity_name = "Cricket"

# Pickleball specific viewsets
class PickleballSlotViewSet(SlotViewSet):
    activity_name = "Pickleball"

class PickleballBookingViewSet(BookingViewSet):
    activity_name = "Pickleball"

class PickleballBlockViewSet(BlockViewSet):
    activity_name = "Pickleball"

# Admin Dashboard API
@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_dashboard(request):
    """
    API endpoint for admin dashboard data
    """
    today = timezone.now().date()
    week_start = today - timedelta(days=today.weekday())
    week_end = week_start + timedelta(days=6)
    
    # Get activities
    cricket = get_object_or_404(Activity, name="Cricket")
    pickleball = get_object_or_404(Activity, name="Pickleball")
    
    # Today's bookings
    today_cricket_bookings = Booking.objects.filter(
        activity=cricket,
        slot__date=today
    ).count()
    
    today_pickleball_bookings = Booking.objects.filter(
        activity=pickleball,
        slot__date=today
    ).count()
    
    # Weekly bookings
    week_cricket_bookings = Booking.objects.filter(
        activity=cricket,
        slot__date__range=[week_start, week_end]
    ).count()
    
    week_pickleball_bookings = Booking.objects.filter(
        activity=pickleball,
        slot__date__range=[week_start, week_end]
    ).count()
    
    # Today's slots data
    cricket_slots_today = Slot.objects.filter(activity=cricket, date=today)
    pickleball_slots_today = Slot.objects.filter(activity=pickleball, date=today)
    
    # Available slots (today)
    available_cricket_slots = cricket_slots_today.filter(is_blocked=False).exclude(
        id__in=Booking.objects.filter(slot__activity=cricket, slot__date=today).values_list('slot_id', flat=True)
    ).count()
    
    available_pickleball_slots = pickleball_slots_today.filter(is_blocked=False).exclude(
        id__in=Booking.objects.filter(slot__activity=pickleball, slot__date=today).values_list('slot_id', flat=True)
    ).count()
    
    # Blocked slots (from today onwards)
    blocked_cricket_slots = Slot.objects.filter(
        activity=cricket,
        is_blocked=True,
        date__gte=today
    ).count()
    
    blocked_pickleball_slots = Slot.objects.filter(
        activity=pickleball,
        is_blocked=True,
        date__gte=today
    ).count()
    
    # Total slots today
    total_cricket_slots = cricket_slots_today.count()
    total_pickleball_slots = pickleball_slots_today.count()
    
    # Revenue calculation (simplified)
    today_revenue = 0
    week_revenue = 0
    
    # Calculate today's revenue
    today_bookings = Booking.objects.filter(slot__date=today)
    for booking in today_bookings:
        hour = booking.slot.start_time.hour
        activity_name = booking.activity.name.lower()
        
        if activity_name == 'cricket':
            if 6 <= hour < 12:
                today_revenue += 1200 if hour < 7 else 1500
            else:
                today_revenue += 1500 if hour < 18 else 2000
        elif 'pickle' in activity_name:
            if 6 <= hour < 12:
                today_revenue += 800 if hour < 7 else 1000
            else:
                today_revenue += 1000 if hour < 18 else 1200
    
    # Calculate week's revenue
    week_bookings = Booking.objects.filter(slot__date__range=[week_start, week_end])
    for booking in week_bookings:
        hour = booking.slot.start_time.hour
        activity_name = booking.activity.name.lower()
        
        if activity_name == 'cricket':
            if 6 <= hour < 12:
                week_revenue += 1200 if hour < 7 else 1500
            else:
                week_revenue += 1500 if hour < 18 else 2000
        elif 'pickle' in activity_name:
            if 6 <= hour < 12:
                week_revenue += 800 if hour < 7 else 1000
            else:
                week_revenue += 1000 if hour < 18 else 1200
    
    # Recent bookings
    recent_bookings = Booking.objects.select_related('activity', 'slot').order_by('-created_at')[:10]
    recent_bookings_data = []
    
    for booking in recent_bookings:
        recent_bookings_data.append({
            'id': booking.id,
            'sport': booking.activity.name,
            'user': booking.user_name,
            'time': booking.slot.start_time.strftime('%I:%M %p'),
            'date': booking.slot.date.strftime('%Y-%m-%d'),
            'status': 'confirmed',
            'created_at': booking.created_at.isoformat()
        })
    
    dashboard_data = {
        'todayBookings': {
            'cricket': today_cricket_bookings,
            'pickleball': today_pickleball_bookings
        },
        'weeklyBookings': {
            'cricket': week_cricket_bookings,
            'pickleball': week_pickleball_bookings
        },
        'availableSlots': {
            'cricket': available_cricket_slots,
            'pickleball': available_pickleball_slots
        },
        'totalSlots': {
            'cricket': total_cricket_slots,
            'pickleball': total_pickleball_slots
        },
        'blockedSlots': {
            'cricket': blocked_cricket_slots,
            'pickleball': blocked_pickleball_slots
        },
        'revenue': {
            'today': today_revenue,
            'week': week_revenue
        },
        'recentBookings': recent_bookings_data,
        'totalUsers': Booking.objects.values('user_email').distinct().count(),
        'date': today.isoformat()
    }
    
    return Response(dashboard_data)