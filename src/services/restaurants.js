import axios from "axios";

const UNSECURED = process.env.VUE_APP_API_UNSECURE ? "/unsecure" : "";
const BASE_API_URL = `${process.env.VUE_APP_API_URL}${UNSECURED}/restaurants`;

export const getRestaurant = async (restaurantId) => {
  const url = `${BASE_API_URL}/${restaurantId}`;
  let restaurant = {};

  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error("Restaurant was not found, please try another one.");
    }

    restaurant = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    return restaurant;
  }
};