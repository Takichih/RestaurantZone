<template>
  <div>
    <h2>Mes listes de restaurants favoris</h2>
    <v-form @submit.prevent="createFavoriteList" ref="form">
      <v-text-field
        v-model="newListName"
        label="Nom de la nouvelle liste de favoris *"
        maxlength="50"
        required
      ></v-text-field>
      <v-btn color="primary" type="submit">Créer la liste</v-btn>
    </v-form>
    <v-divider class="my-4"></v-divider>
    <v-expansion-panels>
      <v-expansion-panel v-for="list in favoriteLists" :key="list.id">
        <v-expansion-panel-title>
          <div
            class="d-flex align-center justify-space-between"
            style="width: 100%"
          >
            <span v-if="!list.isEditing"
              ><strong>{{ list.name }}</strong></span
            >
            <v-text-field
              v-else
              v-model="list.newName"
              label="Renommer la liste"
              dense
              :rules="[nameRequiredRule]"
              maxlength="50"
              required
              hide-details
              style="max-width: 200px"
            ></v-text-field>

            <div class="d-flex align-center">
              <template v-if="list.isEditing">
                <v-btn icon @click="saveListName(list)">
                  <v-icon :disabled="!list.newName.trim()">mdi-check</v-icon>
                </v-btn>
                <v-btn icon @click="cancelEdit(list)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>

              <template v-else>
                <v-btn icon @click="startEdit(list)" color="white">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deleteFavoriteList(list.id)" color="black">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </div>
          </div>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <v-list>
            <v-list-item
              v-for="restaurant in list.restaurants"
              :key="restaurant.id"
            >
              <div
                class="d-flex justify-space-between align-center"
                style="
                  width: 100%;
                  padding: 8px;
                  background-color: #f8f9fa;
                  border-radius: 8px;
                "
              >
                <div class="restaurant-info">
                  <div style="display: flex; align-items: center;">
                     <strong> {{ restaurant.name }} </strong>
                    <v-rating
                      half-increments
                      hover
                      readonly
                      :length="5"
                      :size="32"
                      :model-value="restaurant.rating"
                      active-color="primary"
                      color="grey-lighten-2"
                      style="margin-left: 8px; vertical-align: middle;"
                    />
                  </div>
                </div>
                <div class="d-flex">
                  <v-btn
                    icon
                    @click="viewRestaurantDetails(restaurant.id)"
                    color="info"
                  >
                    <v-icon @click="router.push(`/restaurant/${restaurant.id}`)">mdi-eye</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="removeRestaurantFromList(list.id, restaurant.id)"
                    color="error"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-list-item>
          </v-list>
          <v-select
            v-model="selectedRestaurant"
            :items="allRestaurants"
            item-title="name"
            item-value="id"
            label="Select"
          ></v-select>
          <v-btn color="primary" @click="addSelectedRestaurantToList(list.id)">
            <v-icon>mdi-plus</v-icon> Ajouter
          </v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import FavoriteService from "@/api/FavoriteService";
import * as userService from "@/api/UserService";
import RestaurantService from "@/api/RestaurantService";
import { useRouter } from "vue-router";

const router = useRouter();
const favoriteLists = ref([]);
const newListName = ref("");
const allRestaurants = ref([]);
const selectedRestaurant = ref(null);
const userID = ref("");
const userEmail = ref("");
const form = ref(null);
const nameRequiredRule = (value) =>
  !!value || "Veuillez entrer un nom pour la liste";
