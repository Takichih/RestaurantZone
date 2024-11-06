<script setup>
import { useRestaurant } from "@/composables/useRestaurant";
import { useRoute } from "vue-router";
import moment from "moment";
import "moment/locale/fr";

// Components
import InteractiveMap from "@/components/InteractiveMap";
import ModaleVisite from "@/components/ModaleVisite.vue";

const route = useRoute();
const currentRestaurantId = route.params.restaurantId;
const { restaurant, visits } = await useRestaurant(currentRestaurantId);

const formatDate = (dateString) => {
  return moment(dateString).locale("fr").format("D MMMM YYYY, HH[h]mm");
};

const handleVisitSubmitted = (visitData) => {
  // console.log("Nouvelle visite reçue :", visitData);

  visits.value.unshift(visitData);
};
</script>

<template>
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
        </v-card-text>
        <div v-if="visits && visits.length" class="mt-4 text-subtitle-1">
          <v-divider></v-divider>
          <v-card-title class="mt-4">Avis des visiteurs</v-card-title>

          <div v-for="visit in visits" :key="visit.id" class="visit-card mt-4">
            <v-card-item>
              <v-row class="d-flex align-center" justify="space-between">
                <v-col class="text-start" cols="6">
                  <p class="text-body-2">
                    {{ visit.user_id }}
                  </p>
                </v-col>
                <v-col class="text-end" cols="6">
                  <p class="text-body-2 text-grey">
                    {{ formatDate(visit.date) }}
                  </p>
                </v-col>
              </v-row>
            </v-card-item>

            <v-card-text class="rating">
              <v-row class="mx-0 align-center">
                <v-rating
                  :model-value="visit.rating"
                  color="amber"
                  density="compact"
                  size="small"
                  half-increments
                  readonly
                >
                </v-rating>

                <span class="text-grey ms-2 mt-1">
                  {{ visit.rating }}
                </span>
              </v-row>

              <div class="comment mt-4 text-subtitle-1">
                <p>
                  {{ visit.comment }}
                </p>
              </div>
            </v-card-text>
          </div>
        </div>
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
          </v-card></v-col
        >
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
      <v-row>
        <v-col>
          <ModaleVisite
            :id="restaurant?.id"
            @visitSubmitted="handleVisitSubmitted"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
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

.visit-card {
  background-color: #f0f0f5;
  border-radius: 8px;
  margin: 20px;
}

.directions {
  text-decoration: none;
}
</style>
