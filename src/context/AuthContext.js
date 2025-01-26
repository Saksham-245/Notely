import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthToken, updateUser } from '../api/http';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoginRoute, setIsLoginRoute] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const [storedUserInfo, storedLoginRoute] = await Promise.all([
          AsyncStorage.getItem('userInfo'),
          AsyncStorage.getItem('isLoginRoute')
        ]);

        if (storedUserInfo) {
          const parsedInfo = JSON.parse(storedUserInfo);
          setUserInfo(parsedInfo);
          if (parsedInfo.token) {
            setAuthToken(parsedInfo.token);
            setIsAuthenticated(true);
          }
        }

        setIsLoginRoute(storedLoginRoute === 'true');
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const setLogin = async (userData) => {
    try {
      // Verify we have the token
      if (!userData.token) {
        throw new Error('Token is missing');
      }

      // Set the auth token first
      setAuthToken(userData.token);

      // Store user info
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));

      // Update state
      setUserInfo(userData);
      setIsAuthenticated(true);

      return true;
    } catch (error) {
      console.error('Error setting login:', error);
      // Clear any partial data on error
      await AsyncStorage.removeItem('userInfo');
      setUserInfo(null);
      setIsAuthenticated(false);
      setAuthToken(null);
      return false;
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
          ...(fullName !== parsedCurrentInfo.username && { username: fullName }),
          ...(email !== parsedCurrentInfo.email && { email: email }),
          ...(profilePicture !== parsedCurrentInfo.profileImageUrl && { profileImageUrl: profilePicture })
        };

        await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        setUserInfo(updatedUserInfo);

        return {
          s: true,
          message: response.message,
          user: updatedUserInfo
        };
      } else {
        throw new Error(response?.message);
      }
    } catch (error) {
      return {
        s: false,
        message: error.message
      };
    }
  };

  const setLoginRoute = async (value) => {
    try {
      await AsyncStorage.setItem('isLoginRoute', value.toString());
      setIsLoginRoute(value);
    } catch (error) {
      console.error("Error setting login route:", error);
    }
  };

  const setLogout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('userInfo');
      await AsyncStorage.setItem('isLoginRoute', 'true');
      setAuthToken(null);
      setIsAuthenticated(false);
      setIsLoginRoute(true);
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
      setUserInfo,
      isLoginRoute,
      setLoginRoute
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
