// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginUser, registerUser } from '../api/auth'; // API calls
import { getToken, setToken, removeToken, decodeToken } from '../utils/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = decodeToken(token);
        // Check for token expiry here
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded); // Set user from decoded token
        } else {
          removeToken();
        }
      } catch (error) {
        console.error("Invalid token:", error);
        removeToken();
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const { token } = await loginUser(credentials);
      setToken(token);
      const decoded = decodeToken(token);
      setUser(decoded);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      removeToken();
      setUser(null);
      throw error; // Re-throw for UI to handle
    }
  };

  const register = async (userData) => {
    try {
      const { token } = await registerUser(userData); // <-- ONLY destructure 'token'

      // Automatically log in the user by setting the token and user state
      setToken(token);
      const decoded = decodeToken(token); // Decode the token to get user details
      setUser(decoded); // Set user from the decoded token

      return true; // Indicate success
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};