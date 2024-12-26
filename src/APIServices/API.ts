/* eslint-disable @typescript-eslint/no-unused-vars */
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
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Login
export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/login', {username, password});
    console.log('Login response:', response.data.data.token);
    console.log('Login response:', response.data.data.isAdmin);
    await AsyncStorage.setItem(
      'isAdmin',
      JSON.stringify(response.data.data.isAdmin),
    );
    // Save token in AsyncStorage
    await AsyncStorage.setItem('token', response.data.data.token);

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// export const login = async (username: string, password: string) => {
//   try {
//     const response = await api.post('/login', {username, password});
//     const token = response.data.data.token;
//     const isAdmin = response.data.data.isAdmin;

//     // Store token if it exists
//     if (token) {
//       await AsyncStorage.setItem('token', token);
//     }

//     // Store isAdmin status if it exists, convert to string
//     if (isAdmin !== undefined) {
//       await AsyncStorage.setItem('isAdmin', JSON.stringify(isAdmin));
//     }

//     return response.data;
//   } catch (error) {
//     console.error('Error during login:', error);
//     throw error;
//   }
// };

// Register
// export const register = async (
//   username: string,
//   password: string,
//   passdoor: string,
//   ten: string,
// ) => {
//   try {
//     const response = await api.post('/register', {username, password});
//     return response.data;
//   } catch (error) {
//     console.error('Error during registration:', error);
//     throw error;
//   }
// };

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
  email: string,
  phoneNumber: string,
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

// Get All Users
export const getAllUsers = async () => {
  try {
    const response = await api.get('/get-all-users');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// get images
export const getAllImages = async () => {
  try {
    const response = await api1.get('/listanh');
    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

// delete image
export const deleteImage = async (imageUrl: string) => {
  try {
    // Extract the filename from the URL
    // const filename = imageUrl.split('/').pop();
    const response = await api1.post('/deletemb', {filename: imageUrl});
    return response.data;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

// add user
export const addUsers = async (
  username: string,
  password: string,
  passdoor: string,
  ten: string,
) => {
  console.log('username:', username);
  console.log('password:', password);
  console.log('passdoor:', passdoor);
  console.log('ten:', ten);
  const response = await api.post('/register', {
    username: username,
    password: password,
    passdoor: passdoor,
    ten: ten,
  });
  return response.data;
};

// delete user
export const deleteUser = async (username: string) => {
  console.log('username:', username);
  const response = await api.post('/deleteUser', {username: username});
  return response.data;
};
