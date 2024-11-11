<script setup>
import { useUserService } from '@/composables/useUserService';
import { store } from '@/store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Components
import SearchBar from "@/components/NavBar/SearchBar.vue";
import NavigationDrawer from '@/components/NavBar/NavigationDrawer.vue';

const drawerToggle = ref(false);
const searchQuery = ref("");

const router = useRouter();
const { loginUser } = useUserService();

const toggleDrawer = () => {
  drawerToggle.value = !drawerToggle.value;
};

const login = () => {
  loginUser();
}

const logout = () => {
  localStorage.removeItem("user");
  store.setCurrentUser(null);
  if (router.currentRoute.value.name === "Profile") {
    router.push({ name: "Home" });
  }
}

const goToUserPage = () => {
  router.push({ name: "Profile" });
}

const handleSearch = (searchTerm) => {
  router.push({ name: "Home", query: { search: searchTerm } });
};
</script>

<template>
  <span>
    <v-app-bar color="primary" temporary>
      <!-- Navigation Drawer button for Mobile -->
      <v-app-bar-nav-icon class="d-md-none" @click.stop="toggleDrawer"></v-app-bar-nav-icon>

      <v-toolbar-title>UFood</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="$vuetify.display.mdAndUp" icon="mdi-home" variant="text" to="/" exact :active="false"></v-btn>

      <!-- Search bar: always visible except on home page-->
      <SearchBar v-model="searchQuery" @search="handleSearch" />

      <template v-if="$vuetify.display.mdAndUp">
        <template v-if="store.currentUser">
          <v-btn icon="mdi-account" variant="text" @click="goToUserPage"></v-btn>
          <v-btn icon="mdi-logout" variant="text" @click="logout"></v-btn>
        </template>
        <template v-else>
          <v-btn icon="mdi-login" variant="text" @click="login"></v-btn>
        </template>
      </template>
    </v-app-bar>

    <!-- Navigation Drawer for Mobile -->
    <NavigationDrawer v-model="drawerToggle" @login="login" @logout="logout" />
  </span>
</template>