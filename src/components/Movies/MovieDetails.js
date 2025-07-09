// src/pages/MovieDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, addMovieToWatchlist } from '../api/movies'; // TMDB and backend API
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

const MovieDetailsPage = () => {
  const { id } = useParams(); // TMDB ID from URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();
  const [watchlistStatus, setWatchlistStatus] = useState('Add to Watchlist'); // Default state for button

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getMovieDetails(id); // Fetch from TMDB
        setMovie(movieData);
        // In a real app, after fetching movieData, you'd make a backend call to check
        // if this specific movie is already in the *current user's* watchlist.
        // For simplicity, we'll assume it's not and allow adding.
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError('Failed to load movie details. This movie might not exist or TMDB API issue.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleAddToWatchlist = async () => {
    if (!isAuthenticated) {
      alert('Please log in to add movies to your watchlist.');
      return;
    }
    if (!movie) {
      alert('Movie data not loaded yet.');
      return;
    }
    try {
      // Send TMDB movie ID to your backend's watchlist endpoint
      await addMovieToWatchlist(movie.id);
      setWatchlistStatus('Added to Watchlist!');
      alert('Movie added to your watchlist!');
    } catch (err) {
      console.error("Error adding to watchlist:", err.response?.data?.message || err.message);
      // More specific error message if backend returns one (e.g., "Movie already in watchlist")
      alert(err.response?.data?.message || 'Failed to add to watchlist. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!movie) {
    return <div>No movie data found.</div>;
  }

  // Use a fallback for poster if not available
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Poster';

  return (
    <div className="movie-details-page">
      <div className="details-header">
        <img src={posterUrl} alt={movie.title} className="details-poster" />
        <div className="details-info">
          <h1>{movie.title} ({movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'})</h1>
          <p><strong>Rating:</strong> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} ({movie.vote_count} votes)</p>
          <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
          <p><strong>Overview:</strong> {movie.overview}</p>
          {isAuthenticated && (
            <button onClick={handleAddToWatchlist} disabled={watchlistStatus === 'Added to Watchlist!'} className="add-watchlist-btn">
              {watchlistStatus}
            </button>
          )}
        </div>
      </div>
      {/* For simplicity, no trailers or cast/crew initially */}
    </div>
  );
};

export default MovieDetailsPage;