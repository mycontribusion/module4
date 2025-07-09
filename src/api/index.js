// src/api/index.js
import axios from 'axios';
import { getToken, removeToken } from '../utils/auth'; // Ensure these utilities exist

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // This now points to your Express backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT token to every outgoing request
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken(); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle token expiration/invalidity
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If 401 Unauthorized, it means token is invalid or expired
      console.warn('Unauthorized request. Logging out user...');
      removeToken(); // Remove invalid token
      // Optionally, you can trigger a global logout state or redirect
      window.location.href = '/login'; // Force redirect to login page
    }
    return Promise.reject(error);
  }
);

export default apiClient;