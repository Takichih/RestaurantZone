<script setup>
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import userService from "@/api/userService";
import {useProfile} from "@/composables/useProfile";

const route = useRoute();

const userId = ref(route.query.id || ""); // ID de l'utilisateur à afficher
const userDetails = ref(null); // Détails de l'utilisateur
const isFollowing = ref(false); // Indique si l'utilisateur est suivi
const activeUserId = ref(""); // ID de l'utilisateur actif
const { currentUser } = await useProfile();

// Récupérer les informations de l'utilisateur
const fetchUserDetails = async () => {
  try {
    const activeUser = await userService.getUser(activeUserId.value);
    userDetails.value = await userService.getUser(userId.value);
    isFollowing.value = activeUser.following.some(
      (user) => user.id === userId.value
    );
  } catch (error) {
    alert("Erreur lors de la récupération des détails de l'utilisateur.");
    console.error(error);
  }
};

// Suivre l'utilisateur
const followUser = async () => {
  try {
    await userService.followUser(userId.value);
    isFollowing.value = true;
  } catch (error) {
    alert("Erreur lors du suivi de l'utilisateur.");
    console.error(error);
  }
};

// Ne plus suivre l'utilisateur
const unfollowUser = async () => {
  try {
    await userService.removeFollow(userId.value);
    isFollowing.value = false;
  } catch (error) {
    alert("Erreur lors de l'annulation du suivi.");
    console.error(error);
  }
};

onMounted(async () => {
  activeUserId.value = currentUser.value.id; // Récupérer l'utilisateur actif
  console.log("activeUserId", activeUserId.value);
  await fetchUserDetails();
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <h3>Détails de l'utilisateur</h3>
        <v-card>
          <v-card-title>Nom : {{ userDetails?.name }}</v-card-title>
          <v-card-subtitle>ID : {{ userDetails?.id }}</v-card-subtitle>
          <v-card-actions>
            <v-btn
              v-if="!isFollowing"
              color="primary"
              @click="followUser"
            >
              Suivre
            </v-btn>
            <v-btn
              v-else
              color="red"
              @click="unfollowUser"
            >
              Ne plus suivre
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
h3 {
  margin-bottom: 20px;
}
</style>
