import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import MovieIcon from '@mui/icons-material/Movie';
import Clock from './Clock';

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Favorites', path: '/favorites' },
    // Add more menu items as needed
  ];

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{
          transition: 'all 0.3s ease',
          height: scrolled ? '64px' : { xs: '64px', md: '80px' },
          backgroundColor: scrolled 
            ? 'rgba(66, 165, 245, 0.85)'
            : 'rgba(25, 118, 210, 0.9)',
          backdropFilter: 'blur(8px)',
          boxShadow: scrolled ? 3 : 0,
        }}
      >
        <Toolbar sx={{ height: '100%' }}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            flexGrow: 1 
          }}>
            <MovieIcon sx={{ 
              fontSize: scrolled 
                ? { xs: '1.5rem', md: '2rem' }
                : { xs: '2rem', md: '2.5rem' },
              transition: 'all 0.3s ease',
            }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                fontSize: scrolled 
                  ? { xs: '1.2rem', md: '1.5rem' }
                  : { xs: '1.5rem', md: '2rem' },
                transition: 'all 0.3s ease',
                fontWeight: 'bold',
              }}
            >
              Movie App
            </Typography>
          </Box>

          {/* Desktop menu */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Typography
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {item.text}
                </Typography>
              ))}
            </Box>
          )}
        </Toolbar>

        {/* Mobile drawer */}
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <List sx={{ width: 250 }}>
            {menuItems.map((item) => (
              <ListItem 
                key={item.text}
                component={Link}
                to={item.path}
                onClick={() => setIsDrawerOpen(false)}
                sx={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                }}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </AppBar>
      <Clock />
    </>
  );
}

export default Header; 