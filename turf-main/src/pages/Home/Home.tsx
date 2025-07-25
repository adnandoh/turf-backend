import React from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Grid as MuiGrid,
  Stack, 
  Typography, 
  useTheme,
  useMediaQuery,
  Paper,
  Fab,
  Tooltip,
} from '@mui/material';
import { 
  WhatsApp as WhatsAppIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import { colors, fadeIn, slideIn, BUSINESS_INFO } from '../../constants';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <SEO
        title="Home"
        description="Book premium cricket and pickleball courts in Lonavala. TurfBook offers world-class sports facilities with scenic mountain views. Available 24/7 with instant confirmation. Rates from ₹700/hour."
        keywords="turf booking lonavala, cricket ground booking, pickleball court rental, sports facility lonavala, turf rental mumbai pune, outdoor sports booking"
        type="website"
        url="https://turfbook.com"
      />
      <Box>
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          minHeight: { xs: '70vh', md: '90vh' },
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: colors.background.paper,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1556056504-5c7696c4c28d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80)',
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
            opacity: 0.9,
            zIndex: 1,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 4, md: 6 } }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideIn}
          >
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: { xs: '100%', md: '70%' } }}>
              <Typography
                variant={isMobile ? "h3" : "h1"}
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: { xs: 2, md: 3 },
                  color: 'white',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '4.5rem', lg: '5.5rem' },
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                Lonavala's Premier
                <br />
                Sports Destination
              </Typography>
              <Typography
                variant="h5"
                sx={{ 
                  mb: { xs: 3, md: 4 }, 
                  color: 'rgba(255,255,255,0.95)',
                  maxWidth: { xs: '100%', md: '90%' },
                  lineHeight: 1.6,
                  fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                }}
              >
                Experience the thrill of sports amidst scenic mountain views.
              </Typography>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                sx={{ mt: 2 }}
              >
                <Button 
                  variant="contained" 
                  size="large"
                  component="a"
                  href="tel:+918468942754"
                  sx={{ 
                    py: { xs: 1.5, md: 2 }, 
                    px: { xs: 3, md: 4 },
                    borderRadius: 3,
                    bgcolor: colors.primary.main,
                    color: 'white',
                    fontWeight: 600,
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: colors.primary.dark,
                    },
                  }}
                >
                  Book Now
                </Button>
                
                <Button 
                  variant="outlined" 
                  size="large"
                  onClick={() => window.open('https://www.google.com/maps/dir/19.0744702,72.8869927/Gat+no+69+%2F32,+Turf+N+Lonavala,+Railway+station,+boraj+road,+near+Malavli,+Malavli,+Lonavala,+Maharashtra+410401/@18.9891161,72.8523087,10z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3bc2ab70d00a1c5f:0xe9c8a48745dd469c!2m2!1d73.4835825!2d18.7451839?entry=ttu&g_ep=EgoyMDI1MDcyMS4wIKXMDSoASAFQAw%3D%3D', '_blank')}
                  sx={{ 
                    py: { xs: 1.5, md: 2 }, 
                    px: { xs: 3, md: 4 },
                    borderRadius: 3,
                    borderWidth: 2,
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  View Location
                </Button>
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </Box>



      {/* Rate Card */}
      <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: colors.background.default }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Typography 
              variant={isMobile ? "h4" : "h3"} 
              component="h2" 
              align="center"
              fontWeight={700}
              sx={{ 
                mb: { xs: 3, md: 6 },
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
                color: colors.primary.dark,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Rate Chart
            </Typography>
            
            {/* Desktop/Tablet Rate Chart */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 6,
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                  border: `3px solid ${colors.primary.light}`,
                  mb: 5,
                }}
              >
                <Box
                  sx={{
                    background: colors.gradient.primary,
                    py: 3,
                    px: 4,
                  }}
                >
                  <MuiGrid container spacing={3} alignItems="center">
                    <MuiGrid size={3}>
                      <Typography variant="h6" fontWeight={700} color="white" align="center">
                        Days
                      </Typography>
                    </MuiGrid>
                    <MuiGrid size={3}>
                      <Typography variant="h6" fontWeight={700} color="white" align="center">
                        Time Slot
                      </Typography>
                    </MuiGrid>
                    <MuiGrid size={2}>
                      <Typography variant="h6" fontWeight={700} color="white" align="center">
                        Duration
                      </Typography>
                    </MuiGrid>
                    <MuiGrid size={4}>
                      <Typography variant="h6" fontWeight={700} color="white" align="center">
                        Charges
                      </Typography>
                    </MuiGrid>
                  </MuiGrid>
                </Box>

                {/* Rate Rows */}
                {[
                  { days: 'Monday - Thursday', time: '6:30 AM - 6:30 PM', duration: '1 Hour', price: '₹700', bgColor: 'rgba(56, 142, 60, 0.05)' },
                  { days: 'Monday - Thursday', time: '6:30 PM - 6:30 AM', duration: '1 Hour', price: '₹1000', bgColor: 'rgba(56, 142, 60, 0.02)' },
                  { days: 'Friday - Sunday', time: '6:30 AM - 6:30 PM', duration: '1 Hour', price: '₹1000', bgColor: 'rgba(56, 142, 60, 0.05)' },
                  { days: 'Friday - Sunday', time: '6:30 PM - 6:30 AM', duration: '1 Hour', price: '₹1300', bgColor: 'rgba(56, 142, 60, 0.02)' },
                ].map((row, index) => (
                  <Box
                    key={index}
                    sx={{
                      bgcolor: row.bgColor,
                      py: 3,
                      px: 4,
                      borderBottom: index < 3 ? `1px solid ${colors.primary.light}20` : 'none',
                    }}
                  >
                    <MuiGrid container spacing={3} alignItems="center">
                      <MuiGrid size={3}>
                        <Typography variant="body1" fontWeight={600} color={colors.text.primary} align="center">
                          {row.days}
                        </Typography>
                      </MuiGrid>
                      <MuiGrid size={3}>
                        <Typography variant="body1" color={colors.text.secondary} align="center">
                          {row.time}
                        </Typography>
                      </MuiGrid>
                      <MuiGrid size={2}>
                        <Typography variant="body1" color={colors.text.secondary} align="center">
                          {row.duration}
                        </Typography>
                      </MuiGrid>
                      <MuiGrid size={4}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Typography
                            variant="h6"
                            fontWeight={700}
                            sx={{
                              color: colors.primary.main,
                              bgcolor: colors.background.paper,
                              px: 3,
                              py: 1,
                              borderRadius: 3,
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            }}
                          >
                            {row.price}
                          </Typography>
                        </Box>
                      </MuiGrid>
                    </MuiGrid>
                  </Box>
                ))}
              </Paper>
            </Box>

            {/* Mobile Rate Chart */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Stack spacing={3} sx={{ mb: 4 }}>
                {[
                  { days: 'Monday - Thursday', time: '6:30 AM - 6:30 PM', duration: '1 Hour', price: '₹700' },
                  { days: 'Monday - Thursday', time: '6:30 PM - 6:30 AM', duration: '1 Hour', price: '₹1000' },
                  { days: 'Friday - Sunday', time: '6:30 AM - 6:30 PM', duration: '1 Hour', price: '₹1000' },
                  { days: 'Friday - Sunday', time: '6:30 PM - 6:30 AM', duration: '1 Hour', price: '₹1300' },
                ].map((row, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                      border: `2px solid ${colors.primary.light}`,
                    }}
                  >
                    <Box
                      sx={{
                        background: colors.gradient.primary,
                        py: 2,
                        px: 3,
                      }}
                    >
                      <Typography variant="h6" fontWeight={700} color="white" align="center">
                        {row.days}
                      </Typography>
                    </Box>
                    <Box sx={{ p: 3, bgcolor: colors.background.paper }}>
                      <Stack spacing={2}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color={colors.text.secondary} fontWeight={500}>
                            Time Slot:
                          </Typography>
                          <Typography variant="body1" fontWeight={600} color={colors.text.primary}>
                            {row.time}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color={colors.text.secondary} fontWeight={500}>
                            Duration:
                          </Typography>
                          <Typography variant="body1" fontWeight={600} color={colors.text.primary}>
                            {row.duration}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1 }}>
                          <Typography variant="body2" color={colors.text.secondary} fontWeight={500}>
                            Charges:
                          </Typography>
                          <Typography
                            variant="h6"
                            fontWeight={700}
                            sx={{
                              color: colors.primary.main,
                              bgcolor: colors.primary.light + '20',
                              px: 2,
                              py: 0.5,
                              borderRadius: 2,
                            }}
                          >
                            {row.price}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Box>
            

          </motion.div>
        </Container>
      </Box>




    </Box>
    </>
  );
};

export default Home;