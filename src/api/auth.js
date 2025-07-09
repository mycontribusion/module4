// src/api/auth.js (Handles communication with your Express authentication routes)
import apiClient from './index'; // Import the configured axios instance

export const loginUser = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials); // Matches backend route: POST /api/auth/login
  return response.data; // Backend should return { _id, username, email, token }
};

export const registerUser = async (userData) => {
  const response = await apiClient.post('/auth/register', userData); // Matches backend route: POST /api/auth/register
  return response.data; // Backend should return { _id, username, email, token }
};