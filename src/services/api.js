import axios from 'axios';

// You can use either API_KEY or ACCESS_TOKEN method
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjI4ODU0NTJkZDY1NjQzNTY5MGUxM2Y3OTBmNjNjYyIsIm5iZiI6MTczNjk5MTk2Ny44MTksInN1YiI6IjY3ODg2NGRmZTk4MDgxZjU4Mjk3NjUwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ky4Dg465UMbwBuyF8iCn7pOpDPDwfXHDMOOzNUQupg'; // Replace with your actual access token
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8'
  }
});

export const getMovies = (page = 1, searchQuery = '') => {
  const endpoint = searchQuery
    ? '/search/movie'
    : '/movie/popular';
    
  return api.get(endpoint, {
    params: {
      page,
      query: searchQuery,
    },
  });
};

export const getMovieDetails = (movieId) => {
  return api.get(`/movie/${movieId}`);
}; 