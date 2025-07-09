// src/components/Movies/MovieCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const posterPath = movie.poster_path || movie.posterPath; // Handles both TMDB and backend watchlist data
  const title = movie.title || movie.movieTitle;
  const id = movie.id || movie.movieId; // Use TMDB ID for linking

  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'https://via.placeholder.com/150x225?text=No+Image';

  return (
    <Link to={`/movies/${id}`} className="movie-card">
      <img src={posterUrl} alt={title} />
      <h3>{title}</h3>
      {/* Keeping rating simple if available, otherwise hide */}
      {movie.vote_average && <p>Rating: {movie.vote_average.toFixed(1)}</p>}
    </Link>
  );
};

export default MovieCard;