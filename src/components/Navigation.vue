<template>
  <div>
    <!-- App Bar -->
    <v-app-bar app color="primary" dark>
      <!-- Drawer icon: mobile only -->
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="d-md-none">
      </v-app-bar-nav-icon>

      <v-toolbar-title>UFood</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Navigation menu: Desktop only-->
      <div class="d-none d-md-flex">
        <v-btn text to="/" exact>
          <v-icon left>mdi-home</v-icon>
          Accueil</v-btn>
        <v-btn text to="/restaurant">
            Restaurant</v-btn>
        <v-btn v-if="isLogged" text to="/user">Profile</v-btn>

      </div>

      <!-- Search bar: always visible -->
      <v-text-field
        v-model="searchQuery"
        append-icon="mdi-magnify"
        label="Rechercher..."
        solo-inverted
        hide-details
        class="mx-3"
      ></v-text-field>

      <!-- Username and login/logout links -->
      <div v-if="isLogged" class="d-none d-md-flex align-center">
        <span class="mr-4">{{ username }}</span>
        <v-btn text @click="logout">
          <v-icon left>mdi-logout</v-icon>
          Déconnexion</v-btn>
      </div>
      <div v-else class="d-none d-md-flex align center">
        <v-btn text @click="login">
          <v-icon left>mdi-login</v-icon>
          Connexion</v-btn>
      </div>

    </v-app-bar>

    <!-- Navigation Drawer for Mobile -->
    <v-navigation-drawer
      app
      v-model="drawer"
      temporary
      class="d-md-none">
      <!-- Drawer only visible on small screens -->

      <v-list>
        <v-list-item link to="/" exact>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Accueil</v-list-item-title>
        </v-list-item>

        <v-list-item link to="/restaurant">
          <v-list-item-icon>
            <v-icon>mdi-silverware-fork-knife</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Restaurant</v-list-item-title>
        </v-list-item>

        <v-list-item v-if="isLogged" link to="/user">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>

        <!-- Login/Logout in drawer -->
        <v-list-item @click="login" v-if="!isLogged">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Connexion</v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout" v-if="isLogged">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Déconnexion</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      drawer: false, // Drawer state for mobile menu
      searchQuery: "", //SearchQuery state for search bar
      username: "Gordon Ramsay", // Username state for user profile
      isLogged: false // UserIsLogged state for user profile
    };
  },
  methods: {
    login() {
      // Simulates global login
      this.isLogged = true;
      localStorage.setItem('isLogged', true); // Saves login state in localStorage;
      localStorage.setItem('username', this.username); // Saves username in localStorage;
    },
    logout() {
      // Simulates global logout
      this.isLogged = false;
      localStorage.removeItem('isLogged'); // Remove login state from localStorage
      localStorage.removeItem('username'); // Remove username from localStorage
    }
  },
  mounted() {
    // Fetch login state from localStorage
    const loggedIn = localStorage.getItem('isLogged');
    if (loggedIn) {
      this.isLogged = true; // Fetch login state from localStorage
      this.username = localStorage.getItem('username'); // Fetch username from localStorage
    }
  }
};
</script>

<style>

</style>
