import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Paper,
  Chip
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
  Schedule as ScheduleIcon,
  Payment as PaymentIcon,
  Sports as SportsIcon,
  Event as EventIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import { colors, fadeIn, BUSINESS_INFO } from '../../constants';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'booking' | 'facilities' | 'payment' | 'events' | 'general';
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'How do I book a slot?',
    answer: 'You can book a slot by calling us at 8468942754 or sending a WhatsApp message. Our team will confirm availability and provide instant booking confirmation.',
    category: 'booking'
  },
  {
    id: 2,
    question: 'Is the turf open at night?',
    answer: 'Yes, we operate 24/7 with LED lighting for night play. Our floodlights ensure excellent visibility for safe and enjoyable matches at any time.',
    category: 'facilities'
  },
  {
    id: 3,
    question: 'Can we host private tournaments?',
    answer: 'Absolutely! Contact us in advance to plan your event. We can accommodate corporate tournaments, birthday parties, and special sports events.',
    category: 'events'
  },
  {
    id: 4,
    question: 'What sports can we play?',
    answer: 'Our multi-sport turf supports Cricket, Football (7v7), Basketball, Badminton, and Pickleball. The ground can be configured for different sports as needed.',
    category: 'facilities'
  },
  {
    id: 5,
    question: 'What are your rates?',
    answer: 'Rates vary by day and time: Mon-Thu (₹700 day, ₹1000 night), Fri-Sun (₹1000 day, ₹1300 night). All slots are for 1 hour duration.',
    category: 'payment'
  },
  {
    id: 6,
    question: 'Can I reschedule my booking?',
    answer: 'Yes, you can reschedule up to 6 hours before your slot (subject to availability). One reschedule is allowed per booking, and rescheduled slots must be used within 7 days.',
    category: 'booking'
  },
  {
    id: 7,
    question: 'What is your cancellation policy?',
    answer: 'Full refund for cancellations 12+ hours before, 50% refund for 6-12 hours before, no refund for less than 6 hours or no-shows. Refunds take 5-7 working days.',
    category: 'payment'
  },
  {
    id: 8,
    question: 'Do you provide equipment?',
    answer: 'We provide basic equipment like footballs and cricket stumps. For specialized equipment like bats, rackets, or personal gear, please bring your own.',
    category: 'facilities'
  },
  {
    id: 9,
    question: 'Is parking available?',
    answer: 'Yes, we have ample parking space available for cars and two-wheelers. Parking is free for all our customers.',
    category: 'general'
  },
  {
    id: 10,
    question: 'What happens if it rains?',
    answer: 'In case of rain or unforeseen turf closure, we offer a full refund or free rescheduling to any available slot. Your satisfaction is our priority.',
    category: 'booking'
  },
  {
    id: 11,
    question: 'How far is the turf from Lonavala station?',
    answer: 'We are conveniently located near Malavli Railway Station, easily accessible from both Mumbai and Pune. Contact us for detailed directions.',
    category: 'general'
  },
  {
    id: 12,
    question: 'Can we bring food and drinks?',
    answer: 'Yes, you can bring your own food and drinks. We also have basic refreshment facilities available on-site.',
    category: 'general'
  }
];

const categories = [
  { key: 'all', label: 'All Questions', icon: <HelpIcon />, color: colors.primary.main },
  { key: 'booking', label: 'Booking', icon: <ScheduleIcon />, color: colors.accent.main },
  { key: 'facilities', label: 'Facilities', icon: <SportsIcon />, color: colors.primary.main },
  { key: 'payment', label: 'Payment', icon: <PaymentIcon />, color: colors.secondary.main },
  { key: 'events', label: 'Events', icon: <EventIcon />, color: colors.secondary.dark },
  { key: 'general', label: 'General', icon: <HelpIcon />, color: colors.accent.dark },
];

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expanded, setExpanded] = useState<number | false>(false);

  const filteredFAQs = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  const handleAccordionChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <SEO
        title="FAQ"
        description="Frequently asked questions about Turf N Lonavala. Get answers about booking, rates, facilities, cancellation policy, and more. Available 24/7 for cricket and pickleball."
        keywords="turf FAQ lonavala, booking questions, turf rates, cancellation policy, sports facility questions, cricket ground FAQ"
        url="https://turfbook.com/faq"
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
              backgroundImage: 'url(https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80)',
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
                ❓ Frequently Asked Questions
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
                Get quick answers to common questions about our turf booking
              </Typography>
            </motion.div>
          </Container>
        </Box>

        {/* FAQ Content */}
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

            {/* FAQ Accordions */}
            <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Accordion
                    expanded={expanded === faq.id}
                    onChange={handleAccordionChange(faq.id)}
                    sx={{
                      mb: 2,
                      borderRadius: 3,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      border: `1px solid ${colors.primary.light}20`,
                      '&:before': {
                        display: 'none',
                      },
                      '&.Mui-expanded': {
                        margin: '0 0 16px 0',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        border: `2px solid ${colors.primary.light}`,
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: colors.primary.main }} />}
                      sx={{
                        bgcolor: expanded === faq.id ? colors.primary.light + '10' : 'white',
                        borderRadius: expanded === faq.id ? '12px 12px 0 0' : '12px',
                        minHeight: 64,
                        '& .MuiAccordionSummary-content': {
                          margin: '16px 0',
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: colors.text.primary,
                          fontSize: { xs: '1rem', md: '1.125rem' },
                        }}
                      >
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        bgcolor: 'white',
                        borderRadius: '0 0 12px 12px',
                        pt: 0,
                        pb: 3,
                        px: 3,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: colors.text.secondary,
                          lineHeight: 1.7,
                          fontSize: { xs: '0.95rem', md: '1rem' },
                        }}
                      >
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </motion.div>
              ))}
            </Box>

            {/* Contact Section */}
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
                Still Have Questions?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  fontSize: '1.125rem',
                  opacity: 0.9,
                }}
              >
                We're here to help! Contact us directly for personalized assistance.
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
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
                  💬 WhatsApp: 8468942754
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default FAQ;