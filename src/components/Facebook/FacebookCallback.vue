<!--Callback impossible de localhost-->

<script setup>
import { store } from "@/store";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");

  if (token) {
    // Simulez une requête pour récupérer les infos de l'utilisateur
    FB.api("/me", { fields: "name,email" }, (response) => {
      if (response && !response.error) {
        // Sauvegarder les infos dans le store
        store.setFacebookAuth({ token, name: response.name, email: response.email });

        // Rediriger vers la page principale ou tableau de bord
        router.push("/");
      } else {
        alert("Erreur lors de la récupération des informations utilisateur.");
      }
    });
  } else {
    alert("Jeton Facebook manquant !");
    router.push("/");
  }
});
</script>


<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6" class="text-center">
          <v-card>
            <v-card-title>
              Connexion Facebook
            </v-card-title>
            <v-card-text>
              <p v-if="loading">Chargement...</p>
              <p v-else-if="error">{{ error }}</p>
              <p v-else>
                Bienvenue, {{ fbUserName }} !<br />
                Votre email : {{ fbUserEmail }}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn v-if="!error" color="primary" to="/">
                Retour à l'accueil
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>



<style scoped>
.text-center {
  text-align: center;
}
</style>
