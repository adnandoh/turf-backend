import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { colors } from '../../constants';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
          <Box
            sx={{
              bgcolor: colors.background.paper,
              borderRadius: 4,
              p: 6,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          >
            <Typography variant="h4" color={colors.primary.main} sx={{ mb: 2, fontWeight: 700 }}>
              Oops! Something went wrong
            </Typography>
            <Typography variant="body1" color={colors.text.secondary} sx={{ mb: 4 }}>
              We're sorry for the inconvenience. Please try refreshing the page or contact us if the problem persists.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                onClick={this.handleReload}
                sx={{
                  bgcolor: colors.primary.main,
                  '&:hover': { bgcolor: colors.primary.dark }
                }}
              >
                Refresh Page
              </Button>
              <Button
                variant="outlined"
                component="a"
                href="tel:+918468942754"
                sx={{
                  borderColor: colors.primary.main,
                  color: colors.primary.main,
                  '&:hover': { 
                    borderColor: colors.primary.dark,
                    color: colors.primary.dark
                  }
                }}
              >
                Contact Support
              </Button>
            </Box>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;