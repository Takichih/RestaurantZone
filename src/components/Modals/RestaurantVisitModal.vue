<script setup>
import { ref } from "vue";
import { store } from "@/store";
import * as momentUtils from "@/utils/momentUtils";
import VisitService from "@/api/VisitService";

// Values
const visitForm = ref();
const comment = ref("");
const rating = ref(0);
const selectedDate = ref(new Date());

// Rules
const ratingRules = [
  (v) => !!v || "Une note doit être donnée.",
  (v) =>
    v <= 5 ||
    v >= 0 ||
    "La note ne peut pas être plus basse que 0 ou plus haute que 5.",
];

const postVisit = async () => {
  const isFormValid = await visitForm.value.validate().then((formValidity) => {
    return formValidity.valid;
  });

  if (isFormValid) {
    const visitData = {
      restaurant_id: store.currentAddingVisitRestaurantId,
      comment: comment.value,
      rating: rating.value,
      date: momentUtils.formatDateForAPIPost(selectedDate.value),
    };

    await VisitService.createVisit(store.currentUser.id, visitData).then(() => {
      store.handleVisitSubmittedFunction(visitData);
      closeVisitModal();
    });
  }
};

const closeVisitModal = () => {
  comment.value = "";
  rating.value = "";
  selectedDate.value = new Date();

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
      <v-form ref="visitForm" @submit.prevent="postVisit">
        <v-card-title>Votre visite</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">
          <v-row class="d-flex align-center justify-center flex-column">
            Note donnée
            <v-input v-model="rating" :rules="ratingRules">
              <v-rating
                half-increments
                hover
                :length="5"
                :size="30"
                v-model="rating"
                active-color="warning"
              />
            </v-input>
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
          <v-btn type="submit" variant="tonal">Soumettre</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
