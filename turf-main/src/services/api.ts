import axios from 'axios';

// Define the base URL for the API from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for CORS with credentials
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
});

// Add request interceptor for debugging
api.interceptors.request.use((config) => {
  console.log(`🎯 CUSTOMER API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ CUSTOMER API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ CUSTOMER API Error: ${error.response?.status} ${error.config?.url}`, error.response?.data);
    return Promise.reject(error);
  }
);

// Types for API responses
export interface Slot {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  start_time_formatted?: string;
  end_time_formatted?: string;
  is_blocked: boolean;
  block_reason?: string;
  is_booked?: boolean;
  user_name?: string;
  price?: number;
}

export interface BookingRequest {
  slot: number;
  user_name: string;
  user_email: string;
  user_phone: string;
}

export interface BookingResponse {
  id: number;
  slot: Slot;
  user_name: string;
  user_email: string;
  user_phone: string;
  created_at: string;
}

// Cricket APIs
export const cricketService = {
  getAvailableSlots: (date: string) => {
    return api.get<Slot[]>(`/api/cricket/slots/?date=${date}`);
  },

  createBooking: (bookingData: BookingRequest) => {
    return api.post<BookingResponse>('/api/cricket/bookings/', bookingData);
  },

  cancelBooking: (id: number) => {
    return api.delete(`/api/cricket/bookings/${id}/`);
  }
};

// Pickle Ball APIs
export const pickleballService = {
  getAvailableSlots: (date: string) => {
    return api.get<Slot[]>(`/api/pickleball/slots/?date=${date}`);
  },

  createBooking: (bookingData: BookingRequest) => {
    return api.post<BookingResponse>('/api/pickleball/bookings/', bookingData);
  },

  cancelBooking: (id: number) => {
    return api.delete(`/api/pickleball/bookings/${id}/`);
  }
};

export default api;