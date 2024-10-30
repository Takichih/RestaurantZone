<template>
  <v-navigation-drawer app v-model="localDrawer" temporary class="d-md-none">
    <!-- Drawer visible only on small screen -->

    <v-list>
      <!-- Username if logged -->
      <v-list-item v-if="isLogged" id="userNameDrawer">
        <span class="mr-4">{{ username }}</span>
      </v-list-item>

      <!-- Home link -->
      <v-list-item link to="/" exact>
        <v-icon>mdi-home</v-icon>
        <v-list-item-title>Accueil</v-list-item-title>
      </v-list-item>

      <!-- Restaurant link -->
      <v-list-item link to="/restaurant">
        <v-icon>mdi-silverware-fork-knife</v-icon>
        <v-list-item-title>Restaurant</v-list-item-title>
      </v-list-item>

      <!-- Profile link if logged-->
      <v-list-item v-if="isLogged" link to="/user">
        <v-icon>mdi-account</v-icon>
        <v-list-item-title>Profil</v-list-item-title>
      </v-list-item>

      <!-- Login/Logout in drawer -->
      <v-list-item @click="handleLogin" v-if="!isLogged">
        <v-icon>mdi-login</v-icon>
        <v-list-item-title>Connexion</v-list-item-title>
      </v-list-item>

      <v-list-item @click="handleLogout" v-if="isLogged">
        <v-icon>mdi-logout</v-icon>
        <v-list-item-title>Déconnexion</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  drawer: Boolean,
  isLogged: Boolean,
  username: String,
});

const emit = defineEmits(["update:drawer", "login", "logout"]);

// Variable locale pour gérer l'état du drawer sans modifier la prop
const localDrawer = ref(props.drawer);

// Synchroniser localDrawer avec la prop drawer
watch(
  () => props.drawer,
  (newVal) => {
    localDrawer.value = newVal;
  },
);

// Émettre la mise à jour de l'état du drawer
watch(localDrawer, (newVal) => {
  emit("update:drawer", newVal);
});

// Méthodes pour émettre les événements
function handleLogin() {
  emit("login");
}

function handleLogout() {
  emit("logout");
}
</script>

<style scoped>
/* Styles spécifiques au drawer */
#userNameDrawer {
  font-weight: bold;
}
</style>
