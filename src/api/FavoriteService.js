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
  getUserFavorites(userId, limit = 100, page = 0) {
    return apiClient.get(`/users/${userId}/favorites`, {
      params: { limit, page },
    });
  },
  getFavoriteDetails(favoriteId) {
    return apiClient.get(`/favorites/${favoriteId}`);
  },
  createFavoriteList(name, owner = null) {
    const data = { name };
    if (owner) {
      data.owner = owner;
    }
    return apiClient.post("/favorites", data);
  },
  updateFavoriteList(id, name, owner = null) {
    const data = { name };
    if (owner) {
      data.owner = owner;
    }
    return apiClient.put(`/favorites/${id}`, data);
  },
  deleteFavoriteList(id) {
    return apiClient.delete(`/favorites/${id}`);
  },

  addRestaurantToFavoriteList(favoriteId, restaurantId) {
    try{
      return apiClient.post(`/favorites/${favoriteId}/restaurants`, {
      id: restaurantId,
    });
    }catch(error){
      console.log("Something Wrong here", error);
    }
  },
  removeRestaurantFromFavoriteList(favoriteId, restaurantId) {
    try {
        return apiClient.delete(`/favorites/${favoriteId}/restaurants/${restaurantId}`);
    } catch (error) {
        console.log("Something went wrong here", error);
    }
},
};
