<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import userService from "@/api/userService";
import {useUserService} from "@/composables/useUserService";
import {getCurrentUserID} from "@/composables/useUserService";

const searchQuery = ref(""); // Search query parameter
const users = ref([]); // Users from the search
const followedUsers = ref([]); // IDs of users already followed
const activeUserId = ref(""); // ID of the active user

const headers = [
  { text: "ID", value: "id" },
  { text: "Nom de l'utilisateur", value: "name" },
  { text: "Actions", value: "actions", sortable: false },
];

const route = useRoute();
const router = useRouter();

// Fetch the list of users based on the search query
const fetchUsers = async () => {
  try {
    users.value = await userService.searchUsers(searchQuery.value);
  } catch (error) {
    alert("Une erreur s'est produite lors de la recherche des utilisateurs.");
    console.error(error);
  }
};

// Fetch the active user and their followers
const fetchFollowedUsers = async () => {
  try {
    const activeUserID = getCurrentUserID()
    // activeUserId.value = activeUser;
    // console.log(activeUser);

    const user = await userService.getUser(activeUserID);
    followedUsers.value = user.following.map((user) => user.id);
  } catch (error) {
    alert("Une erreur s'est produite lors de la récupération des données.");
    console.error(error);
  }
};

// Follow a user
const followUser = async (userId) => {
  try {
    await userService.followUser(userId);
    followedUsers.value.push(userId);
  } catch (error) {
    alert("Une erreur s'est produite lors du suivi de l'utilisateur.");
    console.error(error);
  }
};

// Unfollow a user
const unfollowUser = async (userId) => {
  try {
    await userService.removeFollow(userId);
    followedUsers.value = followedUsers.value.filter((id) => id !== userId);
  } catch (error) {
    alert("Une erreur s'est produite lors de l'annulation du suivi.");
    console.error(error);
  }
};

// Sync the search query with the query parameters
const updateSearchQuery = () => {
  router.replace({ query: { q: searchQuery.value } });
  fetchUsers();
};

// Watch for query parameter changes
watch(
  () => route.query.q,
  (newQuery) => {
    searchQuery.value = newQuery || "";
    fetchUsers();
  }
);

// On mounted, initialize the view
onMounted(async () => {
  searchQuery.value = route.query.q || "";
  await fetchFollowedUsers();
  await fetchUsers();
});
</script>

<template>
  <div>
    <v-container>
      <!-- Barre de recherche -->
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="searchQuery"
            label="Rechercher un utilisateur"
            append-icon="mdi-magnify"
            @input="updateSearchQuery"
          />
        </v-col>
      </v-row>

      <!-- Tableau des utilisateurs -->
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="users"
            item-value="id"
            class="elevation-1"
          >
            <template v-slot:top>
              <h2>Résultats</h2>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                v-if="!followedUsers.includes(item.id)"
                color="primary"
                @click="followUser(item.id)"
              >
                Suivre
              </v-btn>
              <v-btn
                v-else
                color="grey"
                icon
              >
                <v-icon color="green">mdi-check-circle</v-icon>
              </v-btn>
              <v-btn
                v-if="followedUsers.includes(item.id)"
                color="red"
                @click="unfollowUser(item.id)"
              >
                Ne plus suivre
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>



<style scoped>
/* Custom styles if needed */
</style>
