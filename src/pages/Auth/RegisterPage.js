// src/pages/Auth/RegisterPage.js
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // <--- Ensure 'Link' is imported here!
import RegisterForm from '../../components/Auth/RegisterForm'; // <--- Ensure this path is correct and RegisterForm.js is populated

const RegisterPage = () => {
  const { register } = useAuth(); // Get the register function from AuthContext
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleRegister = async (userData) => {
    setLoading(true);
    setError(''); // Clear previous errors
    try {
      await register(userData); // Call the register function from AuthContext
      alert('Registration successful! You are now logged in.'); // User is auto-logged in
      navigate('/profile'); // Redirect to profile or home page
    } catch (err) {
      console.error('Registration error on page:', err);
      // Backend errors will likely come in err.response.data.message
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      {/* Ensure RegisterForm is correctly defined and exported in its file */}
      <RegisterForm onSubmit={handleRegister} isLoading={loading} />
      <p>Already have an account? <Link to="/login">Login here</Link></p> {/* <--- 'Link' used here */}
    </div>
  );
};

export default RegisterPage; // <--- THIS LINE IS CRUCIAL! It makes RegisterPage a valid component.