// src/components/Layout/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { isAuthenticated, logout } = useAuth(); // Get auth state and logout function
  return (
    <header className="header">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to="/watchlist">Watchlist</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={logout} className="nav-button">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;