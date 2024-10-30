// src/api/FavoritesService.js

import axios from "axios";
import { config } from "../config.js";

// Define baseURL based on SSL setting in config
let baseURL = config.SSL ? config.apiUrl : `${config.apiUrl}/unsecure`;
console.log("FavoritesService baseURL : " + baseURL);

// Set up the Axios instance with the dynamic baseURL
const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to set the Authorization header if a token is provided
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  // GET /favorites - Retrieve all users' favorite restaurant lists
  getAllFavorites(limit = 50, page = 0) {
    return apiClient.get(`/favorites`, {
      params: { limit, page },
    });
  },

  // GET /favorites/:id - Retrieve a specific favorite restaurant list by ID
  getFavoriteById(id) {
    return apiClient.get(`/favorites/${id}`);
  },

  // POST /favorites - Create a new favorite restaurant list
  createFavoriteList(name, owner = null) {
    const data = { name };
    if (owner) {
      data.owner = owner;
    }

    return apiClient.post("/favorites", data);
  },

  // PUT /favorites/:id - Update an existing favorite restaurant list by ID
  updateFavoriteList(id, name, owner = null) {
    const data = { name };
    if (owner) {
      data.owner = owner;
    }
    return apiClient.put(`/favorites/${id}`, data);
  },

  // DELETE /favorites/:id - Delete a favorite restaurant list by ID
  deleteFavoriteList(id) {
    return apiClient.delete(`/favorites/${id}`);
  },

  // POST /favorites/:id/restaurants - Add a restaurant to a favorite list
  addRestaurantToFavoriteList(favoriteId, restaurantId) {
    return apiClient.post(`/favorites/${favoriteId}/restaurants`, {
      id: restaurantId,
    });
  },

  // DELETE /favorites/:id/restaurants/:restaurantId - Remove a restaurant from a favorite list
  removeRestaurantFromFavoriteList(favoriteId, restaurantId) {
    return apiClient.delete(
      `/favorites/${favoriteId}/restaurants/${restaurantId}`,
    );
  },
};
