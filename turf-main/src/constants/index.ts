// Centralized exports for all constants
export * from './colors';
export * from './animations';

// Business constants
export const BUSINESS_INFO = {
  name: 'TurfBook - Turf N Lonavala',
  phone: '+918468942754',
  whatsapp: '8468942754',
  email: 'turfnlonavala@gmail.com',
  website: 'https://www.turfngroup.com',
  address: {
    street: 'Gat no 69/32, Railway station, boraj road, near Malavli',
    city: 'Lonavala',
    state: 'Maharashtra',
    pincode: '410401',
    country: 'India'
  },
  coordinates: {
    latitude: '18.7451839',
    longitude: '73.4835825'
  },
  hours: 'Mo-Su 06:30-06:30',
  priceRange: '₹700-₹1300',
  sports: ['Cricket', 'Pickleball', 'Football', 'Basketball', 'Badminton']
} as const;