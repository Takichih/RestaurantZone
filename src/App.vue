<script setup>
import FavoritesDialog from "./components/FavoritesDialog.vue";
import Navigation from "@/components/Navigation";
</script>

<template>
  <v-layout>
    <FavoritesDialog />
    <Navigation />

    <v-main>
      <v-container fluid>
        <Suspense>
          <template #default>
            <router-view></router-view>
          </template>
          <template #fallback>
            <div class="text-center">
              <v-progress-circular color="primary" indeterminate></v-progress-circular>
            </div>
          </template>
        </Suspense>
      </v-container>
    </v-main>
  </v-layout>
</template>
