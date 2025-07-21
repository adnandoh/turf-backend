from django.db import models

# Create your models here.

class Activity(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Activities"

class Slot(models.Model):
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name='slots')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_blocked = models.BooleanField(default=False)
    block_reason = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return f"{self.activity.name} - {self.date} ({self.start_time}-{self.end_time})"
    
    class Meta:
        indexes = [
            models.Index(fields=['date', 'start_time', 'end_time']),
            models.Index(fields=['activity', 'date']),
        ]

class Booking(models.Model):
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name='bookings')
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE, related_name='bookings')
    user_name = models.CharField(max_length=100)
    user_email = models.EmailField()
    user_phone = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user_name} - {self.slot}"
