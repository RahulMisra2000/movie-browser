import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Rating,
  Button,
} from '@mui/material';
import { ArrowBack, Favorite, FavoriteBorder } from '@mui/icons-material';
import { getMovieDetails } from '../services/api';

const MovieDetails = ({ likedMovies, onToggleLike }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await getMovieDetails(id);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        sx={{ mb: 2 }}
      >
        Back to Movies
      </Button>
      
      <Card sx={{ display: { md: 'flex' }, mb: 4 }}>
        <CardMedia
          component="img"
          sx={{ width: { xs: '100%', md: 300 } }}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" component="h1">
              {movie.title}
            </Typography>
            <IconButton
              onClick={() => onToggleLike(movie.id)}
              color={likedMovies[movie.id] ? 'error' : 'default'}
            >
              {likedMovies[movie.id] ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Box>

          <Typography variant="h6" color="text.secondary" gutterBottom>
            {movie.tagline}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Rating value={movie.vote_average / 2} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary">
              {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
            </Typography>
          </Box>

          <Typography variant="body1" paragraph>
            {movie.overview}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Release Date: {new Date(movie.release_date).toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Runtime: {movie.runtime} minutes
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            {movie.genres.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MovieDetails; 