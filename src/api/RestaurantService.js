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
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  /**
   * Returns a filtered list of restaurants
   *
   * @param limit the number of restaurants per page to return (default: 10).
   * @param page the page id wanted to filter restaurants (default: 0).
   * @param q the query parameter to filter on restaurant's name (default: undefined).
   * @param genres the genres wanted to filter restaurants, seperated by commas (,) if multiple (default: undefined).
   * @param price_range the price range wanted to filter restaurants, seperated by commas (,) if multiple (default: undefined).
   * @param lon the user's current longitude, used to query nearby restaurants, lat is required with it (default: undefined).
   * @param lat the user's current latitude, used to query nearby restaurants, lon is required with it (default: undefined).
   *
   * @returns A list of restaurants depending on filters
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
   * Returns the restaurant with the specified id.
   *
   * @param restaurantId the id of the desired restaurant (default: undefined).
   *
   * @returns
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
   * Returns the visits of the restaurant with the specified id.
   *
   * @param restaurantId the id of the desired restaurant (default: undefined).
   * @param limit the number of visits per page to return (default: 10).
   * @param page the page id wanted to filter visits (default: 0).
   *
   * @returns
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
