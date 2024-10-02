<template>
  <v-layout>
    <Navigation></Navigation>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import Navigation from "@/components/Navigation";
</script>
