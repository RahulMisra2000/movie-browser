import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie, isLiked, onToggleLike }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onToggleLike(movie.id);
  };

  // Add console.log to debug
  console.log(`MovieCard ${movie.id} isLiked:`, isLiked);

  return (
    <Card 
      onClick={handleCardClick}
      sx={{ 
        height: '100%', 
        position: 'relative',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.02)',
          transition: 'transform 0.2s ease-in-out'
        }
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h6" component="div" noWrap>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {movie.release_date?.split('-')[0]}
        </Typography>
        <IconButton
          onClick={handleLikeClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease-in-out',
            zIndex: 2,
          }}
        >
          {isLiked ? (
            <FavoriteIcon sx={{ color: '#f44336' }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: 'rgba(0, 0, 0, 0.26)' }} />
          )}
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default MovieCard; 