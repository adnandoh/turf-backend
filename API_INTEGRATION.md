# Turf Booking System API Integration

This document provides an overview of how the backend Django API is integrated with the frontend React applications.

## Project Structure

- **Backend (Django)**: Handles the core booking functionality and API endpoints
- **Customer Frontend**: Public-facing website for customers to book turf slots
- **Management Frontend**: Admin interface for managing bookings and blocking slots

## API Services

### 1. Customer Frontend API Services (`frontend/src/services/api.ts`)

This file contains the API services for the customer-facing frontend:

```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cricket APIs
export const cricketService = {
  getAvailableSlots: (date: string) => {
    return api.get(`/api/cricket/slots/?date=${date}`);
  },
  
  createBooking: (bookingData) => {
    return api.post('/api/cricket/bookings/', bookingData);
  },
  
  cancelBooking: (id: number) => {
    return api.delete(`/api/cricket/bookings/${id}/`);
  }
};

// Pickle Ball APIs
export const pickleballService = {
  getAvailableSlots: (date: string) => {
    return api.get(`/api/pickleball/slots/?date=${date}`);
  },
  
  createBooking: (bookingData) => {
    return api.post('/api/pickleball/bookings/', bookingData);
  },
  
  cancelBooking: (id: number) => {
    return api.delete(`/api/pickleball/bookings/${id}/`);
  }
};

export default api;
```

### 2. Management Frontend API Services (`frontend-manage/src/api.jsx`)

This file contains the API services for the management frontend with authentication:

```javascript
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Authentication
export const authService = {
  login: (credentials) => {
    return api.post('/api-token-auth/', credentials).then(response => {
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
      }
      return response;
    });
  },
  
  logout: () => {
    localStorage.removeItem('auth_token');
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  }
};

// Cricket APIs
export const cricketService = {
  getBookings: (date) => {
    return api.get(`/api/cricket/bookings/?date=${date}`);
  },
  
  getSlots: (date) => {
    return api.get(`/api/cricket/slots/?date=${date}`);
  },
  
  createBlock: (blockData) => {
    return api.post('/api/cricket/blocks/', blockData);
  },
  
  removeBlock: (id) => {
    return api.delete(`/api/cricket/blocks/${id}/`);
  }
};

// Pickle Ball APIs
export const pickleballService = {
  getBookings: (date) => {
    return api.get(`/api/pickleball/bookings/?date=${date}`);
  },
  
  getSlots: (date) => {
    return api.get(`/api/pickleball/slots/?date=${date}`);
  },
  
  createBlock: (blockData) => {
    return api.post('/api/pickleball/blocks/', blockData);
  },
  
  removeBlock: (id) => {
    return api.delete(`/api/pickleball/blocks/${id}/`);
  }
};
```

## Context API Integration

### 1. Customer Frontend Context (`frontend/src/contexts/BookingContext.tsx`)

The `BookingContext` provides state management for the customer frontend:

- Manages the selected date and activity
- Fetches available slots based on the selected date/activity
- Handles booking creation and cancellation
- Manages loading and error states

### 2. Management Frontend Contexts

#### Authentication Context (`frontend-manage/src/contexts/AuthContext.jsx`)

The `AuthContext` handles authentication for the management frontend:

- Manages login/logout functionality
- Stores authentication state
- Handles token management

#### Management Context (`frontend-manage/src/contexts/ManagementContext.jsx`)

The `ManagementContext` provides state management for the management frontend:

- Manages the selected date and activity
- Fetches bookings and slots
- Handles blocking and unblocking slots
- Manages loading and error states

## API Endpoints Used

### Public Endpoints (Customer Frontend)

- `GET /api/cricket/slots/?date=YYYY-MM-DD` - Get available Cricket slots
- `GET /api/pickleball/slots/?date=YYYY-MM-DD` - Get available Pickle Ball slots
- `POST /api/cricket/bookings/` - Create a Cricket booking
- `POST /api/pickleball/bookings/` - Create a Pickle Ball booking
- `DELETE /api/cricket/bookings/{id}/` - Cancel a Cricket booking
- `DELETE /api/pickleball/bookings/{id}/` - Cancel a Pickle Ball booking

### Admin Endpoints (Management Frontend)

- `POST /api-token-auth/` - Authenticate and get token
- `GET /api/cricket/bookings/?date=YYYY-MM-DD` - Get all Cricket bookings for a date
- `GET /api/pickleball/bookings/?date=YYYY-MM-DD` - Get all Pickle Ball bookings for a date
- `POST /api/cricket/blocks/` - Block Cricket slots
- `POST /api/pickleball/blocks/` - Block Pickle Ball slots
- `DELETE /api/cricket/blocks/{id}/` - Unblock Cricket slot
- `DELETE /api/pickleball/blocks/{id}/` - Unblock Pickle Ball slot

## Authentication Flow

1. Admin user enters credentials in the login form
2. The credentials are sent to `/api-token-auth/` endpoint
3. Upon successful authentication, the returned token is stored in localStorage
4. The token is added to the Authorization header for all subsequent API requests
5. Protected routes redirect to the login page if no token is present

## Best Practices Implemented

1. **Separation of Concerns**:
   - API services are separated from UI components
   - Context providers handle state management

2. **Authentication**:
   - Token-based authentication for admin APIs
   - Token storage in localStorage
   - Automatic token inclusion in request headers
   - Protected routes with authentication checks

3. **Error Handling**:
   - Proper error handling in API calls
   - Loading states for UI feedback
   - Error messages displayed to users

4. **Type Safety**:
   - TypeScript used in the customer frontend
   - Interface definitions for API responses and request payloads

5. **Code Organization**:
   - API services grouped by activity type
   - Context providers for state management
   - Component-based architecture

## Running the Application

1. Start the Django backend:
```bash
python manage.py runserver
```

2. Start the customer frontend:
```bash
cd frontend
npm run dev
```

3. Start the management frontend:
```bash
cd frontend-manage
npm run dev
``` 