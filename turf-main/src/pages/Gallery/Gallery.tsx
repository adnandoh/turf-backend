import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid as MuiGrid, 
  Card, 
  CardMedia, 
  Dialog, 
  DialogContent, 
  IconButton,
  Chip,
  Paper
} from '@mui/material';
import { 
  Close as CloseIcon,
  ZoomIn as ZoomInIcon,
  SportsCricket as CricketIcon,
  SportsFootball as FootballIcon,
  Lightbulb as NightIcon,
  Event as EventIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import { colors, fadeIn, BUSINESS_INFO } from '../../constants';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: 'cricket' | 'football' | 'night' | 'events';
  description: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: '/images/turf-main-ground.webp',
    title: 'Turf N Lonavala - Main Ground',
    category: 'cricket',
    description: 'Our premium artificial turf ground perfect for cricket, football and other sports'
  },
  {
    id: 2,
    src: '/images/turf-multi-sport.webp',
    title: 'Multi-Sport Turf Facility',
    category: 'football',
    description: 'Professional grade turf suitable for multiple sports with scenic mountain views'
  },
  {
    id: 3,
    src: '/images/turf-overview.webp',
    title: 'Sports Ground Overview',
    category: 'events',
    description: 'Complete view of our well-maintained sports facility in the heart of Lonavala'
  }
];

const categories = [
  { key: 'all', label: 'All Photos', icon: null, color: colors.primary.main },
  { key: 'cricket', label: 'Cricket', icon: <CricketIcon />, color: colors.primary.main },
  { key: 'football', label: 'Football', icon: <FootballIcon />, color: colors.secondary.main },
  { key: 'night', label: 'Night Matches', icon: <NightIcon />, color: colors.accent.main },
  { key: 'events', label: 'Events', icon: <EventIcon />, color: colors.secondary.dark },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <SEO
        title="Gallery"
        description="View photos of Turf N Lonavala's cricket and football facilities. See our LED-lit night matches, tournaments, and world-class sports infrastructure in scenic Lonavala."
        keywords="turf gallery lonavala, cricket ground photos, football turf images, night matches, sports facility gallery, turf photos maharashtra"
        url="https://turfbook.com/gallery"
      />
      <Box sx={{ bgcolor: colors.background.default, minHeight: '100vh' }}>
        {/* Hero Section */}
        <Box 
          sx={{ 
            position: 'relative',
            minHeight: '50vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.background.paper,
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url(/images/turf-main-ground.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.2,
              zIndex: 0,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: colors.gradient.primary,
              opacity: 0.8,
              zIndex: 1,
            }
          }}
        >
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <Typography
                variant="h2"
                component="h1"
                align="center"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  color: 'white',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                📸 Gallery
              </Typography>
              <Typography
                variant="h5"
                align="center"
                sx={{
                  color: 'rgba(255,255,255,0.95)',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontSize: { xs: '1.125rem', md: '1.5rem' },
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                Turf in Action • Night Matches • Events & Tournaments
              </Typography>
            </motion.div>
          </Container>
        </Box>

        {/* Gallery Content */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            {/* Category Filter */}
            <Box sx={{ mb: 6, textAlign: 'center' }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  color: colors.primary.dark,
                }}
              >
                Browse by Category
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                {categories.map((category) => (
                  <Chip
                    key={category.key}
                    icon={category.icon}
                    label={category.label}
                    onClick={() => setSelectedCategory(category.key)}
                    sx={{
                      py: 2,
                      px: 1,
                      fontSize: '1rem',
                      fontWeight: 600,
                      bgcolor: selectedCategory === category.key ? category.color : 'transparent',
                      color: selectedCategory === category.key ? 'white' : category.color,
                      border: `2px solid ${category.color}`,
                      '&:hover': {
                        bgcolor: category.color,
                        color: 'white',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Image Grid */}
            <MuiGrid container spacing={3}>
              {filteredImages.map((image, index) => (
                <MuiGrid size={{ xs: 12, sm: 6, md: 4 }} key={image.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Box
                      sx={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        },
                      }}
                      onClick={() => handleImageClick(image)}
                    >
                      <Box
                        component="img"
                        src={image.src}
                        alt={image.title}
                        sx={{
                          width: '100%',
                          height: 250,
                          objectFit: 'cover',
                          borderRadius: 4,
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.02)',
                          },
                        }}
                      />
                    </Box>
                  </motion.div>
                </MuiGrid>
              ))}
            </MuiGrid>

            {/* Call to Action */}
            <Paper
              sx={{
                mt: 8,
                p: 6,
                borderRadius: 4,
                textAlign: 'center',
                background: colors.gradient.primary,
                color: 'white',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                }}
              >
                Ready to Create Your Own Memories?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  fontSize: '1.125rem',
                  opacity: 0.9,
                }}
              >
                Book your slot now and be part of the action at Turf N Lonavala!
              </Typography>
              <Typography
                component="a"
                href="tel:+918468942754"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1.125rem',
                  bgcolor: 'rgba(255,255,255,0.2)',
                  px: 4,
                  py: 2,
                  borderRadius: 3,
                  '&:hover': { 
                    bgcolor: 'rgba(255,255,255,0.3)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                📞 Call: 8468942754
              </Typography>
            </Paper>
          </motion.div>
        </Container>

        {/* Image Dialog */}
        <Dialog
          open={!!selectedImage}
          onClose={handleCloseDialog}
          maxWidth="lg"
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              bgcolor: 'transparent',
              boxShadow: 'none',
              overflow: 'visible',
            },
          }}
        >
          <DialogContent sx={{ p: 0, position: 'relative' }}>
            {selectedImage && (
              <>
                <IconButton
                  onClick={handleCloseDialog}
                  sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    bgcolor: 'rgba(255,255,255,0.9)',
                    color: colors.text.primary,
                    zIndex: 1,
                    '&:hover': {
                      bgcolor: 'white',
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <Box
                  component="img"
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  }}
                />
                <Paper
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 3,
                    bgcolor: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '0 0 8px 8px',
                  }}
                >
                  <Typography variant="h6" fontWeight={700} color={colors.text.primary} sx={{ mb: 1 }}>
                    {selectedImage.title}
                  </Typography>
                  <Typography variant="body1" color={colors.text.secondary}>
                    {selectedImage.description}
                  </Typography>
                </Paper>
              </>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default Gallery;