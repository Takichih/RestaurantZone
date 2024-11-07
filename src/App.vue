<script setup>
import Navigation from "@/components/Navigation";
import ModaleVisite from "@/components/Modals/RestaurantVisitModal.vue";
</script>

<template>
  <v-layout>
    <ModaleVisite />
    <Navigation />

    <v-main>
      <v-container fluid>
        <Suspense>
          <template #default>
            <router-view></router-view>
          </template>
        </Suspense>
      </v-container>
    </v-main>
  </v-layout>
</template>
