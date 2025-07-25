import React, { ReactNode, useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Slide,
  Fab,
  Tooltip,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Info as AboutIcon,
  ContactMail as ContactIcon,
  SportsCricket as CricketIcon,
  SportsBaseball as PickleballIcon,
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  PhotoLibrary as GalleryIcon,
  Help as FAQIcon,
  SportsHandball as AmenitiesIcon,
  Policy as PolicyIcon,
  KeyboardArrowUp as ArrowUpIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../Footer/Footer';
import WhatsAppChat from '../WhatsAppChat';

// Enhanced Sports/Turf theme colors
const colors = {
  primary: {
    main: '#388e3c', // Rich grass green
    dark: '#2e7d32', // Deep forest green
    light: '#66bb6a', // Vibrant light green
  },
  secondary: {
    main: '#ff5722', // Bold orange-red
    dark: '#d84315', // Deep orange
    light: '#ff7043', // Bright orange
  },
  accent: {
    main: '#1976d2', // Royal blue
    dark: '#0d47a1', // Navy blue
    light: '#42a5f5', // Sky blue
  },
  background: {
    default: '#f8fffe', // Clean white with hint of green
    paper: '#ffffff',
  },
  text: {
    primary: '#1b2e35', // Deep charcoal
    secondary: '#455a64', // Steel grey
  },
  gradient: {
    primary: 'linear-gradient(135deg, #388e3c 0%, #66bb6a 100%)',
    secondary: 'linear-gradient(45deg, #ff5722 30%, #d84315 90%)',
    accent: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
  }
};

interface LayoutProps {
  children: ReactNode;
}

interface NavItem {
  text: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { text: 'Home', path: '/', icon: <HomeIcon /> },
  { text: 'About', path: '/about', icon: <AboutIcon /> },
  { text: 'Amenities', path: '/amenities', icon: <AmenitiesIcon /> },
  { text: 'Gallery', path: '/gallery', icon: <GalleryIcon /> },
  { text: 'Contact', path: '/contact', icon: <ContactIcon /> },
  { text: 'FAQ', path: '/faq', icon: <FAQIcon /> },
  { text: 'Policy', path: '/booking-policy', icon: <PolicyIcon /> },
];

const sportsItems = [
  { text: 'Cricket Booking', action: 'tel:+918468942754', icon: <CricketIcon /> },
  { text: 'Pickleball Booking', action: 'tel:+918468942754', icon: <PickleballIcon /> },
];

const contactItems = [
  { text: 'Call Us', action: 'tel:+918468942754', icon: <PhoneIcon /> },
  { text: 'WhatsApp', action: 'https://wa.me/8468942754', icon: <WhatsAppIcon /> },
];

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: '100%', background: colors.gradient.primary, position: 'relative' }}>
      {/* Header Section */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              bgcolor: 'white',
              color: colors.primary.main,
              mr: 2,
              width: 48,
              height: 48,
              fontWeight: 700,
            }}
          >
            TB
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={700} color="white">
              TurfBook
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.8)">
              Sports Booking
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.1)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.2)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation Items */}
      <Box sx={{ px: 2, py: 3 }}>
        <Typography
          variant="overline"
          sx={{
            color: 'rgba(255,255,255,0.7)',
            fontWeight: 600,
            px: 2,
            mb: 1,
            display: 'block',
          }}
        >
          Navigation
        </Typography>
        <List sx={{ py: 0 }}>
          {navItems.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ListItem
                component={RouterLink}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 3,
                  mb: 1,
                  mx: 1,
                  bgcolor: location.pathname === item.path ? 'rgba(255,255,255,0.2)' : 'transparent',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.15)',
                    transform: 'translateX(8px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === item.path ? 700 : 500,
                    fontSize: '1rem',
                  }}
                />
              </ListItem>
            </motion.div>
          ))}
        </List>

        <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.2)' }} />

        {/* Sports Booking Section */}
        <Typography
          variant="overline"
          sx={{
            color: 'rgba(255,255,255,0.7)',
            fontWeight: 600,
            px: 2,
            mb: 1,
            display: 'block',
          }}
        >
          Quick Booking
        </Typography>
        <List sx={{ py: 0 }}>
          {sportsItems.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (navItems.length + index) * 0.1 }}
            >
              <ListItem
                component="a"
                href={item.action}
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 3,
                  mb: 1,
                  mx: 1,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.2)',
                    transform: 'translateX(8px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    fontSize: '0.9rem',
                  }}
                />
              </ListItem>
            </motion.div>
          ))}
        </List>

        <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.2)' }} />

        {/* Contact Section */}
        <Typography
          variant="overline"
          sx={{
            color: 'rgba(255,255,255,0.7)',
            fontWeight: 600,
            px: 2,
            mb: 1,
            display: 'block',
          }}
        >
          Get in Touch
        </Typography>
        <List sx={{ py: 0 }}>
          {contactItems.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (navItems.length + sportsItems.length + index) * 0.1 }}
            >
              <ListItem
                component="a"
                href={item.action}
                target={item.text === 'WhatsApp' ? '_blank' : undefined}
                rel={item.text === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 3,
                  mb: 1,
                  mx: 1,
                  bgcolor: item.text === 'Call Us' ? colors.accent.main : colors.primary.main,
                  color: 'white',
                  '&:hover': {
                    bgcolor: item.text === 'Call Us' ? colors.accent.dark : colors.primary.dark,
                    transform: 'translateX(8px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    fontSize: '0.9rem',
                  }}
                />
              </ListItem>
            </motion.div>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 3,
          borderTop: '1px solid rgba(255,255,255,0.2)',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="rgba(255,255,255,0.7)">
          © 2025 TurfBook
        </Typography>
        <Typography variant="caption" color="rgba(255,255,255,0.5)">
          Premium Sports Booking
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          background: 'white',
          boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
          py: 1,
        }}
        elevation={0}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: 'space-between',
              minHeight: { xs: '70px', md: '80px' },
            }}
          >
            <Typography
              variant="h4"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 800,
                color: 'primary.main',
                textDecoration: 'none',
                background: 'linear-gradient(45deg, #388e3c 30%, #66bb6a 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              TurfBook
            </Typography>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open navigation menu"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  color: 'text.primary',
                  bgcolor: 'rgba(56, 142, 60, 0.1)',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'rgba(56, 142, 60, 0.2)',
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{
                display: 'flex',
                gap: { xs: 1, md: 2 },
                alignItems: 'center',
              }}>
                {navItems.map((item) => (
                  <Button
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                      fontSize: { xs: '0.95rem', md: '1rem' },
                      fontWeight: location.pathname === item.path ? 700 : 500,
                      textTransform: 'none',
                      position: 'relative',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        width: location.pathname === item.path ? '100%' : '0',
                        height: '2px',
                        bottom: 0,
                        left: 0,
                        backgroundColor: 'primary.main',
                        transition: 'width 0.3s ease-in-out',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(56, 142, 60, 0.05)',
                        '&:after': {
                          width: '100%',
                        },
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}

                {/* Book Now Button */}
                <Button
                  variant="contained"
                  component="a"
                  href="tel:+918468942754"
                  sx={{
                    ml: 2,
                    px: 3,
                    py: 1,
                    borderRadius: 3,
                    background: colors.gradient.primary,
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(56, 142, 60, 0.3)',
                    '&:hover': {
                      background: colors.gradient.secondary,
                      boxShadow: '0 6px 16px rgba(56, 142, 60, 0.4)',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Book Now
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Top Overlay Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1300,
              display: isMobile ? 'block' : 'none',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100vh',
                bgcolor: 'white',
                overflowY: 'auto',
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 3,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  bgcolor: colors.primary.main,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      bgcolor: 'white',
                      color: colors.primary.main,
                      mr: 2,
                      width: 40,
                      height: 40,
                      fontWeight: 700,
                    }}
                  >
                    TB
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={700} color="white">
                      TurfBook Menu
                    </Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.8)">
                      Sports Booking
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={handleDrawerToggle}
                  sx={{
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Menu Content */}
              <Box sx={{ p: 3 }}>
                {/* Navigation Items */}
                <Typography
                  variant="overline"
                  sx={{
                    color: colors.text.secondary,
                    fontWeight: 600,
                    mb: 2,
                    display: 'block',
                  }}
                >
                  Navigation
                </Typography>
                <List sx={{ py: 0, mb: 3 }}>
                  {navItems.map((item, index) => (
                    <ListItem
                      key={item.text}
                      component={RouterLink}
                      to={item.path}
                      onClick={handleDrawerToggle}
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        bgcolor: location.pathname === item.path ? colors.primary.light + '20' : 'transparent',
                        color: location.pathname === item.path ? colors.primary.main : colors.text.primary,
                        '&:hover': {
                          bgcolor: colors.primary.light + '10',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          fontWeight: location.pathname === item.path ? 700 : 500,
                          fontSize: '1rem',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 3 }} />

                {/* Sports Booking Section */}
                <Typography
                  variant="overline"
                  sx={{
                    color: colors.text.secondary,
                    fontWeight: 600,
                    mb: 2,
                    display: 'block',
                  }}
                >
                  Quick Booking
                </Typography>
                <List sx={{ py: 0, mb: 3 }}>
                  {sportsItems.map((item, index) => (
                    <ListItem
                      key={item.text}
                      component="a"
                      href={item.action}
                      onClick={handleDrawerToggle}
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        bgcolor: colors.primary.light + '10',
                        color: colors.primary.main,
                        '&:hover': {
                          bgcolor: colors.primary.light + '20',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          fontWeight: 600,
                          fontSize: '0.95rem',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 3 }} />

                {/* Contact Section */}
                <Typography
                  variant="overline"
                  sx={{
                    color: colors.text.secondary,
                    fontWeight: 600,
                    mb: 2,
                    display: 'block',
                  }}
                >
                  Get in Touch
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {contactItems.map((item, index) => (
                    <Button
                      key={item.text}
                      component="a"
                      href={item.action}
                      target={item.text === 'WhatsApp' ? '_blank' : undefined}
                      rel={item.text === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                      onClick={handleDrawerToggle}
                      variant="contained"
                      startIcon={item.icon}
                      sx={{
                        flex: 1,
                        py: 1.5,
                        borderRadius: 2,
                        bgcolor: item.text === 'Call Us' ? colors.accent.main : colors.primary.main,
                        color: 'white',
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': {
                          bgcolor: item.text === 'Call Us' ? colors.accent.dark : colors.primary.dark,
                        },
                      }}
                    >
                      {item.text}
                    </Button>
                  ))}
                </Box>

                {/* Footer */}
                <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    © 2025 TurfBook
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Premium Sports Booking
                  </Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          pt: '80px',
        }}
      >
        {children}
      </Box>

      <Box>
        <Footer />
      </Box>

      {/* Global Call Button */}
      <Tooltip title="Call Now" placement="left">
        <Fab
          color="secondary"
          aria-label="call"
          component="a"
          href="tel:+918468942754"
          sx={{
            position: 'fixed',
            bottom: 85,
            right: 20,
            zIndex: 1000,
            backgroundColor: colors.accent.main,
            color: 'white',
            boxShadow: `0 4px 14px rgba(25, 118, 210, 0.25)`,
            '&:hover': {
              backgroundColor: colors.accent.dark,
              transform: 'scale(1.1)',
              boxShadow: `0 6px 18px rgba(25, 118, 210, 0.35)`,
            },
            transition: 'all 0.3s ease',
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 20%, 50%, 80%, 100%': {
                transform: 'translateY(0)',
              },
              '40%': {
                transform: 'translateY(-10px)',
              },
              '60%': {
                transform: 'translateY(-5px)',
              },
            },
          }}
        >
          <PhoneIcon />
        </Fab>
      </Tooltip>

      {/* WhatsApp Chat Button */}
      <WhatsAppChat />

      {/* Global Scroll to Top Button */}
      {showScrollTop && (
        <Tooltip title="Scroll to Top" placement="left">
          <Fab
            color="default"
            aria-label="scroll to top"
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: 150,
              right: 20,
              zIndex: 1000,
              backgroundColor: colors.secondary.main,
              color: 'white',
              boxShadow: `0 4px 14px rgba(255, 87, 34, 0.25)`,
              '&:hover': {
                backgroundColor: colors.secondary.dark,
                transform: 'scale(1.1)',
                boxShadow: `0 6px 18px rgba(255, 87, 34, 0.35)`,
              },
              transition: 'all 0.3s ease',
              animation: 'fadeInUp 0.3s ease-in-out',
              '@keyframes fadeInUp': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(20px)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            <ArrowUpIcon />
          </Fab>
        </Tooltip>
      )}
    </Box>
  );
};

export default Layout; 