// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../api/movies'; // TMDB call
import MovieCard from '../components/Movies/MovieCard';
import LoadingSpinner from '../components/Shared/LoadingSpinner';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error("Error fetching popular movies:", err);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-page">
      <h2>Popular Movies</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;