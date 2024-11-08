<template>
  <v-navigation-drawer app v-model="localDrawer" temporary class="d-md-none">
    <!-- Drawer visible only on small screen -->

    <v-list>
      <v-list-item v-if="isLogged" id="userNameDrawer">
        <span class="mr-4">{{ username }}</span>
      </v-list-item>

      <v-list-item link to="/" exact>
        <v-icon>mdi-home</v-icon>
        <v-list-item-title>Accueil</v-list-item-title>
      </v-list-item>

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

const localDrawer = ref(props.drawer);

watch(
  () => props.drawer,
  (newVal) => {
    localDrawer.value = newVal;
  },
);

watch(localDrawer, (newVal) => {
  emit("update:drawer", newVal);
});

function handleLogin() {
  emit("login");
}

function handleLogout() {
  emit("logout");
}
</script>

<style scoped>
#userNameDrawer {
  font-weight: bold;
}
</style>
