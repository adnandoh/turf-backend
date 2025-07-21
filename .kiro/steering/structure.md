# Project Structure

## Root Directory Organization

```
├── booking/                 # Django app for booking logic
├── turf/                   # Django project settings
├── turf-main/              # Customer-facing React frontend
├── turf-admin/             # Admin React frontend
├── venv/                   # Python virtual environment
├── manage.py               # Django management script
├── requirements.txt        # Python dependencies
└── db.sqlite3             # SQLite database
```

## Backend Structure (Django)

### booking/ - Core Application
- `models.py` - Activity, Slot, Booking models
- `views.py` - API viewsets with activity-specific inheritance
- `serializers.py` - DRF serializers for API responses
- `urls.py` - URL routing for booking endpoints
- `admin.py` - Django admin configuration
- `fixtures/` - Initial data (activities setup)
- `migrations/` - Database schema changes

### turf/ - Project Configuration
- `settings.py` - Django configuration with DRF and CORS
- `urls.py` - Root URL configuration
- `wsgi.py` / `asgi.py` - WSGI/ASGI application entry points

## Frontend Structure

### turf-main/ - Customer Frontend (TypeScript)
```
src/
├── components/             # Reusable UI components
│   ├── Layout/            # Page layout components
│   └── Footer/            # Footer component
├── contexts/              # React Context providers
│   └── BookingContext.tsx # Booking state management
├── pages/                 # Route-based page components
│   ├── Home/             # Landing page
│   ├── BookingPage/      # Slot selection and booking
│   ├── CheckoutPage/     # Booking confirmation
│   ├── About/            # About page
│   └── Contact/          # Contact page
├── services/             # API integration
│   └── api.ts           # Axios-based API services
├── theme/               # Material-UI theming
│   ├── theme.ts         # Theme configuration
│   └── ThemeProvider.tsx # Theme provider component
├── App.tsx              # Main application component
└── main.tsx            # Application entry point
```

### turf-admin/ - Admin Frontend (JavaScript)
```
src/
├── api/                  # API integration
│   └── api.js           # Admin API services with auth
├── components/          # Reusable UI components
│   ├── DateBlocker.jsx  # Slot blocking interface
│   ├── DateNavigator.jsx # Date selection component
│   ├── Navbar.jsx       # Navigation bar
│   ├── ProtectedRoute.jsx # Route protection
│   ├── SlotCard.jsx     # Individual slot display
│   └── SlotGrid.jsx     # Slot grid layout
├── pages/               # Route-based page components
│   ├── Login.jsx        # Authentication page
│   ├── Cricket.jsx      # Cricket management
│   └── Pickleball.jsx   # Pickleball management
├── utils/               # Utility functions
│   └── slotUtils.js     # Slot manipulation helpers
├── App.jsx              # Main application component
└── main.jsx            # Application entry point
```

## Architecture Patterns

### Backend Patterns
- **Activity-based inheritance**: Base viewsets extended for Cricket/Pickleball
- **Permission classes**: Separate permissions for public vs admin endpoints
- **Model relationships**: Foreign keys linking Activity → Slot → Booking
- **Database indexing**: Optimized queries for date/time lookups

### Frontend Patterns
- **Context API**: Centralized state management for booking flow
- **Service layer**: Separated API calls from UI components
- **Component composition**: Reusable components with props
- **Route protection**: Authentication guards for admin routes
- **Material-UI theming**: Consistent design system

### API Integration
- **RESTful endpoints**: Separate endpoints per activity type
- **Token authentication**: Stored in localStorage for admin frontend
- **CORS configuration**: Allows cross-origin requests from frontends
- **Error handling**: Consistent error responses and client-side handling