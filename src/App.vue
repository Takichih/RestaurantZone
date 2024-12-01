<script setup>
import { onBeforeMount } from "vue";
import { store } from "./store";

// Components
import NavBar from "@/components/NavBar/NavBar.vue";
import RestaurantVisitModal from "@/components/Modals/RestaurantVisitModal";
import SuspenseSpinner from "./components/SuspenseSpinner.vue";

onBeforeMount(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (user) store.setCurrentUser(user);
})
</script>

<template>
  <Suspense>
    <template #default>
      <v-layout>
        <!-- NavBar -->
        <NavBar />
        <!-- /NavBar -->

        <!-- Modals -->
        <RestaurantVisitModal />
        <!-- /Modals -->

        <!-- Main Content -->
        <v-main>
          <v-container fluid>
            <router-view :key="$route.fullPath"></router-view>
          </v-container>
        </v-main>
      </v-layout>
    </template>
    <!-- /Main Content -->
    <template #fallback>
      <v-layout>
        <SuspenseSpinner />
      </v-layout>
    </template>
  </Suspense>
</template>
