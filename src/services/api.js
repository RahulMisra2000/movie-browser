import axios from 'axios';

const ACCESS_TOKEN = process.env.REACT_APP_TMDB_ACCESS_TOKEN;
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