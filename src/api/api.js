import axios from 'axios';

const api = axios.create({
  baseURL: 'https://library-management-system-3-ciao.onrender.com/api', // Adjust the base URL if necessary
});

// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
