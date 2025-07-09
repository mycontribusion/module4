// src/api/movies.js (Now separating TMDB calls from your backend calls more clearly)
import axios from 'axios'; // Use plain axios for direct TMDB calls
import apiClient from './index'; // Use apiClient for calls to YOUR backend

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// --- TMDB API Calls (Direct from Frontend) ---
export const getPopularMovies = async () => {
  const response = await axios.get(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`);
  return response.data.results;
};

export const searchMovies = async (query, page = 1) => {
  const response = await axios.get(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}&page=${page}`);
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`);
  return response.data;
};

// --- Your Backend API Calls (Protected) ---
export const addMovieToWatchlist = async (tmdbMovieId) => {
  // Backend route: POST /api/watchlist (protected)
  // Your backend will fetch the full movie details from TMDB internally based on this ID
  const response = await apiClient.post('/watchlist', { movieId: tmdbMovieId });
  return response.data;
};

export const getUserWatchlist = async () => {
  // Backend route: GET /api/watchlist (protected)
  // The user ID is implicitly sent via the JWT in the header
  const response = await apiClient.get('/watchlist');
  return response.data;
};

export const removeMovieFromWatchlist = async (tmdbMovieId) => {
  // Backend route: DELETE /api/watchlist/:movieId (protected)
  const response = await apiClient.delete(`/watchlist/${tmdbMovieId}`);
  return response.data;
};

// You'd add functions here for:
// export const rateMovie = async (movieId, rating) => { ... }
// export const reviewMovie = async (movieId, reviewText) => { ... }
// export const getPersonalizedRecommendations = async () => { ... } (if backend generates these)