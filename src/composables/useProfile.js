import { ref } from "vue";
import { store } from "@/store";
import favoriteService from "@/api/favoriteService";
import visitService from "@/api/visitService";
import restaurantService from "@/api/restaurantService";

export async function useProfile() {
  const userRecentVisits = ref([]);
  const allRestaurantNames = ref([]);

  const getUserRecentVisits = async () => {
    try {
      const visits = await visitService.getRecentVisits(store.currentUser.id);
      userRecentVisits.value = visits;
    } catch (e) {
      console.error(e);
    }
  }

  const getUserFavoriteLists = async () => {
    const lists = await favoriteService.getUserFavorites(store.currentUser.id);

    for (const list of lists) {
      list.restaurants = await Promise.all(
        list.restaurants.map(async (restaurant) => {
          const detailsResponse = await restaurantService.getRestaurant(restaurant.id);
          return detailsResponse;
        }),
      );
    }

    store.setCurrentUserFavorites(lists);
  }

  const getAllRestaurantNames = async () => {
    try {
      const response = await restaurantService.getRestaurants(150);
      // Use a temporary variable to store filtered and mapped data
      const filteredRestaurants = response
        .filter((restaurant) => restaurant.name && restaurant.id)
        .map((restaurant) => ({
          name: restaurant.name,
          id: restaurant.id,
        }));
      // Assign the processed data to the reactive allRestaurants array
      allRestaurantNames.value = filteredRestaurants;
    } catch (error) {
      console.error("Erreur lors de la récupération des restaurants :", error);
    }
  }

  await getUserRecentVisits();
  await getUserFavoriteLists();
  await getAllRestaurantNames();

  return { userRecentVisits, allRestaurantNames }
}