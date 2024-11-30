<script setup>
import { useProfile } from "@/composables/useProfile";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import userService from "@/api/userService";

// Components
import FavoriteLists from "@/components/UserPage/FavoriteLists.vue";
import VisitedRestaurantCard from "@/components/UserPage/VisitedRestaurantCard.vue";

const { currentUser, userRecentVisits, allRestaurantNames } = await useProfile();
const followedUsers = ref([]); // Liste des utilisateurs suivis
const followers = ref([]); // Liste des utilisateurs qui suivent

const headers = ref([
  { text: "ID", value: "id" },
  { text: "Nom de l'utilisateur", value: "name" },
  { text: "Actions", value: "actions", sortable: false },
]);

const router = useRouter();

// Fetch les utilisateurs suivis et les followers
const fetchUserRelations = async () => {
  try {
    const user = await userService.getUser(currentUser.id);
    followedUsers.value = user.following;
    followers.value = user.followers;
  } catch (error) {
    alert("Une erreur s'est produite lors de la récupération des données.");
    console.error(error);
  }
};

// Suivre un utilisateur
const followUser = async (userId) => {
  try {
    await userService.followUser(userId);
    const user = await userService.getUser(userId);
    followedUsers.value.push(user);
  } catch (error) {
    alert("Une erreur s'est produite lors du suivi de l'utilisateur.");
    console.error(error);
  }
};

// Ne plus suivre un utilisateur
const unfollowUser = async (userId) => {
  try {
    await userService.removeFollow(userId);
    followedUsers.value = followedUsers.value.filter((user) => user.id !== userId);
  } catch (error) {
    alert("Une erreur s'est produite lors de l'annulation du suivi.");
    console.error(error);
  }
};

// Redirection vers UserDetailView
const goToUserDetail = (userId) => {
  router.push({ name: "UserDetailView", query: { id: userId } });
};

// Fetch user relations lors de l'initialisation
onMounted(async () => {
  await fetchUserRelations();
});
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

    <!-- Liste des utilisateurs suivis -->
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="followedUsers"
            item-value="id"
            class="elevation-1"
          >
            <template v-slot:top>
              <h2>Utilisateurs suivis</h2>
            </template>

            <template v-slot:[`item.id`]="{ item }">
              <a href="#" @click.prevent="goToUserDetail(item.id)">{{ item.id }}</a>
            </template>

            <template v-slot:[`item.name`]="{ item }">
              <a href="#" @click.prevent="goToUserDetail(item.id)">{{ item.name }}</a>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                color="red"
                icon
                @click="unfollowUser(item.id)"
              >
                <v-icon>mdi-account-minus</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>

    <!-- Liste des followers -->
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="followers"
            item-value="id"
            class="elevation-1"
          >
            <template v-slot:top>
              <h2>Utilisateurs qui me suivent</h2>
            </template>

            <template v-slot:[`item.id`]="{ item }">
              <a href="#" @click.prevent="goToUserDetail(item.id)">{{ item.id }}</a>
            </template>

            <template v-slot:[`item.name`]="{ item }">
              <a href="#" @click.prevent="goToUserDetail(item.id)">{{ item.name }}</a>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                v-if="!followedUsers.some((user) => user.id === item.id)"
                color="primary"
                icon
                @click="followUser(item.id)"
              >
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
              <v-btn
                v-else
                color="grey"
                icon
              >
                <v-icon color="green">mdi-account-check</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
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
