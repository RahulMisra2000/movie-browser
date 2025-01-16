import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box
} from '@mui/material';
import MovieCard from './MovieCard';

function FavoritesPage({ toggleLike }) {
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likedStates, setLikedStates] = useState({});

  useEffect(() => {
    const fetchLikedMovies = async () => {
      try {
        // Get liked movies from localStorage
        const storedLikedMovies = JSON.parse(localStorage.getItem('likedMovies') || '{}');
        setLikedStates(storedLikedMovies);
        
        // Fetch details for each liked movie
        const fetchPromises = Object.keys(storedLikedMovies)
          .filter(id => storedLikedMovies[id]) // only get the ones that are true
          .map(async (movieId) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/movie/${movieId}`,
              {
                headers: {
                  'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
                  'Content-Type': 'application/json'
                }
              }
            );
            return response.json();
          });

        const fetchedMovies = await Promise.all(fetchPromises);
        setAllMovies(fetchedMovies);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching liked movies:', error);
        setIsLoading(false);
      }
    };

    fetchLikedMovies();
  }, []); // Empty dependency array means this runs once on mount

  const handleToggleLike = async (movieId) => {
    // Call the parent toggle function
    await toggleLike(movieId);
    
    // Update local state
    const newLikedStates = JSON.parse(localStorage.getItem('likedMovies') || '{}');
    setLikedStates(newLikedStates);
    
    // If the movie was unliked, remove it from the list
    if (!newLikedStates[movieId]) {
      setAllMovies(prev => prev.filter(movie => movie.id !== movieId));
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading your favorite movies...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1">
          Your Favorite Movies
        </Typography>
      </Box>

      {allMovies.length === 0 ? (
        <Typography variant="h6" color="text.secondary" align="center">
          You haven't liked any movies yet.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {allMovies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
              <MovieCard
                movie={movie}
                isLiked={likedStates[movie.id]}
                onToggleLike={handleToggleLike}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default FavoritesPage;