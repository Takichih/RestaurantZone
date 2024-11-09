<script setup>
import { useRestaurant } from "@/composables/useRestaurant";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { store } from "@/store";

// Components
import InteractiveMap from "@/components/RestaurantPage/InteractiveMap";
import RestaurantVisits from "@/components/RestaurantPage/RestaurantVisits.vue";
import FavoritesDialog from "@/components/Modals/FavoritesDialog.vue";

const route = useRoute();
const currentRestaurantId = route.params.restaurantId;
const { restaurant, visits } = await useRestaurant(currentRestaurantId);

const isFavoriteDialogOpen = ref(false);
const favoriteLists = ref([
  { id: 1, name: "Favorites" },
  { id: 2, name: "Wishlist" },
  // Add more lists as needed
]);

const openFavoriteDialog = () => {
  isFavoriteDialogOpen.value = true;
};

const openVisitModal = () => {
  store.setCurrentAddingVisitRestaurantId(restaurant.value.id);
  store.setCurrentAddingVisitRestaurantVisits(visits.value);
  store.setVisitModalOpen(true);
};

const handleVisitSubmitted = (visitData) => {
  visits.value.unshift(visitData);
};

const handleAddToFavorites = ({ restaurantId, listId }) => {
  // Handle adding the restaurant to the selected favorite list
  console.log(`Restaurant ${restaurantId} added to list ${listId}`);
};

store.handleVisitSubmittedFunction = handleVisitSubmitted;
</script>

<template>
  <v-col>
    <v-row>
      <v-col cols="12" md="6">
        <v-card :restaurant="restaurant" class="mx-auto" height="100%">
          <v-carousel :show-arrows="false" cycle hide-delimiters height="70vh">
            <v-carousel-item
              v-for="(restaurantPicture, index) in restaurant.pictures"
              :key="index"
              :src="restaurantPicture"
              cover
            ></v-carousel-item>
          </v-carousel>

          <v-card-item>
            <v-card-title>{{ restaurant.name }}</v-card-title>

            <v-card-subtitle>
              <a :href="`tel:${restaurant.cleanedTel}`">{{ restaurant.tel }}</a>
            </v-card-subtitle>
            <v-card-subtitle>
              {{ restaurant.address }}
            </v-card-subtitle>
          </v-card-item>
          <v-card-text class="pb-2">
            <v-row class="mx-0 align-center">
              <v-rating
                :model-value="restaurant.rating"
                color="amber"
                density="compact"
                size="small"
                half-increments
                readonly
              ></v-rating>

              <div class="text-grey ms-2 mt-1">
                {{ Math.round(restaurant.rating * 100) / 100 }}
              </div>
            </v-row>

            <div class="mt-4 text-subtitle-1">
              <p v-for="n in restaurant.price_range" :key="n">$</p>
              •
              <p v-for="(genre, index) in restaurant.genres" :key="index">
                {{ genre }}
              </p>
            </div>

            <v-card-actions class="justify-center">
              <v-btn color="primary" class="mx-2" @click="openFavoriteDialog">
                Ajouter aux favoris
              </v-btn>
              <v-btn color="primary" class="mx-2" @click="openVisitModal">
                Ajouter une visite
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Horaire hebdomadaire</v-card-title>

              <v-table density="compact">
                <thead>
                  <tr>
                    <th class="text-left">Jour</th>
                    <th class="text-left">Heures</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(hours, day, index) in restaurant.opening_hours"
                    :key="index"
                  >
                    <td>
                      <p>{{ day }}</p>
                    </td>
                    <td>{{ hours }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card width="100%">
              <InteractiveMap
                :longitude="restaurant.location.coordinates[0]"
                :latitude="restaurant.location.coordinates[1]"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <RestaurantVisits :visits="visits" />
      </v-col>
    </v-row>
    <FavoritesDialog
      :isOpen="isFavoriteDialogOpen"
      :favoriteLists="favoriteLists"
      :restaurantId="restaurant.id"
      @close="isFavoriteDialogOpen = false"
      @add-to-favorites="handleAddToFavorites"
    />
  </v-col>
</template>

<style scoped>
p {
  display: inline-block;
}

p::first-letter {
  text-transform: capitalize;
}

.v-card-subtitle {
  white-space: unset !important;
}

th {
  font-weight: bold !important;
}

.directions {
  text-decoration: none;
}
</style>
