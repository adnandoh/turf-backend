import React from 'react';
import { Box, Container, Typography, Paper, Grid as MuiGrid, Card, CardContent } from '@mui/material';
import { 
  WhatsApp as WhatsAppIcon, 
  Phone as PhoneIcon,
  SportsCricket as CricketIcon,
  SportsFootball as FootballIcon,
  SportsBasketball as BasketballIcon,
  SportsTennis as BadmintonIcon,
  SportsBaseball as PickleballIcon,
  Lightbulb as LightIcon,
  Security as SafetyIcon,
  Schedule as ScheduleIcon,
  Build as UtilityIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import { colors, fadeIn, BUSINESS_INFO } from '../../constants';

const Amenities = () => {
  const sportsAmenities = [
    {
      icon: <CricketIcon sx={{ fontSize: 48, color: colors.primary.main }} />,
      title: '🏏 Cricket Nets',
      description: 'Professional cricket nets with proper pitch conditions for practice and matches',
      color: colors.primary.main,
    },
    {
      icon: <FootballIcon sx={{ fontSize: 48, color: colors.secondary.main }} />,
      title: '⚽ Football (7v7)',
      description: 'Full-size football ground perfect for 7v7 matches with goal posts and markings',
      color: colors.secondary.main,
    },
    {
      icon: <BasketballIcon sx={{ fontSize: 48, color: colors.accent.main }} />,
      title: '🏀 Basketball',
      description: 'Basketball court with professional hoops and court markings',
      color: colors.accent.main,
    },
    {
      icon: <BadmintonIcon sx={{ fontSize: 48, color: colors.primary.main }} />,
      title: '🏸 Badminton',
      description: 'Badminton courts with proper net setup and court boundaries',
      color: colors.primary.main,
    },
    {
      icon: <PickleballIcon sx={{ fontSize: 48, color: colors.secondary.main }} />,
      title: '🥒 Pickleball',
      description: 'Dedicated pickleball courts with regulation nets and court dimensions',
      color: colors.secondary.main,
    },
  ];

  const facilities = [
    {
      icon: <LightIcon sx={{ fontSize: 48, color: colors.accent.main }} />,
      title: '💡 LED Floodlights for Night Play',
      description: 'High-quality LED lighting system for clear visibility during night matches',
      color: colors.accent.main,
    },
    {
      icon: <SafetyIcon sx={{ fontSize: 48, color: colors.primary.main }} />,
      title: '🛡️ Nets for Safety',
      description: 'Safety nets around the playing area to ensure player and spectator safety',
      color: colors.primary.main,
    },
    {
      icon: <ScheduleIcon sx={{ fontSize: 48, color: colors.secondary.main }} />,
      title: '🔁 24/7 Booking Availability',
      description: 'Round-the-clock booking system for your convenience',
      color: colors.secondary.main,
    },
    {
      icon: <UtilityIcon sx={{ fontSize: 48, color: colors.accent.main }} />,
      title: '🛠️ Multi-sport Utility Setup',
      description: 'Flexible ground setup that can be configured for different sports',
      color: colors.accent.main,
    },
  ];

  return (
    <>
      <SEO
        title="Sports & Amenities"
        description="Discover the sports and amenities at Turf N Lonavala. Cricket nets, football, basketball, badminton, pickleball courts with LED floodlights for night play. 24/7 booking available."
        keywords="turf amenities lonavala, cricket nets, football ground, basketball court, badminton court, pickleball court, LED floodlights, sports facilities"
        url="https://turfbook.com/amenities"
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
              backgroundImage: 'url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80)',
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
                🏅 Sports & Amenities
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
                Enjoy a variety of sports and top-notch facilities
              </Typography>
            </motion.div>
          </Container>
        </Box>

        {/* Sports Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Typography
              variant="h4"
              component="h2"
              align="center"
              sx={{
                fontWeight: 700,
                mb: 6,
                color: colors.primary.dark,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
              }}
            >
              Sports Available
            </Typography>

            <MuiGrid container spacing={4} sx={{ mb: 8 }}>
              {sportsAmenities.map((sport, index) => (
                <MuiGrid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                      border: `2px solid ${sport.color}20`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                        borderColor: sport.color,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Box sx={{ mb: 3 }}>
                        {sport.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: colors.text.primary,
                          fontSize: '1.25rem',
                        }}
                      >
                        {sport.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color={colors.text.secondary}
                        sx={{ lineHeight: 1.6 }}
                      >
                        {sport.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </MuiGrid>
              ))}
            </MuiGrid>

            {/* Facilities Section */}
            <Typography
              variant="h4"
              component="h2"
              align="center"
              sx={{
                fontWeight: 700,
                mb: 6,
                color: colors.primary.dark,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
              }}
            >
              Premium Facilities
            </Typography>

            <MuiGrid container spacing={4}>
              {facilities.map((facility, index) => (
                <MuiGrid size={{ xs: 12, sm: 6 }} key={index}>
                  <Paper
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                      border: `2px solid ${facility.color}20`,
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                        borderColor: facility.color,
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                      <Box sx={{ flexShrink: 0 }}>
                        {facility.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{
                            fontWeight: 700,
                            mb: 2,
                            color: colors.text.primary,
                            fontSize: '1.25rem',
                          }}
                        >
                          {facility.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          color={colors.text.secondary}
                          sx={{ lineHeight: 1.6 }}
                        >
                          {facility.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
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
                Ready to Experience Our Facilities?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  fontSize: '1.125rem',
                  opacity: 0.9,
                }}
              >
                Book your slot now and enjoy world-class sports facilities in the heart of Lonavala!
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
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
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.3)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <PhoneIcon /> Call: 8468942754
                </Typography>
                <Typography
                  component="a"
                  href="https://wa.me/8468942754"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '1.125rem',
                    bgcolor: 'rgba(255,255,255,0.2)',
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.3)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <WhatsAppIcon /> WhatsApp: 8468942754
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default Amenities;