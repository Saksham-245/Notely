import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthToken, updateUser } from '../api/http';
import { showMessage } from "react-native-flash-message";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        if (userInfo) {
          const parsedInfo = JSON.parse(userInfo);
          if (parsedInfo.token) {
            setAuthToken(parsedInfo.token);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const setLogin = async (userInfo) => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setAuthToken(userInfo.token);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserInfo = async (userId, fullName, email, profilePicture) => {
    try {
      const response = await updateUser(userId, fullName, email, profilePicture);
      if (response.s) {
        const currentUserInfo = await AsyncStorage.getItem('userInfo');
        const parsedCurrentInfo = JSON.parse(currentUserInfo);
        
        const updatedUserInfo = {
          ...parsedCurrentInfo,
          name: fullName,
          email: email,
          profile_picture: profilePicture
        };
        
        await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        setUserInfo(updatedUserInfo);
        
        return response;
      } else {
        throw new Error(response?.message);
      }
    } catch (error) {
      throw error;
    }
  };

  const setLogout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('userInfo');
      setAuthToken(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading,
      setLogin, 
      setLogout,
      updateUserInfo,
      userInfo,
      setUserInfo
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 