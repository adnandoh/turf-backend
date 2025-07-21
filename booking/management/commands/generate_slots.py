from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime, timedelta, time
from booking.models import Activity, Slot

class Command(BaseCommand):
    help = 'Generate time slots for activities'

    def add_arguments(self, parser):
        parser.add_argument(
            '--days',
            type=int,
            default=30,
            help='Number of days to generate slots for (default: 30)'
        )
        parser.add_argument(
            '--start-date',
            type=str,
            help='Start date in YYYY-MM-DD format (default: today)'
        )

    def handle(self, *args, **options):
        days = options['days']
        start_date_str = options.get('start_date')
        
        if start_date_str:
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
        else:
            start_date = timezone.now().date()

        # Define time slots (24-hour format) - Full day coverage
        time_slots = []
        
        # Generate all 24 hourly slots (0:00 to 23:00)
        for hour in range(24):
            start_time = time(hour, 0)
            end_time = time((hour + 1) % 24, 0)
            time_slots.append((start_time, end_time))

        activities = Activity.objects.all()
        created_count = 0

        for activity in activities:
            self.stdout.write(f"Generating slots for {activity.name}...")
            
            for day in range(days):
                current_date = start_date + timedelta(days=day)
                
                for start_time, end_time in time_slots:
                    # Check if slot already exists
                    if not Slot.objects.filter(
                        activity=activity,
                        date=current_date,
                        start_time=start_time,
                        end_time=end_time
                    ).exists():
                        Slot.objects.create(
                            activity=activity,
                            date=current_date,
                            start_time=start_time,
                            end_time=end_time,
                            is_blocked=False
                        )
                        created_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully created {created_count} slots for {days} days'
            )
        )