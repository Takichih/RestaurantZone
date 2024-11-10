import { ref } from "vue";
import RestaurantService from "@/api/RestaurantService";

export async function useRestaurants(isLoading) {
  const restaurants = ref([]);
  const specialities = ref([]);
  const priceRanges = ref([]);

  const getRestaurants = async () => {
    const response = await RestaurantService.getRestaurants(150);
    restaurants.value = response.map((item) => ({
      ...item,
      isFavorite: false,
    }));

    specialities.value = [
      ...new Set(restaurants.value.flatMap((item) => item.genres)),
    ];

    const uniquePriceRanges = Array.from(
      new Set(restaurants.value.map((item) => item.price_range)),
    )
      .sort((a, b) => a - b)
      .map((range) => ({
        label: `$`.repeat(range),
        value: range,
      }));
    priceRanges.value = uniquePriceRanges;
    isLoading.value = false;
  }

  await getRestaurants();

  return { restaurants, specialities, priceRanges }
}