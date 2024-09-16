<template>
  <v-app>
    <!-- App Bar is handled by the Navigation component -->
    <nav-menu></nav-menu>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation";
export default {
  name: "app",
  components: {
    "nav-menu": Navigation,
  },
};
</script>

<style></style>
