import React from 'react';
import { Box, Container, Typography, Paper, Grid as MuiGrid, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import { 
  WhatsApp as WhatsAppIcon, 
  Phone as PhoneIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  CloudOff as RainIcon,
  Refresh as RefreshIcon,
  Schedule as ScheduleIcon,
  Payment as PaymentIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import { colors, fadeIn, BUSINESS_INFO } from '../../constants';

const BookingPolicy = () => {
  return (
    <>
      <SEO
        title="Booking Policy"
        description="Learn about Turf N Lonavala's booking, rescheduling, and cancellation policies. Fair terms for cricket and pickleball court bookings with flexible rescheduling options."
        keywords="turf booking policy, cancellation policy lonavala, rescheduling sports booking, turf rental terms, cricket ground booking policy"
        url="https://turfbook.com/booking-policy"
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
              backgroundImage: 'url(https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80)',
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
                📋 Booking Policy
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
                Booking, Rescheduling & Cancellation Policy
              </Typography>
            </motion.div>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <MuiGrid container spacing={4}>
              {/* Rescheduling Policy */}
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
                    <RefreshIcon sx={{ color: colors.primary.main, mr: 2, fontSize: 32 }} />
                    <Typography variant="h5" fontWeight={700} color={colors.text.primary}>
                      ✔ Rescheduling
                    </Typography>
                  </Box>
                  <List sx={{ py: 0 }}>
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckIcon sx={{ color: colors.primary.main }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="You may reschedule your slot up to 6 hours before your booking"
                        secondary="Subject to availability"
                        primaryTypographyProps={{ fontWeight: 500, lineHeight: 1.4 }}
                        secondaryTypographyProps={{ fontSize: '0.875rem', mt: 0.5 }}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckIcon sx={{ color: colors.primary.main }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="One reschedule allowed per booking"
                        primaryTypographyProps={{ fontWeight: 500, lineHeight: 1.4 }}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckIcon sx={{ color: colors.primary.main }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Rescheduled slots must be used within 7 days"
                        primaryTypographyProps={{ fontWeight: 500, lineHeight: 1.4 }}
                      />
                    </ListItem>
                  </List>
                </Paper>
              </MuiGrid>

              {/* Cancellation Policy */}
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
                    <CancelIcon sx={{ color: colors.secondary.main, mr: 2, fontSize: 32 }} />
                    <Typography variant="h5" fontWeight={700} color={colors.text.primary}>
                      ❌ Cancellations
                    </Typography>
                  </Box>
                  <List sx={{ py: 0 }}>
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Chip 
                          label="Full refund" 
                          size="small" 
                          sx={{ 
                            bgcolor: colors.primary.main, 
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.75rem'
                          }} 
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Cancel at least 12 hours before your slot"
                        primaryTypographyProps={{ fontWeight: 500, lineHeight: 1.4, ml: 1 }}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Chip 
                          label="50% refund" 
                          size="small" 
                          sx={{ 
                            bgcolor: colors.accent.main, 
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.75rem'
                          }} 
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Cancel between 6–12 hours before"
                        primaryTypographyProps={{ fontWeight: 500, lineHeight: 1.4, ml: 1 }}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Chip 
                          label="No refund" 
                          size="small" 
                          sx={{ 
                            bgcolor: colors.secondary.main, 
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.75rem'
                          }} 
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Cancel less than 6 hours before or no-shows"
                        primaryTypographyProps={{ fontWeight: 500, lineHeight: 1.4, ml: 1 }}
                      />
                    </ListItem>
                  </List>
                </Paper>
              </MuiGrid>



              {/* Refund Processing */}
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
                    <PaymentIcon sx={{ color: colors.primary.main, mr: 2, fontSize: 32 }} />
                    <Typography variant="h5" fontWeight={700} color={colors.text.primary}>
                      🔁 Refund Processing
                    </Typography>
                  </Box>
                  <Typography variant="body1" color={colors.text.primary} sx={{ mb: 2, lineHeight: 1.7 }}>
                    Refunds are processed within <strong>5–7 working days</strong> to your original payment method.
                  </Typography>
                  <Typography variant="body2" color={colors.text.secondary} sx={{ lineHeight: 1.6 }}>
                    For any refund inquiries or assistance, please contact us directly at 8468942754 or email turfnlonavala@gmail.com
                  </Typography>
                </Paper>
              </MuiGrid>
            </MuiGrid>

            {/* Contact Section */}
            <Paper
              sx={{
                mt: 6,
                p: 4,
                borderRadius: 4,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: `2px solid ${colors.secondary.light}`,
                bgcolor: colors.secondary.light + '10',
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" fontWeight={700} color={colors.primary.dark} sx={{ mb: 2 }}>
                Questions About Our Policy?
              </Typography>
              <Typography variant="body1" color={colors.text.secondary} sx={{ mb: 3, lineHeight: 1.7 }}>
                We're here to help! Contact us for any clarifications about our booking terms and conditions.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Typography
                  component="a"
                  href="tel:+918468942754"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    color: colors.accent.main,
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': { color: colors.accent.dark },
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
                    color: colors.primary.main,
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': { color: colors.primary.dark },
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

export default BookingPolicy;