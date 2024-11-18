<script setup>
import { store } from "@/store";
import { ref, defineProps, defineEmits, watch, onMounted} from "vue";
import {router} from "@/router";
import gravatarService from "@/api/gravatarService";

const props = defineProps({
  drawerToggle: Boolean,
  isLogged: Boolean,
  username: String,
});

const emit = defineEmits(["update:drawer", "login", "logout"]);

const localDrawer = ref(props.drawerToggle);

watch(localDrawer, (newVal) => {
  emit("update:drawer", newVal);
});

const login = () => {
  emit("login");
};

const logout = () => {
  emit("logout");
};

onMounted(() => {
  const loggedIn = localStorage.getItem("isLogged");
  if (loggedIn) {
    emit("login");
  }
});
const goToUserPage = () => {
  router.push({ name: "Profile" });
}
const getGravatarUrl = (email) => {
  return gravatarService.getGravatarUrl(email);
};
</script>

<template>
  <v-navigation-drawer v-model="localDrawer" class="d-md-none">
    <v-list>

      <v-list-item v-if="store.currentUser" id="userNameDrawer">
        <v-avatar class="user-avatar">
          <img :src="getGravatarUrl(store.currentUser.email)" alt="User Avatar">
        </v-avatar>
        <span class="mr-4">{{ store.currentUser.name }}</span>
      </v-list-item>

      <v-list-item link to="/" exact>
        <v-icon>mdi-home</v-icon>
        <v-list-item-title>Accueil</v-list-item-title>
      </v-list-item>

      <template v-if="store.currentUser">
        <v-list-item link to="/profile">
          <v-icon>mdi-account</v-icon>
          <v-list-item-title>Profil</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-icon>mdi-logout</v-icon>
          <v-list-item-title>Déconnexion</v-list-item-title>
        </v-list-item>
      </template>
      <template v-else>
        <v-list-item @click="login">
          <v-icon>mdi-login</v-icon>
          <v-list-item-title>Connexion</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
#userNameDrawer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
  font-weight: bold;
  font-size: 1.2em;
}

.user-avatar {
  margin-right: 8px;
}

</style>
