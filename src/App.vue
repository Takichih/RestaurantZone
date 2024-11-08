<script setup>
import Navigation from "@/components/NavBar/Navigation.vue";
import RestaurantVisitModal from "@/components/Modals/RestaurantVisitModal";
</script>

<template>
  <v-layout>
    <RestaurantVisitModal />
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
