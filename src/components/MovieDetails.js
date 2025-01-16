import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, CircularProgress } from '@mui/material';

function MovieDetails({ likedMovies, onToggleLike }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            headers: {
              'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container>
        <Typography variant="h5">Movie not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ pt: { xs: 10, md: 12 }, pb: 4 }}>
      <Box
        onClick={() => setIsFlipped(!isFlipped)}
        sx={{
          perspective: '1000px',
          cursor: 'pointer',
          minHeight: '600px',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            transition: 'transform 0.8s',
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
            height: '100%',
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          {/* Front of card */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
              p: 3,
            }}
          >
            <Box
              component="img"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              sx={{
                width: { xs: '100%', md: '300px' },
                height: 'auto',
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {movie.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {movie.release_date?.split('-')[0]} • {movie.runtime} min
              </Typography>
              <Typography variant="body1" paragraph>
                {movie.overview}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Rating: {movie.vote_average?.toFixed(1)}/10
              </Typography>
              {movie.genres && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {movie.genres.map((genre) => (
                    <Typography
                      key={genre.id}
                      variant="body2"
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {genre.name}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          </Box>

          {/* Back of card */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              backgroundColor: 'primary.light',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" color="white" gutterBottom>
              Additional Details
            </Typography>
            <Typography variant="body1" color="white" paragraph>
              Original Title: {movie.original_title}
            </Typography>
            <Typography variant="body1" color="white" paragraph>
              Original Language: {movie.original_language?.toUpperCase()}
            </Typography>
            <Typography variant="body1" color="white" paragraph>
              Popularity: {movie.popularity?.toFixed(1)}
            </Typography>
            <Typography variant="body1" color="white" paragraph>
              Vote Count: {movie.vote_count}
            </Typography>
            {movie.production_companies && movie.production_companies.length > 0 && (
              <Typography variant="body1" color="white">
                Production: {movie.production_companies.map(company => company.name).join(', ')}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default MovieDetails; 