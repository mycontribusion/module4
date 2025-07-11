// src/components/Shared/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px', fontSize: '1.2em' }}>
      <p>Loading...</p>
      {/* Simple spinner animation if you want */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: #09f;
          animation: spin 1s ease infinite;
          display: inline-block;
        }
      `}</style>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;