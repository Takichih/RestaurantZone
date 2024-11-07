// src/api/VisitService.js

import axios from "axios";
import { config } from "../config.js";
import RestaurantService from "@/api/RestaurantService"; // Import the RestaurantService

const baseURL = config.SSL ? config.apiUrl : `${config.apiUrl}/unsecure`;

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
  /**
   * Get the recent visits for a user with additional restaurant details.
   * @param {string} userId - The ID of the user.
   * @param {number} [limit=10] - The maximum number of results per restaurant.
   * @param {number} [page=0] - The page number.
   * @returns {Promise<Array>} - List of restaurants with name, rating, and number of visits.
   */
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

        // If we haven't seen this restaurant_id before, fetch its details
        if (!restaurantVisits[restaurantId]) {
          const restaurantDetails =
            await RestaurantService.getRestaurant(restaurantId);
          restaurantVisits[restaurantId] = {
            restaurant_id: restaurantId, // Include the restaurant_id
            name: restaurantDetails.name,
            rating: parseFloat(restaurantDetails.rating.toFixed(2)), // Round to 2 decimal places
            visits: 1,
          };
        } else {
          // If we have seen this restaurant_id, just increment the visit count
          restaurantVisits[restaurantId].visits += 1;
        }
      }

      return Object.values(restaurantVisits); // Convert to array format
    } catch (error) {
      console.error("Error fetching recent visits:", error);
      throw error;
    }
  },

  /**
   * Get details of a specific visit by visit ID.
   * @param {string} userId - The ID of the user.
   * @param {string} visitId - The ID of the visit.
   * @returns {Promise} - The API response.
   */
  getVisitDetails(userId, visitId) {
    return apiClient.get(`/users/${userId}/restaurants/visits/${visitId}`);
  },

  /**
   * Create a new restaurant visit for a user.
   * @param {string} userId - The ID of the user.
   * @param {Object} visitData - The data for the new visit.
   * @param {string} visitData.restaurant_id - The ID of the restaurant.
   * @param {string} [visitData.comment] - A comment about the visit.
   * @param {number} visitData.rating - The rating given to the restaurant.
   * @param {string} [visitData.date] - The date of the visit (ISO 8601 format).
   * @returns {Promise} - The API response.
   */
  createVisit(userId, visitData) {
    return apiClient.post(`/users/${userId}/restaurants/visits`, visitData);
  },

  /**
   * Get a list of visits for a specific restaurant by a user.
   * @param {string} userId - The ID of the user.
   * @param {string} restaurantId - The ID of the restaurant.
   * @param {number} [limit=10] - The maximum number of results.
   * @param {number} [page=0] - The page number.
   * @returns {Promise} - The API response.
   */
  getVisitsForRestaurant(userId, restaurantId, limit = 10, page = 0) {
    return apiClient.get(
      `/users/${userId}/restaurants/${restaurantId}/visits`,
      {
        params: { limit, page },
      },
    );
  },
};
