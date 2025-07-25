import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'business.business';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = 'turf booking, cricket booking, pickleball booking, sports facility, Lonavala sports, turf rental, sports ground booking',
  image = '/images/turf-hero.jpg',
  url = 'https://turfbook.com',
  type = 'website',
  author = 'TurfBook',
  publishedTime,
  modifiedTime,
  noIndex = false,
  canonicalUrl,
}) => {
  useEffect(() => {
    const siteTitle = 'TurfBook - Premium Sports Booking in Lonavala';
    const fullTitle = title === 'Home' ? siteTitle : `${title} | ${siteTitle}`;
    const fullUrl = canonicalUrl || url;
    const fullImage = image.startsWith('http') ? image : `${url}${image}`;

    // Update document title
    document.title = fullTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Helper function to update or create link tags
    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // Basic Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateLinkTag('canonical', fullUrl);

    // Robots
    if (noIndex) {
      updateMetaTag('robots', 'noindex,nofollow');
    }

    // Open Graph / Facebook
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', fullImage, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:site_name', 'TurfBook', true);
    updateMetaTag('og:locale', 'en_IN', true);

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', fullImage);
    updateMetaTag('twitter:creator', '@TurfBook');

    // Article specific
    if (type === 'article' && publishedTime) {
      updateMetaTag('article:published_time', publishedTime, true);
    }
    if (type === 'article' && modifiedTime) {
      updateMetaTag('article:modified_time', modifiedTime, true);
    }
    if (type === 'article' && author) {
      updateMetaTag('article:author', author, true);
    }

    // Business specific
    if (type === 'business.business') {
      updateMetaTag('business:contact_data:street_address', 'Gat no 69/32, Railway station, boraj road, near Malavli', true);
      updateMetaTag('business:contact_data:locality', 'Lonavala', true);
      updateMetaTag('business:contact_data:region', 'Maharashtra', true);
      updateMetaTag('business:contact_data:postal_code', '410401', true);
      updateMetaTag('business:contact_data:country_name', 'India', true);
      updateMetaTag('business:contact_data:phone_number', '+918468942754', true);
    }

    // Additional SEO Tags
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('theme-color', '#388e3c');
    updateMetaTag('msapplication-TileColor', '#388e3c');

    // Structured Data for Local Business
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SportsActivityLocation",
      "name": "TurfBook - Turf N Lonavala",
      "description": description,
      "url": fullUrl,
      "image": fullImage,
      "telephone": "+91-84689-42754",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Gat no 69/32, Railway station, boraj road, near Malavli",
        "addressLocality": "Lonavala",
        "addressRegion": "Maharashtra",
        "postalCode": "410401",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "18.7451839",
        "longitude": "73.4835825"
      },
      "openingHours": "Mo-Su 06:30-06:30",
      "priceRange": "₹700-₹1300",
      "sport": ["Cricket", "Pickleball"],
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Cricket Field",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification", 
          "name": "Pickleball Court",
          "value": true
        }
      ],
      "sameAs": [
        `https://wa.me/8468942754`
      ]
    };

    // Update or create structured data script
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime, noIndex, canonicalUrl]);

  return null;
};

export default SEO;