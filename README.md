# Turf Booking System

A Django REST Framework backend for managing Cricket and Pickle Ball court bookings.

## Features

- Separate endpoints for Cricket and Pickle Ball bookings
- Ability to block slots for maintenance or events
- Admin authentication for protected endpoints
- Comprehensive test suite

## Setup Instructions

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd turf
```

2. Create a virtual environment and activate it:

```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Apply migrations:

```bash
python manage.py migrate
```

5. Create a superuser for admin access:

```bash
python manage.py createsuperuser
```

6. Load initial data (creates Cricket and Pickle Ball activities):

```bash
python manage.py loaddata initial_data.json
```

7. Run the development server:

```bash
python manage.py runserver
```

## API Endpoints

### Authentication

- `POST /api-token-auth/` - Obtain authentication token (for admin APIs)

### Pickle Ball APIs

#### Public APIs

- `GET /api/pickleball/slots/?date=YYYY-MM-DD` - List available slots for Pickle Ball on a date
- `POST /api/pickleball/bookings/` - Create a new Pickle Ball booking

Request body:
```json
{
  "slot": 1,
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "user_phone": "1234567890"
}
```

- `DELETE /api/pickleball/bookings/{id}/` - Cancel a booking

#### Admin APIs (requires authentication)

- `GET /api/pickleball/bookings/?date=YYYY-MM-DD` - View all bookings for a date
- `POST /api/pickleball/blocks/` - Block specific Pickle Ball slots

Request body:
```json
{
  "date": "2024-07-14",
  "start_time": "16:00",
  "end_time": "17:00",
  "reason": "Maintenance"
}
```

- `DELETE /api/pickleball/blocks/{id}/` - Unblock a slot

### Cricket APIs

#### Public APIs

- `GET /api/cricket/slots/?date=YYYY-MM-DD` - List available slots for Cricket on a date
- `POST /api/cricket/bookings/` - Create a new Cricket booking

Request body:
```json
{
  "slot": 1,
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "user_phone": "1234567890"
}
```

- `DELETE /api/cricket/bookings/{id}/` - Cancel a booking

#### Admin APIs (requires authentication)

- `GET /api/cricket/bookings/?date=YYYY-MM-DD` - View all bookings for a date
- `POST /api/cricket/blocks/` - Block specific Cricket slots

Request body:
```json
{
  "date": "2024-07-14",
  "start_time": "13:00",
  "end_time": "14:00",
  "reason": "Team Event"
}
```

- `DELETE /api/cricket/blocks/{id}/` - Unblock a slot

## Authentication for Admin APIs

To use the admin APIs, you need to include an Authorization header with your requests:

```
Authorization: Token <your-token>
```

You can obtain a token by sending a POST request to `/api-token-auth/` with your username and password.

## Running Tests

```bash
python manage.py test
``` 