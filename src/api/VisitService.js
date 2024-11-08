import apiClient from "@/utils/apiClient";
import RestaurantService from "@/api/RestaurantService";

export default {
  async getRecentVisits(userId, limit = 10, page = 0) {
    try {
      const response = await apiClient.get(
        `/users/${userId}/restaurants/visits`,
        {
          params: { limit, page },
        },
      );

      const restaurantVisits = {};
      for (const visit of response.data.items) {
        const restaurantId = visit.restaurant_id;

        if (!restaurantVisits[restaurantId]) {
          const restaurantDetails =
            await RestaurantService.getRestaurant(restaurantId);
          restaurantVisits[restaurantId] = {
            restaurant_id: restaurantId, // Include the restaurant_id
            name: restaurantDetails.name,
            rating: parseFloat(restaurantDetails.rating.toFixed(2)),
            visits: 1,
          };
        } else {
          restaurantVisits[restaurantId].visits += 1;
        }
      }

      return Object.values(restaurantVisits);
    } catch (error) {
      console.error("Error fetching recent visits:", error);
      throw error;
    }
  },

  getVisitDetails(userId, visitId) {
    return apiClient.get(`/users/${userId}/restaurants/visits/${visitId}`);
  },

  createVisit(userId, visitData) {
    return apiClient.post(`/users/${userId}/restaurants/visits`, visitData);
  },

  getVisitsForRestaurant(userId, restaurantId, limit = 10, page = 0) {
    return apiClient.get(
      `/users/${userId}/restaurants/${restaurantId}/visits`,
      {
        params: { limit, page },
      },
    );
  },
};
