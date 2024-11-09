<script setup>
import { ref, onMounted } from "vue";
import * as userService from "@/api/UserService";
import VisitService from "@/api/VisitService";
import Favorites from "@/components/UserPage/Favorites.vue";
import VisitedRestaurantCard from "@/components/UserPage/VisitedRestaurantCard.vue";

const userName = ref(null);
const userID = ref(null);
const userEmail = ref(null);
const userRating = ref(0);

const recentVisits = ref([]);

const fetchRecentVisits = async () => {
  try {
    const visits = await VisitService.getRecentVisits(userID.value);
    recentVisits.value = visits;
  } catch (error) {
    console.error("Error fetching recent visits:", error);
  }
};

function toggleFavorite(restaurant_id) {
  const restaurant = recentVisits.value.find(
    (r) => r.restaurant_id === restaurant_id,
  );
  if (restaurant) {
    restaurant.isFavorite = !restaurant.isFavorite;
  }
}

function deleteRestaurant(restaurant_id) {
  recentVisits.value = recentVisits.value.filter(
    (restaurant) => restaurant.restaurant_id !== restaurant_id,
  );
}

onMounted(async () => {
  try {
    const user = await userService.getActiveUser();

    userName.value = user.name || "Nom non disponible";
    userID.value = user.id || "ID non disponible";
    userEmail.value = user.email || "Email non disponible";
    userRating.value = parseInt(user.rating) || 0;

    await fetchRecentVisits();
  } catch (error) {
    console.error("Error while fetching user or visits:", error);
  }
});
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <h4 class="text-left">Nom:</h4>
          <v-card>
            <h3 class="name">{{ userName || "Nom non disponible" }}</h3>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <h4 class="text-left">Score:</h4>
          <h3 class="text-left">
            {{ userRating }}
            <v-icon color="amber" class="ms-2">mdi-star-shooting</v-icon>
          </h3>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h3 class="text-left">Restaurants visités récemment:</h3>
        </v-col>
      </v-row>
      <v-row>
        <template v-if="recentVisits.length === 0">
          <v-col cols="12">
            <v-btn color="primary" :to="{ path: '/' }"> Accueil </v-btn>
          </v-col>
        </template>

        <template v-else>
          <v-col
            cols="12"
            md="3"
            v-for="restaurant in recentVisits"
            :key="restaurant.restaurant_id"
          >
            <VisitedRestaurantCard
              :name="restaurant.name"
              :rating="restaurant.rating"
              :visits="restaurant.visits"
              :isFavorite="restaurant.isFavorite"
              :restaurant_id="restaurant.restaurant_id"
              @toggle-favorite="toggleFavorite"
              @delete-restaurant="deleteRestaurant"
            />
          </v-col>
        </template>
      </v-row>
    </v-container>
    <Favorites />
  </div>
</template>

<style scoped>
.d-flex {
  display: flex;
  justify-content: flex-end;
}

.text-left {
  padding: 5px;
}

.name {
  margin-left: 10px;
}
</style>
