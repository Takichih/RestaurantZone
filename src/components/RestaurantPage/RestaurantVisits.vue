<script setup>
import { ref, computed } from 'vue';
import * as momentUtils from "@/utils/momentUtils";
import { useStore } from "vuex";

const props = defineProps(["visits", "numberOfPages"]);
const emit = defineEmits(['change-page'])

const currentPage = ref(props.numberOfPages);

const updateChangePage = (page) => {
  currentPage.value = page;
  emit("change-page", page);
}

const vuexStore = useStore();
const isLoggedIn = computed(() => vuexStore.getters.isAuthenticated);

</script>

<template>
  <div v-if="isLoggedIn">
    <v-card v-if="props.visits && props.visits.length" class="text-subtitle-1">
      <v-card-title class="mt-4">Avis des visiteurs</v-card-title>
      <v-divider></v-divider>

      <v-card-item v-for="visit in visits" :key="visit.id" class="visit-card mt-4">
        <v-row class="d-flex align-center" justify="space-between">
          <v-col class="text-start" cols="6">
            <p class="text-body-2">
              {{ visit.user_id }}
            </p>
          </v-col>
          <v-col class="text-end" cols="6">
            <p class="text-body-2 text-grey">
              {{ momentUtils.formatDateForReview(visit.date) }}
            </p>
          </v-col>
        </v-row>

        <v-card-text class="rating">
          <v-row class="mx-0 align-center">
            <v-rating :model-value="visit.rating" color="amber" density="compact" size="small" half-increments readonly>
            </v-rating>

            <span class="text-grey ms-2 mt-1">
              {{ visit.rating }}
            </span>
          </v-row>

          <div class="comment mt-4 text-subtitle-1">
            <p>
              {{ visit.comment }}
            </p>
          </div>
        </v-card-text>
      </v-card-item>
    </v-card>
    <v-pagination v-if="props.numberOfPages > 1" v-model="currentPage" :length="props.numberOfPages" :total-visible="7"
      class="mt-4" @update:modelValue="(e) => updateChangePage(e)"></v-pagination>
  </div>
</template>

<style scoped>
.visit-card {
  background-color: #f0f0f5;
  border-radius: 8px;
  margin: 20px;
}
</style>
