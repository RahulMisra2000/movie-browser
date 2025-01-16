import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';

function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ 
      position: 'fixed', 
      bottom: 16, 
      left: 16, 
      zIndex: 1100,
      backgroundColor: 'rgba(66, 165, 245, 0.85)',
      padding: '8px 16px',
      borderRadius: '8px',
      backdropFilter: 'blur(8px)',
    }}>
      <Typography variant="body2" color="white">
        {date.toLocaleDateString()} {date.toLocaleTimeString()}
      </Typography>
    </Box>
  );
}

export default Clock; 