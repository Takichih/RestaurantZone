<script setup>
import * as momentUtils from "@/utils/momentUtils";

const props = defineProps(["visits", "hasMoreVisits"]);
const emit = defineEmits(["loadMoreVisits"]);
</script>

<template>
  <v-card v-if="visits && visits.length" class="text-subtitle-1">
    <v-card-title class="mt-4">Avis des visiteurs</v-card-title>
    <v-divider></v-divider>

    <v-card-item
      v-for="visit in visits"
      :key="visit.id"
      class="visit-card mt-4"
    >
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
          <v-rating
            :model-value="visit.rating"
            color="amber"
            density="compact"
            size="small"
            half-increments
            readonly
          >
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
    <v-card-actions v-if="hasMoreVisits" class="justify-center">
      <v-btn variant="outlined" color="primary" @click="emit('loadMoreVisits')">
        Charger plus d'avis
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.visit-card {
  background-color: #f0f0f5;
  border-radius: 8px;
  margin: 20px;
}
</style>
