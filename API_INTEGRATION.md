# 🔗 API Integration Guide - Complete URL Configuration

## 🌐 **PRODUCTION URLS**

### **Backend API (Railway)**
- **Base URL**: `https://turf-backend-production.up.railway.app`
- **Admin Panel**: `https://turf-backend-production.up.railway.app/admin/`
- **API Root**: `https://turf-backend-production.up.railway.app/api/`

### **Frontend Applications**
- **Customer App**: `https://turf-customer.vercel.app`
- **Admin App**: `https://turf-manage.vercel.app`

## 📡 **API ENDPOINTS**

### **Public Endpoints (Customer Frontend)**
```bash
# Cricket Slots
GET https://turf-backend-production.up.railway.app/api/cricket/slots/?date=2025-07-21

# Pickleball Slots  
GET https://turf-backend-production.up.railway.app/api/pickleball/slots/?date=2025-07-21

# Create Cricket Booking
POST https://turf-backend-production.up.railway.app/api/cricket/bookings/

# Create Pickleball Booking
POST https://turf-backend-production.up.railway.app/api/pickleball/bookings/
```

### **Admin Endpoints (Admin Frontend)**
```bash
# Authentication
POST https://turf-backend-production.up.railway.app/api-token-auth/

# Dashboard Data
GET https://turf-backend-production.up.railway.app/api/admin/dashboard/

# Cricket Management
GET https://turf-backend-production.up.railway.app/api/cricket/slots/?date=2025-07-21
POST https://turf-backend-production.up.railway.app/api/cricket/blocks/
DELETE https://turf-backend-production.up.railway.app/api/cricket/blocks/{id}/

# Pickleball Management
GET https://turf-backend-production.up.railway.app/api/pickleball/slots/?date=2025-07-21
POST https://turf-backend-production.up.railway.app/api/pickleball/blocks/
DELETE https://turf-backend-production.up.railway.app/api/pickleball/blocks/{id}/
```

## 🔧 **ENVIRONMENT CONFIGURATION**

### **Backend (.env)**
```bash
SECRET_KEY=turf-prod-2025-k9m#x8v@n2p$w7q!z5r&t3y*u6i+o1e-s4a^d7f%g0h=j2l
DEBUG=True
DATABASE_URL=postgresql://postgres:rZmXHNPYZYODBemYJHzmKllSpzjiXFjZ@maglev.proxy.rlwy.net:40181/railway
CORS_ALLOWED_ORIGINS=https://turf-customer.vercel.app,https://turf-manage.vercel.app
API_BASE_URL=https://turf-backend-production.up.railway.app
```

### **Customer Frontend (turf-main/.env)**
```bash
VITE_API_BASE_URL=https://turf-backend-production.up.railway.app
VITE_CRICKET_API_URL=https://turf-backend-production.up.railway.app/api/cricket
VITE_PICKLEBALL_API_URL=https://turf-backend-production.up.railway.app/api/pickleball
VITE_SITE_URL=https://turf-customer.vercel.app
```

### **Admin Frontend (turf-admin/.env)**
```bash
VITE_API_BASE_URL=https://turf-backend-production.up.railway.app
VITE_AUTH_API_URL=https://turf-backend-production.up.railway.app/api-token-auth
VITE_DASHBOARD_API_URL=https://turf-backend-production.up.railway.app/api/admin/dashboard
VITE_CRICKET_API_URL=https://turf-backend-production.up.railway.app/api/cricket
VITE_PICKLEBALL_API_URL=https://turf-backend-production.up.railway.app/api/pickleball
```

## 🚀 **RAILWAY ENVIRONMENT VARIABLES**

Set these in your Railway dashboard:

```bash
SECRET_KEY=turf-prod-2025-k9m#x8v@n2p$w7q!z5r&t3y*u6i+o1e-s4a^d7f%g0h=j2l
DEBUG=False
DJANGO_SETTINGS_MODULE=turf.settings
DATABASE_URL=postgresql://postgres:rZmXHNPYZYODBemYJHzmKllSpzjiXFjZ@postgres.railway.internal:5432/railway
CORS_ALLOWED_ORIGINS=https://turf-customer.vercel.app,https://turf-manage.vercel.app
ALLOWED_HOSTS=turf-backend-production.up.railway.app,.railway.app,.up.railway.app
```

