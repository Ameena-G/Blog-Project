import axios from 'axios';

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error(err?.response?.data || err.message);
    return Promise.reject(err);
  }
);
