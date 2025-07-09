// src/pages/SearchPage.js
import React, { useState, useEffect } from 'react';
import { searchMovies } from '../api/movies'; // TMDB API
import MovieCard from '../components/Movies/MovieCard';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      setQuery(searchQuery);
      performSearch(searchQuery);
    }
  }, [searchParams]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() }); // Update URL search param
    } else {
      setMovies([]); // Clear results if query is empty
      setSearchParams({}); // Clear search params
    }
  };

  const performSearch = async (searchQuery) => {
    setLoading(true);
    setError('');
    try {
      const results = await searchMovies(searchQuery); // Search TMDB
      setMovies(results);
    } catch (err) {
      console.error("Error searching movies:", err);
      setError('Failed to perform search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <h2>Search Movies</h2>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search for movies by title..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <LoadingSpinner />}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && movies.length === 0 && query && (
        <p>No movies found for "{query}".</p>
      )}
      {!loading && !error && movies.length > 0 && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;