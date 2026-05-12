// apiClient.js

import { getToken } from "@/utils/asyncToken";
import axios from "axios";

// Create axios instance
const apiClient = axios.create({
  baseURL: "https://produced-washer-fire-eos.trycloudflare.com/api",
  timeout: 10000,
});

// APIs where token should NOT be attached
const publicRoutes = ["/login", "/signup", "/forgot-password", "/otp"];

// Request Interceptor
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Check if request is public
      const isPublicRoute = publicRoutes.some((route) =>
        config.url?.includes(route),
      );

      // Skip token for public APIs
      if (isPublicRoute) {
        return config;
      }

      // Get token from AsyncStorage
      const token = await getToken();

      // Attach token if exists
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Continue request anyway
      return config;
    } catch (error) {
      // Continue request even if token fetch fails
      console.log("API Error:", error);
      return config;
    }
  },
  (error) => Promise.reject(error),
);

// Optional Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized");

      // Optional:
      // await AsyncStorage.removeItem("token");
      // navigate to login screen
    }

    return Promise.reject(error);
  },
);

export default apiClient;
