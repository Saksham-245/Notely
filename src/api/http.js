import axios from "axios";
import { Platform } from "react-native";

export const API_URL = Platform.OS === 'android' && process.env.NODE_ENV === 'development' 
  ? process.env.EXPO_PUBLIC_API_URL.replace('localhost', '10.0.2.2')
  : process.env.EXPO_PUBLIC_API_URL;

export const http = axios.create({
  baseURL:  API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, Content-Type, Accept, Authorization",
  },
});

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
    console.log(error);
    return error;
  }
};

export const signup = async (fullName, email, password) => {
  const response = await http.post("auth/signup", {
    name: fullName,
    email,
    password,
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

export const updateNote = async (noteId, title, content, userId) => {
  const response = await http.put(`notes/${noteId}`, { title, content, user_id: userId });
  return response.data;
};

export const createNote = async (title, content, userId) => {
  const response = await http.post(`notes`, {
    title,
    content,
    user_id: userId,
  });
  return response.data;
};

export const searchNotes = async (query) => {
  try {
    const response = await http.get(`notes/search?query=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (image) => {
  console.log(image, 'image');
  const formData = new FormData();
  formData.append('profile_picture', {
    uri: image,
    type: image.split('.').pop(),
    name: image.split('/').pop()
  });

  const response = await http.post("user/upload", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateUser = async (userId, fullName, email, profilePicture) => {
  const response = await http.put(`user/update`, { name:fullName, email, profile_picture: profilePicture });
  return response.data;
};
