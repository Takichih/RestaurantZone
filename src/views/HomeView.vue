<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import RestaurantList from "@/components/HomePage/RestaurantList.vue";
import ModeMap from "@/components/HomePage/ModeMap.vue";
const tab = ref("one");
const route = useRoute();
const search = ref(route.query.search || "");

onMounted(() => {
  search.value = route.query.search || "";
});
</script>

<template>
  <v-card>
    <v-tabs
      v-model="tab"
      align-tabs="center"
      bg-color="primary"
    >
      <v-tab :value="one">Liste de restaurants</v-tab>
      <v-tab :value="two">Mode Map</v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
          <RestaurantList :initialSearch="search" />
        </v-tabs-window-item>
        <v-tabs-window-item value="two">
          <ModeMap/>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>
