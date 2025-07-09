// src/pages/WatchlistPage.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserWatchlist, removeMovieFromWatchlist } from '../api/movies'; // Backend API
import MovieCard from '../components/Movies/MovieCard';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Link } from 'react-router-dom';

const WatchlistPage = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (user && user.id && !authLoading) {
        try {
          const data = await getUserWatchlist(); // Call backend
          setWatchlist(data); // Backend returns simplified movie objects
        } catch (err) {
          console.error("Error fetching watchlist:", err);
          setError(err.response?.data?.message || 'Failed to load watchlist.');
        } finally {
          setLoading(false);
        }
      } else if (!authLoading) {
        setLoading(false);
      }
    };
    fetchWatchlist();
  }, [user, authLoading]); // Re-fetch when user or authLoading changes

  const handleRemoveFromWatchlist = async (movieId) => {
    try {
      await removeMovieFromWatchlist(movieId); // Call backend
      setWatchlist(watchlist.filter(item => item.movieId !== movieId)); // Update local state
      alert('Movie removed from watchlist.');
    } catch (err) {
      console.error("Error removing from watchlist:", err);
      alert(err.response?.data?.message || 'Failed to remove movie. Please try again.');
    }
  };

  if (authLoading || loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="watchlist-page">
      <h2>My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>Your watchlist is empty. Start adding some movies from the <Link to="/">Home page</Link> or <Link to="/search">Search</Link>!</p>
      ) : (
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <div key={movie.movieId} className="watchlist-item">
              <MovieCard movie={movie} /> {/* MovieCard now handles simplified watchlist object */}
              <button onClick={() => handleRemoveFromWatchlist(movie.movieId)} className="remove-watchlist-btn">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;