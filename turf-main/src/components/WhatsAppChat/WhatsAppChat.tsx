import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import { WhatsApp as WhatsAppIcon } from '@mui/icons-material';

interface WhatsAppChatProps {
  phoneNumber?: string;
  message?: string;
  position?: {
    bottom?: number;
    right?: number;
  };
}

const WhatsAppChat: React.FC<WhatsAppChatProps> = ({
  phoneNumber = '918468942754',
  message = 'Hi, I want to book a slot at Turf N Lonavala!',
  position = { bottom: 20, right: 20 }
}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Tooltip title="Chat on WhatsApp" placement="left">
      <Fab
        color="primary"
        aria-label="whatsapp chat"
        sx={{
          position: 'fixed',
          bottom: position.bottom,
          right: position.right,
          zIndex: 1000,
          backgroundColor: '#25D366',
          color: 'white',
          boxShadow: '0 4px 14px rgba(37, 211, 102, 0.25)',
          '&:hover': {
            backgroundColor: '#128C7E',
            transform: 'scale(1.1)',
            boxShadow: '0 6px 18px rgba(37, 211, 102, 0.35)',
          },
          transition: 'all 0.3s ease',
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': {
              boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.7)',
            },
            '70%': {
              boxShadow: '0 0 0 10px rgba(37, 211, 102, 0)',
            },
            '100%': {
              boxShadow: '0 0 0 0 rgba(37, 211, 102, 0)',
            },
          },
        }}
        component="a"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon />
      </Fab>
    </Tooltip>
  );
};

export default WhatsAppChat;