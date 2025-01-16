import { useState, useEffect } from 'react';

const STORAGE_KEY = 'likedMovies';

export const useLikedMovies = () => {
  const [likedMovies, setLikedMovies] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  console.log(likedMovies);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likedMovies));
  }, [likedMovies]);

  const toggleLike = (movieId) => {
    setLikedMovies(prev => ({
      ...prev,
      [movieId]: !prev[movieId]
    }));
  };

  return [likedMovies, toggleLike];
};