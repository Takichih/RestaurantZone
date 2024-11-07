import apiClient from "@/utils/apiClient";

export default {
  /**
   * Get a list of restaurants.
   * @param {number} limit - The maximum number of results.
   * @param {number} page - The page number.
   * @param {string} q - The name query.
   * @param {string} genres - The genres query, divided by commas (,).
   * @param {number} price_range - The price range query, divided by commas (,).
   * @param {float} lon - The user's current longitude, lat is required with it.
   * @param {float} lat - The user's current latitude, lon is required with it.
   * @returns {Array<Object>} A list of restaurants.
   */
  async getRestaurants(
    limit = 10,
    page = 0,
    q = null,
    genres = null,
    price_range = null,
    lon = null,
    lat = null,
  ) {
    let restaurants = [];
    let urlToCall = `/restaurants?limit=${limit}&page=${page}`;

    if (q) urlToCall += `&q=${q}`;
    if (genres) urlToCall += `&genres=${genres}`;
    if (price_range) urlToCall += `&price_range=${price_range}`;
    if (lon && lat) urlToCall += `&lon=${lon}&lat=${lat}`;

    try {
      const response = await apiClient.get(urlToCall);

      if (response.status !== 200) {
        throw new Error("Restaurants were not found, please try again.");
      }

      restaurants = response.data.items;
    } catch (error) {
      console.error(error);
    } finally {
      return restaurants;
    }
  },
  /**
   * Get the specified restaurant by id.
   * @param {string} restaurantId - The restaurant id.
   * @returns {Object} A restaurant object.
   */
  async getRestaurant(restaurantId) {
    let restaurant = {};

    try {
      const response = await apiClient.get(`/restaurants/${restaurantId}`);

      if (response.status !== 200) {
        throw new Error("Restaurant was not found, please try another one.");
      }

      restaurant = response.data;
    } catch (error) {
      console.error(error);
    } finally {
      return restaurant;
    }
  },
  /**
   * Get the visits of the specified restaurant by id.
   * @param {string} restaurantId - The restaurant id.
   * @param {number} limit - The maximum number of results.
   * @param {number} page - The page number.
   * @returns {Array<Object>} A list of visits.
   */
  async getRestaurantVisits(restaurantId, limit = 10, page = 0) {
    let restaurantVisits = [];

    try {
      const response = await apiClient.get(
        `/restaurants/${restaurantId}/visits?limit=${limit}&page=${page}`,
      );

      if (response.status !== 200) {
        throw new Error("Restaurant visits were not found, please try again.");
      }

      restaurantVisits = response.data.items;
    } catch (error) {
      console.error(error);
    } finally {
      return restaurantVisits;
    }
  },
};
