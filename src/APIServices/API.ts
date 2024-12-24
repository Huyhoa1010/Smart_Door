import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {root_domain, root_python} from '../../environment';

// Create axios instance
const api = axios.create({
  baseURL: `http://${root_domain}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to get token from AsyncStorage
const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.error('Error getting token from AsyncStorage:', error);
    return null;
  }
};

// Add a request interceptor to include the token in the Authorization header
api.interceptors.request.use(
  async config => {
    const token = await getToken(); // Retrieve the token from AsyncStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the headers
    }
    return config; // Return the modified config
  },
  error => {
    return Promise.reject(error);
  },
);

// Example API functions:

// Login
export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/login', {username, password});
    console.log('Login response:', response.data.data.token);

    // Save token in AsyncStorage
    await AsyncStorage.setItem('token', response.data.data.token);

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Register
export const register = async (username: string, password: string) => {
  try {
    const response = await api.post('/register', {username, password});
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

// Forgot Password
export const forgotPassword = async (username: string) => {
  try {
    const response = await api.post('/forgot-password', {username});
    return response.data;
  } catch (error) {
    console.error('Error during forgot password:', error);
    throw error;
  }
};

// Get All Logs
export const getAllLogs = async () => {
  try {
    const response = await api.get('/get-all-logs');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching logs:', error);
    throw error;
  }
};

// Get All Cards
export const getAllCards = async () => {
  try {
    const response = await api.get('/get-all-cards');
    console.log('response:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw error;
  }
};

// Logout (removes the token from AsyncStorage)
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('token'); // Clear the token
  } catch (error) {
    console.error('Error removing token from AsyncStorage:', error);
  }
};

// Create Card
export const createCard = async (ten: string, id_the: string) => {
  try {
    const response = await api.post('/create-card', {ten, id_the});
    return response.data;
  } catch (error) {
    console.error('Error creating card:', error);
    throw error;
  }
};

// Update Card
export const updateCard = async (id: number, ten: string, id_the: string) => {
  try {
    const response = await api.put(`/update-card/${id}`, {ten, id_the});
    return response.data;
  } catch (error) {
    console.error('Error updating card:', error);
    throw error;
  }
};

// Delete Card
export const deleteCard = async (id: number) => {
  try {
    const response = await api.delete(`/delete-card/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting card:', error);
    throw error;
  }
};

// Get Profile
export const getProfile = async () => {
  try {
    const response = await api.get('/getProfile');
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

// Update Profile
export const updateProfile = async (
  ten: string,
  password: string,
  passdoor: string,
) => {
  try {
    const response = await api.put('/update-profile', {
      ten,
      password,
      passdoor,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

const api1 = axios.create({
  baseURL: `http://${root_python}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadImage = async (formData: FormData) => {
  try {
    const response = await api1.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const openDoor = async () => {
  try {
    const response = await api1.post('/open-door');
    return response.data;
  } catch (error) {
    console.error('Error open door:', error);
    throw error;
  }
};