onMounted(async () => {
  await fetchActiveUser();
  await fetchUserFavorites();
  await fetchAllRestaurants();
});
const startEdit = (list) => {
  list.isEditing = true;
  list.newName = list.name;
};
const saveListName = async (list) => {
  if (!list.newName.trim()) {
    list.isEditing = false;
    return;
  }
  const isDuplicate = favoriteLists.value.some(
    (favorite) =>
      favorite.name.toLowerCase() === list.newName.trim().toLowerCase() &&
      favorite.id !== list.id,
  );

  if (isDuplicate) {
    console.warn("Une liste avec ce nom existe déjà.");
    alert(
      "Une liste avec ce nom existe déjà. Veuillez choisir un nom différent.",
    );
    return;
  }

  try {
    await FavoriteService.updateFavoriteList(list.id, list.newName);
    list.name = list.newName;
    list.isEditing = false;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du nom de la liste :", error);
  }
};
const cancelEdit = (list) => {
  list.isEditing = false;
  list.newName = ""; // Clear the input
};
const fetchActiveUser = async () => {
  try {
    const user = await userService.getActiveUser();
    userID.value = user.id;
    userEmail.value = user.email;
  } catch (error) {
    console.error("Error fetching active user:", error);
  }
};
const fetchUserFavorites = async () => {
  try {
    const response = await FavoriteService.getUserFavorites(userID.value);
    const lists = response.data.items;

    for (const list of lists) {
      list.restaurants = await Promise.all(
        list.restaurants.map(async (restaurant) => {
          const detailsResponse = await RestaurantService.getRestaurant(
            restaurant.id,
          );
          return detailsResponse;
        }),
      );
    }
    favoriteLists.value = lists;
  } catch (error) {
    console.error("Error fetching favorite lists:", error);
  }
};
const fetchAllRestaurants = async () => {
  try {
    const response = await RestaurantService.getRestaurants();
    // Use a temporary variable to store filtered and mapped data
    const filteredRestaurants = response
      .filter((restaurant) => restaurant.name && restaurant.id)
      .map((restaurant) => ({
        name: restaurant.name,
        id: restaurant.id,
      }));
    // Assign the processed data to the reactive allRestaurants array
    allRestaurants.value = filteredRestaurants;
  } catch (error) {
    console.error("Erreur lors de la récupération des restaurants :", error);
  }
};
const createFavoriteList = async () => {
  if (!newListName.value.trim()) {
    alert("Veuillez entrer un nom valide");
    return;
  }
  const isDuplicate = favoriteLists.value.some(
    (list) =>
      list.name.toLowerCase() === newListName.value.trim().toLowerCase(),
  );
  if (isDuplicate) {
    console.error("Une liste avec ce nom existe déjà.");
    alert(
      "Veuillez choisir un nom différent. Une liste avec ce nom existe déjà.",
    );
    return;
  }
  const isValid = await form.value.validate();
  if (!isValid) {
    console.warn("Form validation failed.");
    return;
  }
  try {
    const response = await FavoriteService.createFavoriteList(
      newListName.value,
      userEmail.value,
    );
    favoriteLists.value.push(response.data);
    newListName.value = "";
    form.value.resetValidation();
  } catch (error) {
    console.error("Erreur lors de la création de la liste de favoris :", error);
  }
};

const addSelectedRestaurantToList = async (favoriteId) => {
  if (!selectedRestaurant.value || !favoriteId) {
    alert("Veuillez selectionner un restaurant de la liste");
    return;
  }
  const favoriteList = favoriteLists.value.find(
    (list) => list.id === favoriteId,
  );
  if (!favoriteList) {
    console.error("Liste de favoris non trouvée");
    return;
  }
  const restaurantExists = favoriteList.restaurants.some(
    (restaurant) => restaurant.id === selectedRestaurant.value,
  );

  if (restaurantExists) {
    alert("Le restaurant est déjà dans la liste des favoris.");
    return;
  }

  try {
    await FavoriteService.addRestaurantToFavoriteList(
      favoriteId,
      selectedRestaurant.value,
    );
    await fetchUserFavorites();
    selectedRestaurant.value = null;
    console.log("Restaurant ajouté à la liste des favoris avec succès.");
  } catch (error) {
    console.error("Erreur lors de l'ajout du restaurant à la liste :", error);
  }
};
const removeRestaurantFromList = async (favoriteId, restaurantId) => {
  try {
    await FavoriteService.removeRestaurantFromFavoriteList(
      favoriteId,
      restaurantId,
    );
    fetchUserFavorites(); // Refresh the list
  } catch (error) {
    console.error("Error removing restaurant from list:", error);
  }
};
const deleteFavoriteList = async (listId) => {
  try {
    await FavoriteService.deleteFavoriteList(listId);
    favoriteLists.value = favoriteLists.value.filter(
      (list) => list.id !== listId,
    ); // Remove from local list
  } catch (error) {
    console.error("Error deleting favorite list:", error);
  }
};
const viewRestaurantDetails = (restaurantId) => {
  // Assuming there's a router to navigate to the restaurant detail page
  console.log("View restaurant details:", restaurantId);
};
</script>

<style scoped></style>
