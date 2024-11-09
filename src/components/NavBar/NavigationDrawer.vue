<script setup>
import { ref, defineProps, defineEmits, watch, onMounted } from "vue";

const props = defineProps({
  drawer: Boolean,
  isLogged: Boolean,
  username: String,
});

const emit = defineEmits(["update:drawer", "login", "logout"]);

const localDrawer = ref(props.drawer);

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
</script>

<template>
  <v-navigation-drawer app v-model="localDrawer" temporary class="d-md-none">
    <v-list>
      <v-list-item v-if="props.isLogged" id="userNameDrawer">
        <span class="mr-4">{{ props.username }}</span>
      </v-list-item>

      <v-list-item link to="/" exact>
        <v-icon>mdi-home</v-icon>
        <v-list-item-title>Accueil</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="props.isLogged" link to="/user">
        <v-icon>mdi-account</v-icon>
        <v-list-item-title>Profil</v-list-item-title>
      </v-list-item>

      <v-list-item @click="login" v-if="!props.isLogged">
        <v-icon>mdi-login</v-icon>
        <v-list-item-title>Connexion</v-list-item-title>
      </v-list-item>

      <v-list-item @click="logout" v-if="props.isLogged">
        <v-icon>mdi-logout</v-icon>
        <v-list-item-title>Déconnexion</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
#userNameDrawer {
  font-weight: bold;
}
</style>
