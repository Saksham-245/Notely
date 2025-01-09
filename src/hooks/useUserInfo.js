import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserInfo = async () => {
    try {
      setLoading(true);
      const storedUserInfo = await AsyncStorage.getItem('userInfo');
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUserInfo = async (newUserInfo) => {
    try {
      setLoading(true);
      const updatedUserInfo = { ...userInfo, ...newUserInfo };
      await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      setUserInfo(updatedUserInfo);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearUserInfo = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem('userInfo');
      setUserInfo(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return {
    userInfo,
    loading,
    error,
    getUserInfo,
    updateUserInfo,
    clearUserInfo
  };
}; 