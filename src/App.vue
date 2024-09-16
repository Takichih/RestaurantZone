<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-toolbar-title>UFood</v-toolbar-title>
      <nav-menu></nav-menu>
    </v-app-bar>

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
