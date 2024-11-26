import { computed, ref } from "vue";
import favoriteService from "@/api/favoriteService";
import visitService from "@/api/visitService";
import restaurantService from "@/api/restaurantService";
import { useStore } from "vuex";

export async function useProfile() {
  const store = useStore();
  const userRecentVisits = ref([]);
  const allRestaurantNames = ref([]);
  const currentUser = computed(() => store.getters.getCurrentUser);

  const getUserRecentVisits = async () => {
    try {
      const visits = await visitService.getRecentVisits(currentUser.value.id);
      userRecentVisits.value = visits;
    } catch (e) {
      console.error(e);
    }
  }

  const getUserFavoriteLists = async () => {
    const lists = await favoriteService.getUserFavorites(currentUser.value.id);

    for (const list of lists) {
      list.restaurants = await Promise.all(
        list.restaurants.map(async (restaurant) => {
          const detailsResponse = await restaurantService.getRestaurant(restaurant.id);
          return detailsResponse;
        }),
      );
    }

    //store.setCurrentUserFavorites(lists);
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

  return { currentUser, userRecentVisits, allRestaurantNames }
}