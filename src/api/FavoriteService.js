import apiClient from "@/utils/apiClient";

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
    try {
      return apiClient.post(`/favorites/${favoriteId}/restaurants`, {
        id: restaurantId,
      });
    } catch (error) {
      console.log("Something Wrong here", error);
    }
  },
  removeRestaurantFromFavoriteList(favoriteId, restaurantId) {
    try {
      return apiClient.delete(
        `/favorites/${favoriteId}/restaurants/${restaurantId}`,
      );
    } catch (error) {
      console.log("Something went wrong here", error);
    }
  },
};
