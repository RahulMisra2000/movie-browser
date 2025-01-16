import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box
} from '@mui/material';
import MovieCard from './MovieCard';
function FavoritesPage({ likedMovies, toggleLike, movies }) {
      const [allMovies, setAllMovies] = React.useState([]);
      const [isLoading, setIsLoading] = React.useState(true);
    
      React.useEffect(() => {
        const fetchLikedMovies = async () => {
          try {
            // Get liked movies from localStorage
            const storedLikedMovies = JSON.parse(localStorage.getItem('likedMovies') || '{}');
            
            // Fetch details for each liked movie
            const fetchPromises = Object.keys(storedLikedMovies)
              .filter(id => storedLikedMovies[id]) // only get the ones that are true
              .map(async (movieId) => {
                const response = await fetch(
                  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
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
                    isLiked={true} // We know it's liked since it's from localStorage
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