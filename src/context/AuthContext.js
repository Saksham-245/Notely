import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthToken, updateUser } from '../api/http';
import { showMessage } from "react-native-flash-message";

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

  const setLogin = async (userInfo) => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setAuthToken(userInfo.token);
      setIsAuthenticated(true);
      setUserInfo(userInfo);
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
