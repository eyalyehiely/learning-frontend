import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'https://learning-backend-dev.up.railway.app/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;