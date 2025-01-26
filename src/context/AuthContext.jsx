import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const updateUserInfo = async (userId, fullName, email, profilePicture) => {
    try {
      // Make the API call to update user info
      const response = await api.put(`/users/${userId}`, {
        username: fullName,
        email: email,
        profileImageUrl: profilePicture
      });

      if (response.s) {
        // Create updated user info object
        const updatedUserInfo = {
          ...userInfo,
          username: fullName,
          email: email,
          profileImageUrl: profilePicture,
          updatedAt: new Date().toISOString()
        };

        // Update AsyncStorage
        await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

        // Update context state
        setUserInfo(updatedUserInfo);
      }

      return response;
    } catch (error) {
      console.error('Error updating user info:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        if (userInfo) {
          setUserInfo(JSON.parse(userInfo));
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <AuthContext.Provider value={{
      userInfo,
      updateUserInfo,
    }}>
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
