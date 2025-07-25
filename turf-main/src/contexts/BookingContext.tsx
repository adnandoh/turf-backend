import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { format } from 'date-fns';
import { cricketService, pickleballService, Slot, BookingRequest } from '../services/api';

// Define the context types
interface BookingContextType {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    slots: Slot[];
    selectedSlots: number[];
    loading: boolean;
    error: string | null;
    sportType: 'cricket' | 'pickleball' | null;
    setSportType: (type: 'cricket' | 'pickleball') => void;
    fetchSlots: () => Promise<void>;
    toggleSlotSelection: (slotId: number) => void;
    createBooking: (userData: UserData) => Promise<boolean>;
    clearSelectedSlots: () => void;
    calculateTotalPrice: () => number;
}

interface UserData {
    user_name: string;
    user_email: string;
    user_phone: string;
}

// Create the context
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Define the provider props
interface BookingProviderProps {
    children: ReactNode;
}

// Price mapping for different time slots
const getPriceForSlot = (startTime: string): number => {
    const hour = parseInt(startTime.split(':')[0]);

    if (hour >= 4 && hour < 7) return 1200; // Early morning
    if (hour >= 7 && hour < 16) return 1500; // Morning and afternoon
    if (hour >= 16 && hour < 24) return 2000; // Evening
    return 1200; // Midnight (0-4)
};

// Provider component
export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [slots, setSlots] = useState<Slot[]>([]);
    const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [sportType, setSportType] = useState<'cricket' | 'pickleball' | null>(null);



    // Fetch available slots for the selected date and sport
    const fetchSlots = useCallback(async () => {
        // Only make API calls if we're actually on the booking page
        if (!window.location.pathname.includes('/booking/')) {
            console.log('🎯 CUSTOMER: Skipping API call - not on booking page');
            return;
        }

        // Determine sport type from URL to ensure accuracy
        const currentPath = window.location.pathname;
        let currentSportType: 'cricket' | 'pickleball' | null = null;

        if (currentPath.includes('/booking/cricket')) {
            currentSportType = 'cricket';
        } else if (currentPath.includes('/booking/pickleball')) {
            currentSportType = 'pickleball';
        }

        // If no valid sport type found in URL, use the state
        const activeSportType = currentSportType || sportType;

        if (!activeSportType) {
            console.log('🎯 CUSTOMER: No sport type found, skipping API call');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const formattedDate = format(selectedDate, 'yyyy-MM-dd');
            console.log(`🎯 CUSTOMER: Fetching slots for ${activeSportType} on ${formattedDate} (URL: ${currentPath})`);

            const service = activeSportType === 'cricket' ? cricketService : pickleballService;
            const response = await service.getAvailableSlots(formattedDate);

            console.log(`🎯 CUSTOMER ${activeSportType.toUpperCase()} API Response:`, response);
            console.log(`🎯 CUSTOMER ${activeSportType.toUpperCase()} Slots data:`, response.data);

            // Use the actual API data
            setSlots(response.data || []);
        } catch (err: any) {
            console.error(`🎯 CUSTOMER Error fetching ${activeSportType} slots:`, err);
            console.error('🎯 CUSTOMER Error details:', err.response ? err.response.data : 'No response data');

            setError(`Failed to load available slots: ${err.message || 'Unknown error'}`);
            setSlots([]);
        } finally {
            setLoading(false);
        }
    }, [selectedDate, sportType]);

    // Toggle slot selection
    const toggleSlotSelection = (slotId: number) => {
        setSelectedSlots(prev => {
            if (prev.includes(slotId)) {
                return prev.filter(id => id !== slotId);
            } else {
                return [...prev, slotId];
            }
        });
    };

    // Create a booking
    const createBooking = async (userData: UserData): Promise<boolean> => {
        if (!sportType || selectedSlots.length === 0) return false;

        setLoading(true);
        setError(null);

        try {
            const service = sportType === 'cricket' ? cricketService : pickleballService;

            // Create bookings for all selected slots
            const bookingPromises = selectedSlots.map(slotId => {
                const bookingData: BookingRequest = {
                    slot: slotId,
                    ...userData
                };
                return service.createBooking(bookingData);
            });

            await Promise.all(bookingPromises);
            return true;
        } catch (err) {
            console.error('Error creating booking:', err);
            setError('Failed to create booking. Please try again.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Clear selected slots
    const clearSelectedSlots = () => {
        setSelectedSlots([]);
    };

    // Calculate total price for selected slots
    const calculateTotalPrice = (): number => {
        return selectedSlots.reduce((total, slotId) => {
            const slot = slots.find(s => s.id === slotId);
            if (slot) {
                // Use backend price if available, otherwise fallback to local calculation
                return total + (slot.price || getPriceForSlot(slot.start_time));
            }
            return total;
        }, 0);
    };

    const value = {
        selectedDate,
        setSelectedDate,
        slots,
        selectedSlots,
        loading,
        error,
        sportType,
        setSportType,
        fetchSlots,
        toggleSlotSelection,
        createBooking,
        clearSelectedSlots,
        calculateTotalPrice
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};

// Custom hook to use the booking context
export const useBooking = () => {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};