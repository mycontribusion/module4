// src/pages/ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../api/user'; // Backend API
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout, isLoading: authLoading } = useAuth(); // Get user from context, also authLoading state
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      // Only fetch profile if user is authenticated and not currently loading auth state
      if (user && user.id && !authLoading) {
        try {
          const data = await getUserProfile(); // Calls backend
          setProfileData(data);
        } catch (err) {
          console.error("Error fetching user profile:", err);
          setError(err.response?.data?.message || 'Failed to load profile data.');
        } finally {
          setLoading(false);
        }
      } else if (!authLoading) { // If authLoading is false and no user, stop loading
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user, authLoading]); // Rerun when user or authLoading state changes

  if (authLoading || loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Fallback if user context is somehow null after loading
  if (!user) {
    return <div className="error-message">You are not logged in.</div>;
  }

  return (
    <div className="profile-page">
      <h2>Welcome, {profileData?.username || user?.username || 'User'}!</h2>
      {profileData ? (
        <div>
          <p><strong>Email:</strong> {profileData.email}</p>
          {/* Add more profile info from backend if needed */}
        </div>
      ) : (
        <p>User profile details loading or not available.</p>
      )}
      <button onClick={logout} className="logout-button">Logout</button>
      <div className="profile-links">
        <h3>Your Movies</h3>
        <p><Link to="/watchlist">View your saved movies (Watchlist)</Link></p>
      </div>
    </div>
  );
};

export default ProfilePage;