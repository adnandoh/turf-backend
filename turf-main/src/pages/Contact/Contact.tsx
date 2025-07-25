import React from 'react';
import { Box, Container, Typography, Paper, Grid as MuiGrid, Button, Chip } from '@mui/material';
import { Phone as PhoneIcon, LocationOn as LocationIcon, Email as EmailIcon, Schedule as ScheduleIcon, Language as WebsiteIcon, WhatsApp as WhatsAppIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import { colors, fadeIn, BUSINESS_INFO } from '../../constants';

const Contact = () => {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Contact TurfBook for cricket and pickleball court bookings in Lonavala. Call +91 84689 42754 or WhatsApp for instant booking confirmation. Located at Gat no 69/32, near Malavli Railway Station."
        keywords="contact turfbook, turf booking lonavala contact, cricket ground booking contact, sports facility contact lonavala, turf rental contact number"
        type="business.business"
        url="https://turfbook.com/contact"
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80)',
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
              📞 Get in Touch With Us
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{
                color: 'rgba(255,255,255,0.95)',
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1.125rem', md: '1.5rem' },
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              For Bookings, Queries & Support - We're here 24/7!
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Contact Information */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <MuiGrid container spacing={4} sx={{ mb: 6 }}>
            {/* Phone Contact */}
            <MuiGrid size={{ xs: 12, md: 6 }}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  border: `2px solid ${colors.accent.light}`,
                  height: '100%',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box
                    sx={{
                      bgcolor: colors.accent.main,
                      borderRadius: '50%',
                      p: 1.5,
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PhoneIcon sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                  <Typography variant="h5" fontWeight={600} color={colors.text.primary}>
                    📞 Call Us
                  </Typography>
                </Box>
                <Typography 
                  variant="h5" 
                  color={colors.primary.main} 
                  sx={{ 
                    mb: 2, 
                    fontWeight: 700,
                    letterSpacing: '0.5px'
                  }}
                >
                  +91 84689 42754
                </Typography>
                <Typography variant="body1" color={colors.text.secondary} sx={{ mb: 3, lineHeight: 1.6 }}>
                  Available 24/7 for instant bookings, queries, and support. Get immediate confirmation for your slot!
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    component="a"
                    href="tel:+918468942754"
                    startIcon={<PhoneIcon />}
                    sx={{
                      bgcolor: colors.accent.main,
                      color: 'white',
                      fontWeight: 600,
                      px: 3,
                      py: 1.5,
                      borderRadius: 3,
                      textTransform: 'none',
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                      '&:hover': { 
                        bgcolor: colors.accent.dark,
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Call Now
                  </Button>
                  <Button
                    variant="outlined"
                    component="a"
                    href="https://wa.me/8468942754"
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<WhatsAppIcon />}
                    sx={{
                      borderColor: '#25D366',
                      color: '#25D366',
                      fontWeight: 600,
                      px: 3,
                      py: 1.5,
                      borderRadius: 3,
                      textTransform: 'none',
                      borderWidth: 2,
                      '&:hover': { 
                        bgcolor: '#25D366',
                        color: 'white',
                        borderColor: '#25D366',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    WhatsApp
                  </Button>
                </Box>
              </Paper>
            </MuiGrid>

            {/* Email Contact */}
            <MuiGrid size={{ xs: 12, md: 6 }}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  border: `2px solid ${colors.secondary.light}`,
                  height: '100%',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <EmailIcon sx={{ color: colors.secondary.main, mr: 2, fontSize: 32 }} />
                  <Typography variant="h5" fontWeight={600} color={colors.text.primary}>
                    📧 Email
                  </Typography>
                </Box>
                <Typography variant="h6" color={colors.primary.main} sx={{ mb: 2 }}>
                  turfnlonavala@gmail.com
                </Typography>
                <Typography variant="body1" color={colors.text.secondary} sx={{ mb: 2 }}>
                  For detailed inquiries and booking confirmations
                </Typography>
                <Button
                  variant="contained"
                  component="a"
                  href="mailto:turfnlonavala@gmail.com"
                  sx={{
                    bgcolor: colors.secondary.main,
                    '&:hover': { bgcolor: colors.secondary.dark },
                  }}
                >
                  Send Email
                </Button>
              </Paper>
            </MuiGrid>

            {/* Website */}
            <MuiGrid size={{ xs: 12, md: 6 }}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  border: `2px solid ${colors.primary.light}`,
                  height: '100%',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <WebsiteIcon sx={{ color: colors.primary.main, mr: 2, fontSize: 32 }} />
                  <Typography variant="h5" fontWeight={600} color={colors.text.primary}>
                    🌐 Website
                  </Typography>
                </Box>
                <Typography variant="h6" color={colors.primary.main} sx={{ mb: 2 }}>
                  www.turfngroup.com
                </Typography>
                <Typography variant="body1" color={colors.text.secondary} sx={{ mb: 2 }}>
                  Visit our website for more information and updates
                </Typography>
                <Button
                  variant="contained"
                  component="a"
                  href="https://www.turfngroup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: colors.primary.main,
                    '&:hover': { bgcolor: colors.primary.dark },
                  }}
                >
                  Visit Website
                </Button>
              </Paper>
            </MuiGrid>

            {/* Business Hours */}
            <MuiGrid size={{ xs: 12, md: 6 }}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  border: `2px solid ${colors.accent.light}`,
                  height: '100%',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <ScheduleIcon sx={{ color: colors.accent.main, mr: 2, fontSize: 32 }} />
                  <Typography variant="h5" fontWeight={600} color={colors.text.primary}>
                    Business Hours
                  </Typography>
                </Box>
                <Chip
                  label="Open 24 Hours, 7 Days a Week"
                  sx={{
                    bgcolor: colors.primary.main,
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1rem',
                    py: 2,
                    px: 1,
                    mb: 2,
                  }}
                />
                <Typography variant="body1" color={colors.text.secondary}>
                  We're always open for your convenience! Book anytime, play anytime.
                </Typography>
              </Paper>
            </MuiGrid>
          </MuiGrid>

          {/* Location Section */}
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: `2px solid ${colors.secondary.light}`,
              mb: 6,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <LocationIcon sx={{ color: colors.secondary.main, mr: 2, fontSize: 32 }} />
              <Typography variant="h5" fontWeight={600} color={colors.text.primary}>
                Visit Us At
              </Typography>
            </Box>
            <Typography variant="h6" color={colors.primary.main} sx={{ mb: 2 }}>
              Turf N Lonavala Grounds
            </Typography>
            <Typography variant="body1" color={colors.text.secondary} sx={{ mb: 2 }}>
              Lonavala, Maharashtra
            </Typography>
            <Typography variant="body2" color={colors.text.secondary} sx={{ mb: 3 }}>
              Located in the scenic hills of Lonavala with easy access from Mumbai and Pune. 
              Exact map location available - contact us for detailed directions.
            </Typography>
            <Button
              variant="contained"
              component="a"
              href="https://www.google.com/maps/dir/19.0744702,72.8869927/Gat+no+69+%2F32,+Turf+N+Lonavala,+Railway+station,+boraj+road,+near+Malavli,+Malavli,+Lonavala,+Maharashtra+410401/@18.9891161,72.8523087,10z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3bc2ab70d00a1c5f:0xe9c8a48745dd469c!2m2!1d73.4835825!2d18.7451839?entry=ttu&g_ep=EgoyMDI1MDcyMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: colors.secondary.main,
                '&:hover': { bgcolor: colors.secondary.dark },
              }}
            >
              Get Directions
            </Button>
          </Paper>

          {/* Booking Policy Section */}
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: `2px solid ${colors.primary.light}`,
              bgcolor: colors.primary.light + '10',
            }}
          >
            <Typography variant="h5" fontWeight={700} color={colors.primary.dark} sx={{ mb: 3 }}>
              📅 Need to Reschedule or Cancel?
            </Typography>
            <Typography variant="body1" color={colors.text.primary} sx={{ mb: 2, lineHeight: 1.7 }}>
              We allow <strong>rescheduling up to 6 hours before your booked slot</strong>, and offer fair cancellation policies. 
            </Typography>
            <Typography variant="body1" color={colors.text.secondary} sx={{ lineHeight: 1.7 }}>
              Learn more about our flexible booking terms by contacting us directly. We're here to make your sports experience as convenient as possible!
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
    </>
  );
};

export default Contact; 