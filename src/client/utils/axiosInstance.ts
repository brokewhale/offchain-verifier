import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    accept: '*/*',

    timeout: 1000,
  },
  // .. other options
});

export default api;
