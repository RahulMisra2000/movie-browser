import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

const MovieCard = ({ movie, isLiked, onToggleLike }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking like button
    onToggleLike(movie.id);
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.02)',
          transition: 'transform 0.2s ease-in-out',
        },
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="400"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.overview?.slice(0, 150)}...
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton 
          onClick={handleLikeClick}
          color={isLiked ? 'error' : 'default'}
        >
          {isLiked ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MovieCard; 