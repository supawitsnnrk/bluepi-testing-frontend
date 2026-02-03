import axios, { AxiosError } from "axios";
import type { AxiosInstance } from "axios";
import { API_CONFIG } from "../shared/config/vending-config";

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.error("Resource not found");
          break;
        case 500:
          console.error("Server error");
          break;
        default:
          console.error("An error occurred:", error.message);
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  },
);

// Helper function to create service instance with custom baseURL
export const createServiceInstance = (baseURL?: string): AxiosInstance => {
  return axios.create({
    baseURL: baseURL || API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default axiosInstance;
