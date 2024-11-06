<template>
  <div>
    <!-- App Bar -->
    <v-app-bar app color="primary" dark>
      <!-- Drawer icon: mobile only -->
      <v-app-bar-nav-icon @click="toggleDrawer" class="d-md-none">
      </v-app-bar-nav-icon>

      <v-toolbar-title>UFood</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Navigation menu: Desktop only-->
      <div class="d-none d-md-flex">
        <v-btn text to="/" exact>
          <v-icon left>mdi-home</v-icon>
          Accueil</v-btn
        >

        <v-btn v-if="isLogged" text to="/user">Profile</v-btn>
      </div>

      <!-- Search bar: always visible except on home page-->
      <SearchBar v-model="searchQuery" />

      <!-- Username and login/logout links -->
      <div v-if="isLogged" class="d-none d-md-flex align-center">
        <span class="mr-4">{{ username }}</span>
        <v-btn text @click="logout">
          <v-icon left>mdi-logout</v-icon>
          Déconnexion</v-btn
        >
      </div>
      <div v-else class="d-none d-md-flex align center">
        <v-btn text @click="login">
          <v-icon left>mdi-login</v-icon>
          Connexion</v-btn
        >
      </div>
    </v-app-bar>

    <!-- Navigation Drawer for Mobile -->
    <NavigationDrawer
      v-model="drawer"
      :isLogged="isLogged"
      :username="username"
      @login="login"
      @logout="logout"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import SearchBar from "@/components/SearchBar.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";

const drawer = ref(false);
const searchQuery = ref("");
const username = ref("Gordon Ramsay");
const isLogged = ref(false);
const route = useRoute();

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const login = () => {
  isLogged.value = true;
  localStorage.setItem("isLogged", true);
  localStorage.setItem("username", username.value);
};

const logout = () => {
  isLogged.value = false;
  localStorage.removeItem("isLogged");
  localStorage.removeItem("username");
};

onMounted(() => {
  const loggedIn = localStorage.getItem("isLogged");
  if (loggedIn) {
    isLogged.value = true;
    username.value = localStorage.getItem("username");
  }
});
</script>

<style>
#userNameDrawer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
  font-weight: bolder;
  font-size: 1.2em;
}
</style>