## 🔒 **CORS CONFIGURATION**

### **Development (DEBUG=True)**
- Allows all origins for easy development

### **Production (DEBUG=False)**
- Restricted to specific origins:
  - `https://turf-customer.vercel.app`
  - `https://turf-manage.vercel.app`
  - `http://localhost:5173` (development)
  - `http://localhost:5174` (development)

## 📱 **API CLIENT CONFIGURATION**

### **Customer Frontend (api.ts)**
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://turf-backend-production.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### **Admin Frontend (api.js)**
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://turf-backend-production.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auto-add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});
```

## 🧪 **TESTING API CONNECTIONS**

### **Test Backend Health**
```bash
curl https://turf-backend-production.up.railway.app/admin/
```

### **Test Cricket Slots API**
```bash
curl "https://turf-backend-production.up.railway.app/api/cricket/slots/?date=2025-07-21"
```

### **Test Admin Authentication**
```bash
curl -X POST https://turf-backend-production.up.railway.app/api-token-auth/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### **Test Dashboard API (with auth)**
```bash
curl -H "Authorization: Token YOUR_TOKEN_HERE" \
  https://turf-backend-production.up.railway.app/api/admin/dashboard/
```

## 🔄 **API REQUEST FLOW**

### **Customer Booking Flow**
1. **Load Slots**: `GET /api/cricket/slots/?date=2025-07-21`
2. **Create Booking**: `POST /api/cricket/bookings/`
3. **Confirmation**: Response with booking details

### **Admin Management Flow**
1. **Login**: `POST /api-token-auth/` → Get token
2. **Dashboard**: `GET /api/admin/dashboard/` → Get stats
3. **View Slots**: `GET /api/cricket/slots/?date=2025-07-21` → All slots (including blocked)
4. **Block Slot**: `POST /api/cricket/blocks/` → Block specific slot
5. **Unblock Slot**: `DELETE /api/cricket/blocks/{id}/` → Remove block

## 🛠️ **DEBUGGING API CONNECTIONS**

### **Frontend Console Logs**
- Customer: `🎯 CUSTOMER API Request/Response`
- Admin: `🏏 ADMIN API Request/Response`

### **Common Issues & Solutions**

1. **CORS Error**
   - Check `CORS_ALLOWED_ORIGINS` in Railway
   - Ensure frontend URL is included

2. **401 Unauthorized (Admin)**
   - Check auth token in localStorage
   - Verify token format: `Token abc123...`

3. **404 Not Found**
   - Verify API endpoint URLs
   - Check Railway deployment status

4. **Timeout Errors**
   - Increase timeout in frontend config
   - Check Railway service health

## 📊 **API Response Examples**

### **Cricket Slots Response**
```json
[
  {
    "id": 1,
    "date": "2025-07-21",
    "start_time": "06:00:00",
    "end_time": "07:00:00",
    "start_time_formatted": "6:00 AM",
    "end_time_formatted": "7:00 AM",
    "is_blocked": false,
    "is_booked": false,
    "price": 1200
  }
]
```

### **Dashboard Response**
```json
{
  "todayBookings": {"cricket": 5, "pickleball": 3},
  "availableSlots": {"cricket": 20, "pickleball": 22},
  "totalSlots": {"cricket": 24, "pickleball": 24},
  "blockedSlots": {"cricket": 1, "pickleball": 0},
  "revenue": {"today": 15000, "week": 85000},
  "recentBookings": [...],
  "totalUsers": 45
}
```

## ✅ **CONNECTION STATUS**

- ✅ Backend API: `https://turf-backend-production.up.railway.app`
- ✅ Customer Frontend: `https://turf-customer.vercel.app`
- ✅ Admin Frontend: `https://turf-manage.vercel.app`
- ✅ CORS Configuration: Properly configured
- ✅ Authentication: Token-based auth implemented
- ✅ Environment Variables: All URLs configured
- ✅ API Interceptors: Request/response logging added

**All URLs are now properly connected across the entire project! 🎉**