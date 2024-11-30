<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthService } from '@/composables/useAuthService';

// Components
import SearchBar from "@/components/NavBar/SearchBar.vue";
import NavigationDrawer from '@/components/NavBar/NavigationDrawer.vue';
import gravatarService from '@/api/gravatarService';
import { useStore } from 'vuex';

const store = useStore();
const drawerToggle = ref(false);
const searchQuery = ref("");
const router = useRouter();
const isLoggedIn = computed(() => store.getters.isAuthenticated);
const currentUser = computed(() => store.getters.getCurrentUser);

const toggleDrawer = () => {
  drawerToggle.value = !drawerToggle.value;
};

const goToUserPage = () => {
  router.push({ name: "Profile" });
}

const handleSearch = (searchTerm) => {
  router.push({ name: "Home", query: { search: searchTerm } });
};

const getGravatarUrl = (email) => {
  return gravatarService.getGravatarUrl(email);
};

const { logout } = useAuthService();

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
        <template v-if="isLoggedIn">
           <v-btn icon="mdi-account-multiple" variant="text" to="/users"></v-btn>
          <v-btn class="v-btn--icon v-btn--text" @click="goToUserPage">
            <v-avatar>
              <v-img :src="getGravatarUrl(currentUser.email)" alt="User Avatar" />
            </v-avatar>
          </v-btn>

          <v-btn icon="mdi-logout" variant="text" @click="logout"></v-btn>
        </template>
        <template v-else>
          <v-btn icon="mdi-login" variant="text" to="/login"></v-btn>
        </template>
      </template>
    </v-app-bar>

    <!-- Navigation Drawer for Mobile -->
    <NavigationDrawer v-model="drawerToggle" @logout="logout" />
  </span>
</template>
