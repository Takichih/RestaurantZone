<script setup>
import Navigation from "@/components/Navigation";
</script>

<template>
  <v-layout>
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
