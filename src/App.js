import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Container,
  Grid,
  Pagination,
  TextField,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { getMovies } from './services/api';
import { useLikedMovies } from './hooks/useLikedMovies';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import Header from './components/Header';
import FavoritesPage from './components/FavoritesPage';
import ScrollToTop from './components/ScrollToTop';

function HomePage({ movies, likedMovies, toggleLike, page, totalPages, searchQuery, handleSearch, handlePageChange, isMobile, scrolled }) {
  return (
    <Container maxWidth="lg" sx={{ 
      py: 4,
      paddingTop: { xs: '64px', md: scrolled ? '64px' : '80px' }
    }}>
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Search movies"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
        />
      </Box>

      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4}>
            <MovieCard
              movie={movie}
              isLiked={likedMovies[movie.id]}
              onToggleLike={toggleLike}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          size={isMobile ? 'small' : 'large'}
        />
      </Box>
    </Container>
  );
}

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [likedMovies, toggleLike] = useLikedMovies();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies(page, searchQuery);
        setMovies(response.data.results);
        setTotalPages(Math.min(response.data.total_pages, 500));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    const timeoutId = setTimeout(fetchMovies, 500);
    return () => clearTimeout(timeoutId);
  }, [page, searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handlePageChange = (_, value) => setPage(value);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage
              movies={movies}
              likedMovies={likedMovies}
              toggleLike={toggleLike}
              page={page}
              totalPages={totalPages}
              searchQuery={searchQuery}
              handleSearch={handleSearch}
              handlePageChange={handlePageChange}
              isMobile={isMobile}
              scrolled={scrolled}
            />
          }
        />
        <Route 
          path="/favorites" 
          element={
            <FavoritesPage
              movies={movies}
              likedMovies={likedMovies}
              toggleLike={toggleLike}
            />
          }
        />
        <Route 
          path="/movie/:id" 
          element={
            <MovieDetails
              likedMovies={likedMovies}
              onToggleLike={toggleLike}
            />
          }
        />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}

export default App; 