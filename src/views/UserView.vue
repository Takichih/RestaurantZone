<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import userService from "@/api/userService";
import {useProfile} from "@/composables/useProfile";

const searchQuery = ref("");
const users = ref([]);
const followedUsers = ref([]);
const followers = ref([]);
const activeUserId = ref("");

const { currentUser } = await useProfile();

const headers = ref([
  { text: "ID", value: "id" },
  { text: "Nom de l'utilisateur", value: "name" },
  { text: "Actions", value: "actions", sortable: false },
]);

const route = useRoute();
const router = useRouter();

const fetchUsers = async () => {
  try {
    users.value = await userService.searchUsers(searchQuery.value);
  } catch (error) {
    alert("Une erreur s'est produite lors de la recherche des utilisateurs.");
    console.error(error);
  }
};


const filteredUsers = computed(() => {
  return users.value.filter((user) => user.name && user.name.trim() !== "");
});

const fetchUserRelations = async () => {
  try {
    activeUserId.value = currentUser.value.id;
    const user = await userService.getUser(activeUserId.value);
    followedUsers.value = user.following.map((user) => user.id);
    followers.value = user.followers;
  } catch (error) {
    alert("Une erreur s'est produite lors de la récupération des données.");
    console.error(error);
  }
};

const followUser = async (userId) => {
  try {
    await userService.followUser(userId);
    followedUsers.value.push(userId);
  } catch (error) {
    alert("Une erreur s'est produite lors du suivi de l'utilisateur.");
    console.error(error);
  }
};

const unfollowUser = async (userId) => {
  try {
    await userService.removeFollow(userId);
    followedUsers.value = followedUsers.value.filter((id) => id !== userId);
  } catch (error) {
    alert("Une erreur s'est produite lors de l'annulation du suivi.");
    console.error(error);
  }
};

const handleKeyPress = (event) => {
  if (event.key === "Enter") {
    fetchUsers();
  }
};

watch(
  () => route.query.q,
  (newQuery) => {
    searchQuery.value = newQuery || "";
    fetchUsers();
  }
);

onMounted(async () => {
  searchQuery.value = route.query.q || "";
  await fetchUserRelations();
  await fetchUsers();
});
</script>


<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="searchQuery"
            label="Rechercher un utilisateur"
            append-icon="mdi-magnify"
            @keypress="handleKeyPress"
            @click:append="fetchUsers"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="filteredUsers"
            item-value="id"
            class="elevation-1"
          >
            <template v-slot:top>
              <h2>Résultats</h2>
            </template>

            <template v-slot:[`item.id`]="{ item }">
              <a
                href="#"
                @click.prevent="$router.push({ name: 'UserDetailView', query: { id: item.id } })"
              >
                {{ item.id }}
              </a>
            </template>

            <template v-slot:[`item.name`]="{ item }">
              <a
                href="#"
                @click.prevent="$router.push({ name: 'UserDetailView', query: { id: item.id } })"
              >
                {{ item.name }}
              </a>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                v-if="!followedUsers.includes(item.id)"
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
              <v-btn
                v-if="followedUsers.includes(item.id)"
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
  </div>
</template>

