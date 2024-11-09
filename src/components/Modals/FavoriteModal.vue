<script setup>
import { ref, onMounted } from 'vue';
import FavoriteService from '@/api/FavoriteService';
import * as userService from "@/api/UserService";
import { VListItemTitle } from 'vuetify/components';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  restaurantId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['close', 'add-to-favorites', 'update:isOpen']);

const selectedList = ref(null);
const favoriteLists = ref([]);

const close = () => {
  emit('close');
  emit('update:isOpen', false);
};

const addToFavorites = () => {
  emit('add-to-favorites', { restaurantId: props.restaurantId, listId: selectedList.value });
  close();
};

const updateIsOpen = (value) => {
  emit('update:isOpen', value);
};

const fetchFavoriteLists = async () => {
  try {
    const user = await userService.getActiveUser();
    const response = await FavoriteService.getUserFavorites(user.id);
    favoriteLists.value = response.data.items.map(item => ({
      listId: item.id,
      listName: item.name || 'Unnamed List'
    }));
  } catch (error) {
    console.error("Error fetching favorite lists:", error);
  }
};

onMounted(() => {
  fetchFavoriteLists();
});
</script>

<template>
  <v-dialog :model-value="isOpen" @update:model-value="updateIsOpen" max-width="500px">
    <v-card>
      <v-card-title class="headline">Ajouter aux favoris</v-card-title>
      <v-card-text>
        <v-select
          v-model="selectedList"
          :items="favoriteLists"
          label="Sélectionner la liste de favoris"
          :item-text="listName"
          :item-value="listId"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="addToFavorites">Ajouter</v-btn>
        <v-btn text @click="close">Annuler</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>



<style scoped>

</style>
