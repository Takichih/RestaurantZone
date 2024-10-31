<script setup>
import { store } from '@/store';

const addRestaurantToList = (favoritesListId) => {
  console.log(favoritesListId);
}
</script>

<template>
  <v-dialog v-model="store.favoritesModalOpen" max-width="500">
    <v-card>
      <v-card-title>Listes de favoris</v-card-title>

      <v-list>
        <v-list-item v-for="(item, i) in store.currentUserFavorites.items" :key="i">
          <template v-slot:prepend>
            <v-list-item-action start>
              <v-checkbox-btn
                :model-value="item.restaurants.find(x => x.id === store.restaurantIdToAddToFavorites)"></v-checkbox-btn>
            </v-list-item-action>
          </template>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" color="primary" @click="store.setFavoritesModalOpen(false)">
          <v-icon icon="mdi-close" />
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>