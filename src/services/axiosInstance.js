import axios from 'axios';
import { APP_CONFIG } from '../config/appConfig.js';

/**
 * Pre-configured Axios instance for REST API communication.
 */
const axiosInstance = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Response interceptor: uniform error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const customMessage =
      error.response?.data?.message ||
      error.message ||
      'Network communication error occurred.';

    return Promise.reject(new Error(customMessage));
  }
);

export default axiosInstance;