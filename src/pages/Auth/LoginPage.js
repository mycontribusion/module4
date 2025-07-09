// src/pages/Auth/LoginPage.js
import React from 'react';
import LoginForm from '../../components/Auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="login-page">
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;