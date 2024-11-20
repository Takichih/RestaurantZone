<script setup>
import { useProfile } from "@/composables/useProfile";

// Components
import FavoriteLists from "@/components/UserPage/FavoriteLists.vue";
import VisitedRestaurantCard from "@/components/UserPage/VisitedRestaurantCard.vue";

const { currentUser, userRecentVisits, allRestaurantNames } = await useProfile();
</script>

<template>
  <div v-if="currentUser">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <h4 class="text-left">Nom:</h4>
          <v-card>
            <h3 class="name">{{ currentUser.name }}</h3>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <h4 class="text-left">Score:</h4>
          <h3 class="text-left">
            {{ currentUser.rating }}
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
        <template v-if="userRecentVisits.length === 0">
          <v-col cols="12">
            <v-btn color="primary" to="/">Accueil</v-btn>
          </v-col>
        </template>

        <template v-else>
          <v-col cols="12" md="3" v-for="restaurant in userRecentVisits" :key="restaurant.restaurant_id">
            <VisitedRestaurantCard :name="restaurant.name" :rating="restaurant.rating" :visits="restaurant.visits"
              :restaurant_id="restaurant.restaurant_id" />
          </v-col>
        </template>
      </v-row>
    </v-container>

    <FavoriteLists :allRestaurantNames="allRestaurantNames" />
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