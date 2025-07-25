import { useEffect } from 'react';

// Performance monitoring hook for basic performance tracking
export const usePerformance = () => {
  useEffect(() => {
    // Basic performance monitoring without external dependencies
    const measurePerformance = () => {
      // Monitor page load performance
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming;
              const loadTime = navEntry.loadEventEnd - navEntry.fetchStart;
              if (loadTime > 0) {
                console.log('Page Load Time:', Math.round(loadTime), 'ms');
              }
            }
          });
        });

        try {
          observer.observe({ entryTypes: ['navigation'] });
          return () => observer.disconnect();
        } catch (error) {
          console.warn('Performance monitoring not supported');
        }
      }
    };

    const cleanup = measurePerformance();
    return cleanup;
  }, []);
};

// Hook for lazy loading images
export const useLazyLoading = () => {
  useEffect(() => {
    // Create intersection observer for lazy loading
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      // Observe all images with data-src attribute
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach((img) => imageObserver.observe(img));

      return () => {
        imageObserver.disconnect();
      };
    }
  }, []);
};