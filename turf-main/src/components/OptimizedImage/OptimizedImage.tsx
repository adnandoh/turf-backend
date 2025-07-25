import React, { useState } from 'react';
import { Box, Skeleton } from '@mui/material';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  borderRadius?: number | string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sx?: any;
  onClick?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = '100%',
  height = 'auto',
  objectFit = 'cover',
  borderRadius = 0,
  loading = 'lazy',
  priority = false,
  sx = {},
  onClick
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <Box
        sx={{
          width,
          height,
          borderRadius,
          bgcolor: 'grey.200',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'grey.500',
          fontSize: '0.875rem',
          ...sx
        }}
      >
        Image not available
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', width, height, borderRadius, overflow: 'hidden', ...sx }}>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius
          }}
        />
      )}
      <Box
        component="img"
        src={src}
        alt={alt}
        loading={priority ? 'eager' : loading}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        sx={{
          width: '100%',
          height: '100%',
          objectFit,
          display: isLoading ? 'none' : 'block',
          cursor: onClick ? 'pointer' : 'default',
          transition: 'transform 0.3s ease',
          '&:hover': onClick ? {
            transform: 'scale(1.02)'
          } : {}
        }}
      />
    </Box>
  );
};

export default OptimizedImage;