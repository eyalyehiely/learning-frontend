import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_FRONTEND_API_BASE_URL || 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
