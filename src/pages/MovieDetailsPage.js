// src/pages/MovieDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, addMovieToWatchlist } from '../api/movies'; // Include backend API for watchlist
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();
  const [watchlistStatus, setWatchlistStatus] = useState('Add to Watchlist');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
        // In a real app, you'd check if this movie is already in the user's watchlist here
        // const isInWatchlist = await checkIfInWatchlist(id, userId);
        // if (isInWatchlist) setWatchlistStatus('In Watchlist');
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError('Failed to load movie details.');
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
    try {
      await addMovieToWatchlist(movie.id);
      setWatchlistStatus('Added to Watchlist!');
      alert('Movie added to your watchlist!');
    } catch (err) {
      console.error("Error adding to watchlist:", err);
      alert('Failed to add to watchlist. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : 'https://via.placeholder.com/1280x720?text=No+Image';

  return (
    <div className="movie-details-page">
      <div className="movie-backdrop" style={{ backgroundImage: `url(${backdropUrl})` }}>
        <div className="overlay">
          <h1>{movie.title}</h1>
          <p>{movie.tagline}</p>
          <p>Rating: {movie.vote_average} ({movie.vote_count} votes)</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Genres: {movie.genres.map(g => g.name).join(', ')}</p>
          <p>{movie.overview}</p>
          {isAuthenticated && (
            <button onClick={handleAddToWatchlist} disabled={watchlistStatus === 'Added to Watchlist!'}>
              {watchlistStatus}
            </button>
          )}
          {/* Display trailers if available */}
          {movie.videos && movie.videos.results.length > 0 && (
            <div className="movie-trailers">
              <h3>Trailers</h3>
              {movie.videos.results.slice(0, 2).map((video) => (
                video.site === 'YouTube' && (
                  <div key={video.id}>
                    <h4>{video.name}</h4>
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={video.name}
                    ></iframe>
                  </div>
                )
              ))}
            </div>
          )}
          {/* Display cast and crew */}
          {movie.credits && movie.credits.cast.length > 0 && (
            <div className="movie-cast">
              <h3>Cast</h3>
              <div className="cast-list">
                {movie.credits.cast.slice(0, 10).map((person) => (
                  <div key={person.cast_id} className="cast-member">
                    <img
                      src={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : 'https://via.placeholder.com/100x150?text=No+Image'}
                      alt={person.name}
                    />
                    <p>{person.name} as {person.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Add review/rating section */}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;