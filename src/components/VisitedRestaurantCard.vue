<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";
import VisitService from "@/api/VisitService";

const props = defineProps({
  name: String,
  rating: Number,
  visits: Number,
  isFavorite: Boolean,
  restaurant_id: String,
});

const emit = defineEmits(["toggle-favorite", "delete-restaurant"]);

const showVisitDetails = ref(false);
const visitDetails = ref([]);

// Function to toggle favorite status
function toggleFavorite() {
  emit("toggle-favorite", props.restaurant_id);
}

// Function to fetch visit details for the restaurant
const fetchVisitDetails = async () => {
  try {
    const userId = localStorage.getItem("userID");
    const response = await VisitService.getVisitsForRestaurant(
      userId,
      props.restaurant_id,
    );
    visitDetails.value = response.data.items;
  } catch (error) {
    console.error("Error fetching visit details:", error);
  }
};

// Function to toggle visibility of visit details and fetch if not already fetched
function toggleVisitDetails() {
  showVisitDetails.value = !showVisitDetails.value;
  if (showVisitDetails.value && visitDetails.value.length === 0) {
    fetchVisitDetails();
  }
}

// Show an alert when a visit is clicked
function showVisitAlert(restaurantId) {
  alert(
    `Ouverture de la modale pour restaurant : ${props.name}, Id : ${restaurantId}`,
  );
}
</script>

<template>
  <v-card>
    <v-card-title>{{ name }}</v-card-title>
    <v-card-subtitle>Score: {{ rating }}</v-card-subtitle>
    <v-card-text>Nombre de visites: {{ visits }}</v-card-text>
    <v-card-actions>
      <v-btn icon @click="$emit('delete-restaurant', restaurant_id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleVisitDetails">
        <v-icon>{{
          showVisitDetails ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon>
      </v-btn>
    </v-card-actions>

    <!-- Expandable section for visit details -->
    <v-expand-transition>
      <div v-if="showVisitDetails" class="visit-details">
        <v-list>
          <v-list-item
            v-for="(visit, index) in visitDetails"
            :key="index"
            @click="showVisitAlert(visit.restaurant_id)"
          >
            <v-list-item-content>
              <v-list-item-title>Date: {{ visit.date }}</v-list-item-title>
              <v-list-item-subtitle
                >Comment: {{ visit.comment }}</v-list-item-subtitle
              >
              <v-list-item-subtitle
                >Rating: {{ visit.rating }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style scoped>
.visit-details {
  padding: 10px;
  border-top: 1px solid #e0e0e0;
}
</style>
