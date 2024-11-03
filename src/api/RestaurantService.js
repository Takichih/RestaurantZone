import axios from "axios";
import { config } from "../config.js";
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
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default {
  getRestaurants() {
    return apiClient.get("/restaurants");
  },
  getRestaurantById(id) {
    return apiClient.get(`/restaurants/${id}`);
  },
  getRestaurantDetails(id){
    return apiClient.get(`/restaurants/${id}`)
  },
  createRestaurant(name, location, rating) {
    return apiClient.post("/restaurants", {
      name,
      location,
      rating,
    });
  },
  updateRestaurant(id, name, location, rating) {
    return apiClient.put(`/restaurants/${id}`, {
      name,
      location,
      rating,
    });
  },
  deleteRestaurant(id) {
    return apiClient.delete(`/restaurants/${id}`);
  },
};
