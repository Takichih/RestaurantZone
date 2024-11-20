<script setup>
import { useAuthService } from '@/composables/useAuthService';
import { ref } from 'vue';

const visible = ref(false);
const loginForm = ref();
const email = ref("");
const password = ref("");

const { login } = useAuthService();
</script>

<template>
  <v-form ref="loginForm" @submit.prevent="login(email, password)">
    <v-card class="mx-auto my-12 pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">Courriel</div>

      <v-text-field v-model="email" density="compact" placeholder="Courriel" prepend-inner-icon="mdi-email-outline"
        variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Mot de passe
      </div>

      <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'" density="compact" placeholder="Entrez votre mot de passe"
        prepend-inner-icon="mdi-lock-outline" variant="outlined"
        @click:append-inner="visible = !visible"></v-text-field>

      <v-btn type="submit" class="mb-8" color="blue" size="large" variant="tonal" block>
        Se connecter
      </v-btn>

      <v-card-text class="text-center">
        <v-btn class="text-blue text-decoration-none">
          S'inscrire <v-icon icon="mdi-chevron-right"></v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<style></style>