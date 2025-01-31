import axios from "axios";
import { Platform } from "react-native";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";
import { EventRegister } from 'react-native-event-listeners';

export const API_URL =
  Platform.OS === "android" && process.env.NODE_ENV === "development"
    ? process.env.EXPO_PUBLIC_API_URL.replace("localhost", "10.0.2.2")
    : process.env.EXPO_PUBLIC_API_URL;

export const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, Content-Type, Accept, Authorization",
  },
});

// Create an event handler for token errors
const handleTokenError = async (errorCode) => {
  // Remove auth token immediately
  delete http.defaults.headers.common["Authorization"];

  try {
    // Clear storage
    await AsyncStorage.removeItem('userInfo');
    await AsyncStorage.setItem('isLoginRoute', 'true');
    removeAuthToken();

    // Emit session expired event
    EventRegister.emit('sessionExpired');

    // Show message
    showMessage({
      message: errorCode === "TOKEN_BLACKLISTED" || errorCode === "TOKEN_EXPIRED"
        ? "Session expired. Please login again."
        : errorCode === "TOKEN_INVALID"
        ? "Invalid session. Please login again."
        : "Session not found. Please login.",
      type: "danger",
      icon: "danger",
      duration: 2000,
    });

    // Navigate to login immediately
    router.replace("/login");
  } catch (err) {
    console.error('Error handling token error:', err);
    router.replace("/login");
  }
};

// Update the interceptor to use the new handler
http.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.data?.isTokenError) {
        await handleTokenError(error.response.data.code);
        return Promise.reject({ isHandledTokenError: true });
      }
      return Promise.reject(error);
    }
);

export const setAuthToken = (token) => {
  http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  delete http.defaults.headers.common["Authorization"];
};

export const getAuthToken = () => {
  return http.defaults.headers.common["Authorization"];
};

export const login = async (email, password) => {
  try {
    const response = await http.post("auth/login", { email, password });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const signup = async (fullName, email, password, profilePicture) => {
  const response = await http.post("auth/register", {
    username: fullName,
    email,
    password,
    profileImageUrl: profilePicture,
  });
  return response.data;
};

export const logout = async () => {
  const response = await http.post("auth/logout");
  return response.data;
};

export const getAllNotes = async (page = 1) => {
  const response = await http.get(`notes?page=${page}`);
  return response.data;
};

export const getNoteById = async (noteId) => {
  const response = await http.get(`notes/${noteId}`);
  return response.data;
};
export const deleteNote = async (noteId) => {
  const response = await http.delete(`notes/${noteId}`);
  return response.data;
};

export const updateNote = async (noteId, title, content) => {
  const response = await http.put(`notes/${noteId}`, { title, content });
  return response.data;
};

export const createNote = async (title, content) => {
  const response = await http.post(`notes`, {
    title,
    content,
  });
  return response.data;
};

export const searchNotes = async (query) => {
  try {
    const response = await http.get(
      `notes/search?query=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (image) => {
  try {
    // Extract file name from uri
    const fileName = image.split('/').pop();
    // Determine the mime type
    let type = 'image/jpeg';
    if (fileName.toLowerCase().endsWith('.png')) {
      return;
    } else if (fileName.toLowerCase().endsWith('.gif')) {
      return;
    }

    // Create form data with proper structure for Android
    const formData = new FormData();
    const fileData = {
      uri: Platform.OS === 'android' ? image : image, // Removed file:// prefix
      name: fileName,
      type: type,
    };
    formData.append('profile_picture', fileData);

    // Custom config for the request
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
      timeout: 60000, // Extended timeout to 60 seconds
      transformRequest: (data) => data,
    };

    const response = await http.post('users/upload/picture', formData, config);
    return response.data;
  } catch (error) {
    let errorMessage = 'Image upload failed. Please try again.';
    if (error.message === 'Network Error') {
      errorMessage = 'Network connection error. Please check your internet connection and try again.';
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Upload timed out. Please try again with a smaller image.';
    }

    return {
      success: false,
      message: error.response?.data?.message || errorMessage,
      technicalDetails: error.message, // Added technical details
    };
  }
};

export const updateUser = async (userId, fullName, email, profilePicture) => {
  const response = await http.put(`users/profile`, {
    name: fullName,
    email,
    profile_picture: profilePicture,
  });
  return response.data;
};

export const verifyEmail = async (token) => {
  try {
    const response = await http.get(`/auth/verify-email?token=${token}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
