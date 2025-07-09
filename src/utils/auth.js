// src/utils/auth.js (Helper functions for JWT)
import { jwtDecode } from 'jwt-decode'; // Note: Use named import for jwt-decode

export const getToken = () => {
  return localStorage.getItem('jwtToken');
};

export const setToken = (token) => {
  localStorage.setItem('jwtToken', token);
};

export const removeToken = () => {
  localStorage.removeItem('jwtToken');
};

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};