// src/lib/apiClient.ts
import axios from "axios";

// Create the axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // optional: only if you use cookies
});

// Request interceptor (attach token if exists)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (no global error handling here yet)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Just forward the error to be handled in service or UI
    return Promise.reject(error);
  }
);

export default apiClient;