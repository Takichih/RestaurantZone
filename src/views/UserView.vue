<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import userService from "@/api/userService";
import { getCurrentUserID } from "@/composables/useUserService";
import gravatarService from "@/api/gravatarService";

const searchQuery = ref("");
const users = ref([]);
const followedUsers = ref([]);
const followers = ref([]);
const activeUserId = ref("");

const headers = ref([
  // { title: "ID", key: "id" },
  { title: "", key: "gravatar", sortable: false },
  { title: "Nom de l'utilisateur", key: "name" },
  { title: "Courriel", key: "email" },
  { title: "Score", key: "rating" },
  { title: "Actions", key: "actions", sortable: false },
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
    activeUserId.value = getCurrentUserID();
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

const getGravatarUrl = (email) => {
  return gravatarService.getGravatarUrl(email);
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
              <h2 class="table-title">Résultats</h2>
            </template>

<!--            <template v-slot:[`item.id`]="{ item }">-->
<!--              <a-->
<!--                href="#"-->
<!--                @click.prevent="$router.push({ name: 'UserDetailView', query: { id: item.id } })"-->
<!--              >-->
<!--                {{ item.id }}-->
<!--              </a>-->
<!--            </template>-->


            <template v-slot:[`item.gravatar`]="{ item }">
              <v-avatar class="user-avatar">
                <img :src="getGravatarUrl(item.email)" alt="User Avatar" class="avatar-img"/>
              </v-avatar>
            </template>
            <template v-slot:[`item.name`]="{ item }">
              <a
                href="#"
                @click.prevent="$router.push({ name: 'UserDetailView', query: { id: item.id } })"
              >
                {{ item.name }}
              </a>
            </template>
            <template v-slot:[`item.email`]="{ item }">
              <a
                href="#"
                @click.prevent="$router.push({ name: 'UserDetailView', query: { id: item.id } })"
              >
                {{ item.email }}
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

<style scoped>
h3 {
  margin-bottom: 20px;
}
.user-avatar {
  margin: auto;
}
.avatar-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.table-title {
  margin-left: 20px;
}
</style>
