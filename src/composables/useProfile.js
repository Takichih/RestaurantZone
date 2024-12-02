import { computed, ref } from "vue";
import favoriteService from "@/api/favoriteService";
import visitService from "@/api/visitService";
import restaurantService from "@/api/restaurantService";
import { useStore } from "vuex";
import { store } from "@/store";

export async function useProfile() {
  const userStore = useStore();
  const userRecentVisits = ref([]);
  const allRestaurantNames = ref([]);
  const allFavoriteListNames = ref([]);
  const currentUser = computed(() => userStore.getters.getCurrentUser);

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

  const getAllFavoriteListNames = async () => {
    try{
      const response = await favoriteService.getUserFavorites(currentUser.value.id);
      const filteredLists = response
        .filter((List) => List.name && List.id)
        .map((List) => ({
          id: List.id,
          name: List.name,
        }));
      allFavoriteListNames.value = filteredLists;
      const listNames = allFavoriteListNames.value.map((list) => list.name);
      console.log(`list names in parent are :  ${listNames}`);
    }catch (error){
      console.error("Erreur lors de la récupération des lests :", error);
    }
  }

  await getUserRecentVisits();
  await getUserFavoriteLists();
  await getAllRestaurantNames();
  await getAllFavoriteListNames();

  return { currentUser, userRecentVisits, allRestaurantNames, allFavoriteListNames}
}
