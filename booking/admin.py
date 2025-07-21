from django.contrib import admin
from .models import Activity, Slot, Booking

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(Slot)
class SlotAdmin(admin.ModelAdmin):
    list_display = ('id', 'activity', 'date', 'start_time', 'end_time', 'is_blocked', 'block_reason')
    list_filter = ('activity', 'date', 'is_blocked')
    search_fields = ('activity__name', 'date')
    date_hierarchy = 'date'

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'activity', 'slot', 'user_name', 'user_email', 'user_phone', 'created_at')
    list_filter = ('activity', 'slot__date', 'created_at')
    search_fields = ('user_name', 'user_email', 'user_phone')
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at',)
