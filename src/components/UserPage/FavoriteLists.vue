<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(["userFavoriteLists"]);
const router = useRouter();
const newListForm = ref();

const nameRequiredRule = (v) =>
  !!v || "Veuillez entrer un nom pour la liste";

const viewRestaurantDetails = (restaurantId) => {
  router.push(`/restaurant/${restaurantId}`)
};
</script>

<template>
  <div>
    <h2>Mes listes de restaurants favoris</h2>
    <v-form ref="newListForm">
      <v-text-field v-model="newListName" label="Nom de la nouvelle liste de favoris *" maxlength="50"
        required></v-text-field>
      <v-btn color="primary" type="submit">Créer la liste</v-btn>
    </v-form>
    <v-divider class="my-4"></v-divider>
    <v-expansion-panels>
      <v-expansion-panel v-for="(favoriteList, index) in props.userFavoriteLists" :key="index">
        <v-expansion-panel-title>
          <div class="d-flex align-center justify-space-between" style="width: 100%">
            <span v-if="!favoriteList.isEditing"><strong>{{ favoriteList.name }}</strong></span>
            <v-text-field v-else v-model="favoriteList.newName" label="Renommer la liste" dense
              :rules="[nameRequiredRule]" maxlength="50" required hide-details style="max-width: 200px"></v-text-field>

            <div class="d-flex align-center">
              <template v-if="favoriteList.isEditing">
                <v-btn icon @click="saveListName(favoriteList)">
                  <v-icon :disabled="!favoriteList.newName.trim()">mdi-check</v-icon>
                </v-btn>
                <v-btn icon @click="cancelEdit(favoriteList)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>

              <template v-else>
                <v-btn icon @click="startEdit(favoriteList)" color="white">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deleteFavoriteList(favoriteList.id)" color="black">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </div>
          </div>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <v-list>
            <v-list-item v-for="restaurant in favoriteList.restaurants" :key="restaurant.id">
              <div class="d-flex justify-space-between align-center" style="
                  width: 100%;
                  padding: 8px;
                  background-color: #f8f9fa;
                  border-radius: 8px;
                ">
                <div class="restaurant-info">
                  <div style="display: flex; align-items: center">
                    <strong> {{ restaurant.name }} </strong>
                    <v-rating half-increments hover readonly :length="5" :size="32" :model-value="restaurant.rating"
                      active-color="primary" color="grey-lighten-2" style="margin-left: 8px; vertical-align: middle" />
                  </div>
                </div>
                <div class="d-flex">
                  <v-btn icon @click="viewRestaurantDetails(restaurant.id)" color="info">
                    <v-icon @click="router.push(`/restaurant/${restaurant.id}`)">mdi-eye</v-icon>
                  </v-btn>
                  <v-btn icon @click="removeRestaurantFromList(list.id, restaurant.id)" color="error">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-list-item>
          </v-list>
          <!--
          <v-select v-model="selectedRestaurant" :items="allRestaurants" item-title="name" item-value="id"
            label="Select"></v-select>
          <v-btn color="primary" @click="addSelectedRestaurantToList(list.id)">
            <v-icon>mdi-plus</v-icon> Ajouter
          </v-btn>
          -->
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style scoped></style>
