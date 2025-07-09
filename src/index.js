// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+
import './index.css'; // Import your global styles
import App from './App'; // The root component of your application

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
