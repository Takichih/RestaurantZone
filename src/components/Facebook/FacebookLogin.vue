<script setup>
import { useFacebookAuth } from "@/composables/useFacebookAuth";
import { computed } from "vue";
import { store } from "@/store";

const { loginWithFacebook, logoutFromFacebook } = useFacebookAuth();

const handleFacebookLogin = async () => {
  try {
    await loginWithFacebook();
    alert("Connexion réussie avec Facebook !");
  } catch (error) {
    console.error("Erreur lors de la connexion avec Facebook :", error);
    alert("Une erreur s'est produite lors de la connexion avec Facebook.");
  }
};

const handleFacebookLogout = async () => {
  try {
    await logoutFromFacebook();
    alert("Déconnexion réussie de Facebook !");
  } catch (error) {
    console.error("Erreur lors de la déconnexion de Facebook :", error);
    alert("Une erreur s'est produite lors de la déconnexion de Facebook.");
  }
};

const isLoggedIn = computed(() => !!store.fbToken);
const fbUserName = computed(() => store.fbUserName);
const fbUserEmail = computed(() => store.fbUserEmail);
</script>

<template>
  <div>
    <v-app>
      <v-btn v-if="!isLoggedIn" @click="handleFacebookLogin" color="blue">
        <v-icon left>mdi-facebook</v-icon>
        Connexion avec Facebook
      </v-btn>

      <v-btn v-else @click="handleFacebookLogout" color="red">
        Déconnexion de Facebook
      </v-btn>

      <div v-if="isLoggedIn">
        <p>Connecté en tant que : {{ fbUserName }}</p>
        <p>Email : {{ fbUserEmail }}</p>
      </div>
    </v-app>
  </div>
</template>
