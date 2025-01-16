import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box
} from '@mui/material';
import MovieCard from './MovieCard';

function FavoritesPage({ likedMovies, toggleLike, movies }) {
  // Filter movies to only show liked ones
  const likedMoviesList = movies.filter(movie => likedMovies[movie.id]);

  console.log(movies);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1">
          Your Favorite Movies
        </Typography>
      </Box>



      {likedMoviesList.length === 0 ? (
        <Typography variant="h6" color="text.secondary" align="center">
          You haven't liked any movies yet.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {likedMoviesList.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
              <MovieCard
                movie={movie}
                isLiked={likedMovies[movie.id]}
                onToggleLike={toggleLike}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default FavoritesPage; 