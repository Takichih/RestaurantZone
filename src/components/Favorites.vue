<template>
  <div>
    <h2>Mes listes de restaurants favoris</h2>

    <!-- Form to create a new favorite list -->
    <v-form @submit.prevent="createFavoriteList">
      <v-text-field
        v-model="newListName"
        label="Nom de la nouvelle liste de favoris"
        required
      ></v-text-field>
      <v-btn color="primary" type="submit">Créer la liste</v-btn>
    </v-form>

    <v-divider class="my-4"></v-divider>

    <!-- Display favorite lists using Vuetify 3 components -->
    <v-expansion-panels>
      <v-expansion-panel v-for="list in favoriteLists" :key="list.id">
        <!-- Display the list name and ID in the panel header -->
        <v-expansion-panel-title>
          {{ list.name }} (ID: {{ list.id }})
        </v-expansion-panel-title>

        <!-- Panel content for editing and managing restaurants in the list -->
        <v-expansion-panel-text>
          <!-- Edit list name -->
          <v-text-field
            v-model="list.name"
            label="Nom de la liste"
            @blur="updateFavoriteListName(list)"
          ></v-text-field>

          <!-- List restaurants in the favorite list -->
          <v-list>
            <v-list-item
              v-for="restaurant in list.restaurants"
              :key="restaurant.id"
            >
              <v-list-item-title>{{ restaurant.name }}</v-list-item-title>
              <v-list-item-subtitle
                >Score: {{ restaurant.rating }}</v-list-item-subtitle
              >
              <v-list-item-action>
                <v-btn icon @click="viewRestaurantDetails(restaurant.id)">
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
                <v-btn
                  icon
                  @click="removeRestaurantFromList(list.id, restaurant.id)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>

          <!-- Add restaurant to favorite list -->
          <v-select
            v-model="selectedRestaurant"
            :items="allRestaurants"
            label="Ajouter un restaurant"
            item-text="name"
            item-value="id"
            @change="addRestaurantToList(list.id, selectedRestaurant)"
          ></v-select>

          <!-- Button to delete the entire favorite list -->
          <v-btn color="red" @click="deleteFavoriteList(list.id)"
            >Supprimer la liste</v-btn
          >
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import FavoriteService from "@/api/FavoriteService";
import * as userService from "@/api/UserService";

const favoriteLists = ref([]); // Stores favorite lists of the user
const newListName = ref(""); // Stores the name for a new favorite list
const allRestaurants = ref([]); // Stores all available restaurants for selection
const selectedRestaurant = ref(null); // Stores selected restaurant to add to a list
const userID = ref(""); // Store the active user's ID
const userEmail = ref(""); // Store the active user's email

// Fetch user's favorite lists, email, and all available restaurants on component mount
onMounted(async () => {
  await fetchActiveUser();
  await fetchUserFavorites();
  // await fetchAllRestaurants();
});

// Function to fetch the active user and store the ID
const fetchActiveUser = async () => {
  try {
    const user = await userService.getActiveUser();
    userID.value = user.id;
    userEmail.value = user.email;
  } catch (error) {
    console.error("Error fetching active user:", error);
  }
};

// Function to fetch all favorite lists for the active user
const fetchUserFavorites = async () => {
  try {
    const response = await FavoriteService.getUserFavorites(userID.value);
    const lists = response.data.items;

    // Fetch restaurants for each favorite list
    for (const list of lists) {
      const details = await FavoriteService.getFavoriteDetails(list.id);
      list.restaurants = details.data.restaurants;
    }

    favoriteLists.value = lists;
  } catch (error) {
    console.error("Error fetching favorite lists:", error);
  }
};

// // Function to fetch all available restaurants
// const fetchAllRestaurants = async () => {
//   try {
//    const response = await RestaurantService.getAllRestaurants();
//   } catch (error) {
//     console.error("Error fetching restaurants:", error);
//   }
// };

// Function to create a new favorite list
const createFavoriteList = async () => {
  try {
    const response = await FavoriteService.createFavoriteList(
      newListName.value,
      userEmail.value,
    );
    favoriteLists.value.push(response.data); // Add the new list to favoriteLists
    newListName.value = ""; // Reset the input field
  } catch (error) {
    console.error("Error creating favorite list:", error);
  }
};

// Function to update the name of a favorite list
const updateFavoriteListName = async (list) => {
  try {
    await FavoriteService.updateFavoriteList(list.id, list.name);
  } catch (error) {
    console.error("Error updating favorite list name:", error);
  }
};

// Function to add a restaurant to a favorite list
const addRestaurantToList = async (listId, restaurantId) => {
  try {
    await FavoriteService.addRestaurantToFavoriteList(listId, restaurantId);
    fetchUserFavorites(); // Refresh the list
  } catch (error) {
    console.error("Error adding restaurant to list:", error);
  }
};

// Function to remove a restaurant from a favorite list
const removeRestaurantFromList = async (listId, restaurantId) => {
  try {
    await FavoriteService.removeRestaurantFromFavoriteList(
      listId,
      restaurantId,
    );
    fetchUserFavorites(); // Refresh the list
  } catch (error) {
    console.error("Error removing restaurant from list:", error);
  }
};

// Function to delete a favorite list
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

// Function to view restaurant details (redirect to restaurant detail page)
const viewRestaurantDetails = (restaurantId) => {
  // Assuming there's a router to navigate to the restaurant detail page
  console.log("View restaurant details:", restaurantId);
};
</script>

<style scoped>
/* Scoped styles for the Favorites component */
</style>
