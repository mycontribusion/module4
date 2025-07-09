// src/api/user.js (Handles communication with your Express user/profile routes)
import apiClient from './index'; // Import the configured axios instance

export const getUserProfile = async () => {
  // Backend route: GET /api/users/profile (protected)
  const response = await apiClient.get('/users/profile');
  return response.data;
};

// Add functions for updating profile if you implement that
// export const updateUserProfile = async (profileData) => {
//   const response = await apiClient.put('/users/profile', profileData);
//   return response.data;
// };