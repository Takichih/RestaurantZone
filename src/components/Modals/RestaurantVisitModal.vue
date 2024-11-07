<script setup>
import { ref } from "vue";
import { store } from "@/store";
import * as momentUtils from "@/utils/momentUtils";
import VisitService from "@/api/VisitService";

const comment = ref("");
const rating = ref(0);
const selectedDate = ref(new Date());

const postVisit = async () => {
  if (rating.value > 5 || rating.value < 0) {
    alert("Entrez une note entre 0 et 5 s'il vous plait");
  }
  if (rating.value != null && rating.value <= 5 && rating.value >= 0) {
    const visitData = {
      restaurant_id: store.currentAddingVisitRestaurantId,
      comment: comment.value,
      rating: parseFloat(rating.value),
      date: momentUtils.formatDateForAPIPost(selectedDate.value),
    };

    await VisitService.createVisit(store.currentUser.id, visitData);
  }
};

const closeVisitModal = () => {
  console.log("closing modal");
  store.setCurrentAddingVisitRestaurantId("");
  store.setCurrentAddingVisitRestaurantVisits([]);
  store.setVisitModalOpen(false);
};
</script>

<template>
  <v-dialog
    v-model="store.visitModalOpen"
    max-width="500"
    @click:outside="closeVisitModal"
  >
    <v-card>
      <v-card-title>Votre visite</v-card-title>
      <v-card-text>
        <v-row class="d-flex align-center justify-center flex-column">
          Note donnée
          <v-rating
            half-increments
            hover
            :length="5"
            :size="30"
            v-model="rating"
            active-color="warning"
          />
        </v-row>
        <v-row dense>
          <v-col class="mt-4">
            <v-date-input
              v-model="selectedDate"
              prepend-icon=""
              prepend-inner-icon="$calendar"
              label=" Date de la visite"
            ></v-date-input>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-textarea v-model="comment" label="Commentaire"></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="closeVisitModal">Annuler</v-btn>
        <v-btn variant="tonal" @click="postVisit">Soumettre</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
