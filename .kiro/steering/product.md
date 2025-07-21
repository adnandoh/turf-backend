# Product Overview

## Turf Booking System

A comprehensive sports facility booking platform for Cricket and Pickle Ball courts.

### Core Features
- **Public Booking**: Customers can view available slots and make bookings
- **Admin Management**: Staff can view all bookings, block slots for maintenance/events
- **Multi-Sport Support**: Separate booking systems for Cricket and Pickle Ball
- **Slot Management**: Time-based slot system with blocking capabilities

### Architecture
- **Backend**: Django REST API with token authentication
- **Customer Frontend**: React app for public bookings (turf-main)
- **Admin Frontend**: React app for management operations (turf-admin)

### User Flows
1. **Customer**: Browse available slots → Select time → Provide contact info → Confirm booking
2. **Admin**: Login → View bookings by date → Block/unblock slots → Manage reservations

### Business Logic
- Slots can be blocked for maintenance or special events
- No double-booking allowed for the same time slot
- Admin authentication required for management operations
- Booking cancellation available for both customers and admins