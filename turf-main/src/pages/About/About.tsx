import React from 'react';
import { Box, Container, Typography, Paper, Button, Grid as MuiGrid } from '@mui/material';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import { colors, fadeIn, BUSINESS_INFO } from '../../constants';

const About = () => {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about a TurfBook - Lonavala's premier sports destination. We offer world-class cricket and pickleball facilities with scenic mountain views. Discover our story, mission, and commitment to providing exceptional sports experiences."
        keywords="about turfbook, lonavala sports facility, cricket ground lonavala, pickleball court lonavala, sports destination maharashtra"
        url="https://turfbook.com/about"
      />
      <Box sx={{ bgcolor: colors.background.default, minHeight: '100vh' }}>

        {/* Hero Section */}
        <Box
          sx={{
            position: 'relative',
            minHeight: '60vh',
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
              backgroundImage: 'url(https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80)',
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
                🏆 About Turf N Lonavala
              </Typography>
              <Typography
                variant="h4"
                align="center"
                sx={{
                  color: 'rgba(255,255,255,0.95)',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.4,
                  fontWeight: 600,
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                Where Passion Meets Play
              </Typography>
            </motion.div>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            {/* Welcome Section */}
            <Box sx={{ mb: 8 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  color: colors.primary.dark,
                  textAlign: 'center',
                  fontSize: { xs: '1.75rem', md: '2.25rem' },
                }}
              >
                Welcome to Your Premier Sports Destination
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.8,
                  color: colors.text.primary,
                  maxWidth: '900px',
                  mx: 'auto',
                  textAlign: 'center',
                  mb: 4,
                }}
              >
                Welcome to <strong>Turf N Lonavala</strong>, your premier destination for outdoor sports and recreation nestled in the heart of Lonavala. With two full-size <strong>5000 sq. ft. turf grounds</strong>, we offer a multi-sport experience for football, cricket, pickleball, basketball, badminton, and more.
              </Typography>
            </Box>

            {/* Features Grid */}
            <MuiGrid container spacing={4} sx={{ mb: 8 }}>
              <MuiGrid size={{ xs: 12, md: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: colors.background.paper,
                    border: `2px solid ${colors.primary.light}`,
                    textAlign: 'center',
                    height: '100%',
                  }}
                >
                  <Typography variant="h2" sx={{ color: colors.primary.main, mb: 2 }}>
                    🌙
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color={colors.text.primary} sx={{ mb: 2 }}>
                    24/7 Accessibility
                  </Typography>
                  <Typography variant="body2" color={colors.text.secondary} sx={{ lineHeight: 1.6 }}>
                    Whether you're hosting a late-night match or a morning cricket game, our LED floodlights and well-maintained turf make it convenient and exciting for players of all ages.
                  </Typography>
                </Paper>
              </MuiGrid>

              <MuiGrid size={{ xs: 12, md: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: colors.background.paper,
                    border: `2px solid ${colors.accent.light}`,
                    textAlign: 'center',
                    height: '100%',
                  }}
                >
                  <Typography variant="h2" sx={{ color: colors.accent.main, mb: 2 }}>
                    🏟️
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color={colors.text.primary} sx={{ mb: 2 }}>
                    Multi-Sport Experience
                  </Typography>
                  <Typography variant="body2" color={colors.text.secondary} sx={{ lineHeight: 1.6 }}>
                    Two full-size 5000 sq. ft. turf grounds supporting football, cricket, pickleball, basketball, badminton, and more sports activities.
                  </Typography>
                </Paper>
              </MuiGrid>

              <MuiGrid size={{ xs: 12, md: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: colors.background.paper,
                    border: `2px solid ${colors.secondary.light}`,
                    textAlign: 'center',
                    height: '100%',
                  }}
                >
                  <Typography variant="h2" sx={{ color: colors.secondary.main, mb: 2 }}>
                    🤝
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color={colors.text.primary} sx={{ mb: 2 }}>
                    Community Focus
                  </Typography>
                  <Typography variant="body2" color={colors.text.secondary} sx={{ lineHeight: 1.6 }}>
                    Perfect for friendly games, tournaments, and corporate bookings. Join our growing sports community in Lonavala!
                  </Typography>
                </Paper>
              </MuiGrid>
            </MuiGrid>

            {/* Our Story Section */}
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  color: colors.primary.dark,
                  fontSize: { xs: '1.75rem', md: '2.25rem' },
                }}
              >
                Our Story
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.8,
                  color: colors.text.primary,
                  maxWidth: '800px',
                  mx: 'auto',
                  mb: 4,
                }}
              >
                Founded by <strong>sports enthusiasts</strong>, Turf N Lonavala was built to promote <strong>fitness, friendship, and fun</strong>. Our turfs are perfect for friendly games, tournaments, and corporate bookings alike.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.8,
                  color: colors.text.primary,
                  maxWidth: '800px',
                  mx: 'auto',
                }}
              >
                With a focus on <strong>professional management</strong> and <strong>seamless booking</strong>, we're proud to be a local favorite in Lonavala. Join us on the turf and be part of a growing sports community!
              </Typography>
            </Box>

            {/* Call to Action */}
            <Box sx={{ textAlign: 'center', py: 6, bgcolor: colors.primary.light + '10', borderRadius: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: colors.primary.dark,
                }}
              >
                Ready to Join Our Sports Community?
              </Typography>
              <Button
                variant="contained"
                size="large"
                component="a"
                href="tel:+918468942754"
                sx={{
                  py: 2,
                  px: 6,
                  borderRadius: 4,
                  background: colors.gradient.primary,
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  textTransform: 'none',
                  textDecoration: 'none',
                  '&:hover': {
                    background: colors.gradient.secondary,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(56, 142, 60, 0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Book Your Slot Now
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default About; 
