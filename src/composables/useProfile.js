import { ref } from "vue";
import { store } from "@/store";
import favoriteService from "@/api/favoriteService";
import visitService from "@/api/visitService";

export async function useProfile() {
  const userRecentVisits = ref([]);
  const userFavoriteLists = ref([]);

  const getUserRecentVisits = async () => {
    try {
      const visits = await visitService.getRecentVisits(store.currentUser.id);
      userRecentVisits.value = visits;
    } catch (e) {
      console.error(e);
    }
  }

  const getUserFavoriteLists = async () => {
    const data = await favoriteService.getUserFavorites(store.currentUser.id);
    userFavoriteLists.value = data;

    console.log(userFavoriteLists);
  }

  await getUserRecentVisits();
  await getUserFavoriteLists();

  return { userRecentVisits, userFavoriteLists }
}