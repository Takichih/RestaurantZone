<template>
  <div>
    <div class="text-h3 text-center my-5">Bienvenue sur UFood</div>
    <v-container fluid>
      <v-row class="justify-center">
        <v-col cols="11">
          <v-card class="pa-5">
            <v-row class="justify-center">
              <v-col cols="11">
                <h1 class="text-center">Liste des Restaurants</h1>
              </v-col>
            </v-row>

            <!-- Filtres -->
            <RestaurantFilters
              v-if="!loading"
              :priceRanges="priceRanges"
              :specialities="specialities"
              :search="search"
              @update:search="search = $event"
              :selectedPrice="selectedPrice"
              :selectedSpeciality="selectedSpeciality"
              @update:selectedPrice="selectedPrice = $event"
              @update:selectedSpeciality="selectedSpeciality = $event"
            />

            <!-- Spinner de chargement -->
            <v-row v-if="loading" class="justify-center">
              <v-col cols="12" class="text-center">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-col>
            </v-row>

            <!-- Liste de restaurants filtrée -->
            <v-row v-else>
              <template v-if="filteredRestaurants.length > 0">
                <RestaurantCard
                  v-for="restaurant in filteredRestaurants"
                  :key="restaurant.place_id"
                  :restaurant="restaurant"
                  @toggle-favorite="toggleFavorite"
                  @view-details="viewDetails"
                />
              </template>
              <template v-else>
                <v-col cols="12" class="text-center">
                  <v-alert type="info" color="red" outlined>
                    Aucun restaurant trouvé correspondant à la recherche "{{
                      search
                    }}"
                  </v-alert>
                </v-col>
              </template>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect } from "vue";
import RestaurantCard from "./RestaurantCard.vue";
import RestaurantFilters from "./RestaurantFilters.vue";
import RestaurantService from "@/api/RestaurantService";

export default {
  name: "RestaurantList",
  components: {
    RestaurantCard,
    RestaurantFilters,
  },
  setup() {
    const search = ref("");
    const selectedPrice = ref(null);
    const selectedSpeciality = ref(null);
    const restaurants = ref([]);
    const filteredRestaurants = ref([]);
    const loading = ref(true);

    const priceRanges = ref([]);
    const specialities = ref([]);

    onMounted(async () => {
      try {
        const response = await RestaurantService.getRestaurants();
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
            label: `${range}$`,
            value: range,
          }));
        priceRanges.value = uniquePriceRanges;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des restaurants :",
          error,
        );
      } finally {
        loading.value = false;
      }
    });

    watchEffect(() => {
      const searchTerm = (search.value || "").toLowerCase();
      filteredRestaurants.value = restaurants.value.filter((restaurant) => {
        const matchesSearch = searchTerm
          ? restaurant.name.toLowerCase().includes(searchTerm)
          : true;

        const selectedRange = selectedPrice.value;
        const matchesPrice = selectedRange
          ? restaurant.price_range == selectedRange
          : true;

        const matchesSpeciality =
          selectedSpeciality.value && selectedSpeciality.value.length > 0
            ? selectedSpeciality.value.some(
                (speciality) =>
                  restaurant.genres && restaurant.genres.includes(speciality),
              )
            : true;

        return matchesSearch && matchesPrice && matchesSpeciality;
      });
    });

    const toggleFavorite = (restaurant) => {
      restaurant.isFavorite = !restaurant.isFavorite;
    };

    const viewDetails = (restaurant) => {
      alert(`Détails du restaurant : ${restaurant.name}`);
    };

    return {
      search,
      selectedPrice,
      selectedSpeciality,
      priceRanges,
      specialities,
      filteredRestaurants,
      toggleFavorite,
      viewDetails,
      loading,
    };
  },
};
</script>

<style scoped>
.text-h3 {
  font-size: 1.75rem;
}
</style>
