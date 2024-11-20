import axios from "axios";
import { config } from "@/config.js";

let baseURL = config.SSL ? config.apiUrl : `${config.apiUrl}/unsecure`;

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default apiClient;
