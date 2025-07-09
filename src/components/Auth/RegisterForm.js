// src/components/Auth/RegisterForm.js
import React, { useState } from 'react';

// This is a simple form, not a page. It takes onSubmit and isLoading props.
const RegisterForm = ({ onSubmit, isLoading }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState(''); // Local form error for validation

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    if (username.length < 3 || password.length < 6) {
      setFormError('Username must be at least 3 characters and password at least 6 characters.');
      return;
    }
    setFormError(''); // Clear local error
    onSubmit({ username, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form"> {/* Reusing login-form CSS class */}
      <h3>Create Your Account</h3>
      {formError && <p className="error-message">{formError}</p>}
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm; // <--- This line is critical for it to be a valid component