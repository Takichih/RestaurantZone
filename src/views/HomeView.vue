<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import RestaurantList from "@/components/HomePage/RestaurantList.vue";

const route = useRoute();
const search = ref(route.query.search || "");

onMounted(() => {
  search.value = route.query.search || "";
});
</script>

<template>
  <div>
    <RestaurantList :initialSearch="search" />
  </div>
</template>
