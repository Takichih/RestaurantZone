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

    <!-- Display favorite lists -->
    <v-accordion>
      <v-accordion-item
        v-for="list in favoriteLists"
        :key="list.id"
        :title="list.name"
      >
        <!-- Edit list name -->
        <v-text-field
          v-model="list.name"
          label="Nom de la liste"
          @blur="updateFavoriteListName(list)"
        ></v-text-field>

        <!-- List restaurants in the favorite list -->
        <v-list>
          <span>{{list.id}}</span>
          <v-list-item
            v-for="restaurant in list.restaurants"
            :key="restaurant.id"
          >
            <v-list-item-content>
              <v-list-item-title>{{ restaurant.name }}</v-list-item-title>
            </v-list-item-content>
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
      </v-accordion-item>
    </v-accordion>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import FavoritesService from "@/api/FavoritesService";
import * as userService from "@/api/UserService";

const favoriteLists = ref([]); // Stores favorite lists of the user
const newListName = ref(""); // Stores the name for a new favorite list
const allRestaurants = ref([]); // Stores all available restaurants for selection
const selectedRestaurant = ref(null); // Stores selected restaurant to add to a list
const userEmail = ref(""); // Store the active user's email
const userID = ref(""); //Store the active user's ID

// Fetch user's favorite lists on component mount
onMounted(async () => {
  await fetchFavoriteLists();
  // await fetchAllRestaurants();
  await fetchActiveUser();
});

// Function to fetch the active user and store the email
const fetchActiveUser = async () => {
  try {
    const user = await userService.getActiveUser();
    userEmail.value = user.email;
    userID.value = user.id;
  } catch (error) {
    console.error("Error fetching active user:", error);
  }
};

// // Function to fetch and filter user's favorite lists
// const fetchFavoriteLists = async () => {
//   try {
//     const response = await FavoritesService.getAllFavorites();
//     // Filter lists to keep only those owned by the active user
//     favoriteLists.value = response.data.items.filter(
//       list => list.owner.id === '6716e7304bffd95d58ab6b40'
//     );
//   } catch (error) {
//     console.error("Error fetching favorite lists:", error);
//   }
// };

// Function to fetch user's favorite lists
const fetchFavoriteLists = async () => {
  try {
    const response = await FavoritesService.getAllFavorites();
    favoriteLists.value = response.data.items;
    console.log("Favorite lists:", favoriteLists.value);
  } catch (error) {
    console.error("Error fetching favorite lists:", error);
  }
};


// // Function to fetch all available restaurants
// const fetchAllRestaurants = async () => {
//   try {
//     const response = await UserService.getUserList(); // Assuming this returns all restaurants
//     allRestaurants.value = response;
//   } catch (error) {
//     console.error("Error fetching restaurants:", error);
//   }
// };

// Function to create a new favorite list
const createFavoriteList = async () => {
  try {
    const response = await FavoritesService.createFavoriteList(
      newListName.value,
      userEmail.value,
    );
    favoriteLists.value.push(response.data); // Add the new list to favoriteLists
    console.log("New list created:", response.data);
    newListName.value = ""; // Reset the input field
  } catch (error) {
    console.error("Error creating favorite list:", error);
  }
};

// Function to update the name of a favorite list
const updateFavoriteListName = async (list) => {
  try {
    await FavoritesService.updateFavoriteList(list.id, list.name);
  } catch (error) {
    console.error("Error updating favorite list name:", error);
  }
};

// Function to add a restaurant to a favorite list
const addRestaurantToList = async (listId, restaurantId) => {
  try {
    await FavoritesService.addRestaurantToFavoriteList(listId, restaurantId);
    fetchFavoriteLists(); // Refresh the list
  } catch (error) {
    console.error("Error adding restaurant to list:", error);
  }
};

// Function to remove a restaurant from a favorite list
const removeRestaurantFromList = async (listId, restaurantId) => {
  try {
    await FavoritesService.removeRestaurantFromFavoriteList(
      listId,
      restaurantId,
    );
    fetchFavoriteLists(); // Refresh the list
  } catch (error) {
    console.error("Error removing restaurant from list:", error);
  }
};

// Function to delete a favorite list
const deleteFavoriteList = async (listId) => {
  try {
    await FavoritesService.deleteFavoriteList(listId);
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
  // Replace this with actual navigation logic, e.g., router.push(...)
  console.log("View restaurant details:", restaurantId);
};
</script>

<style scoped>
/* Scoped styles for the Favorites component */
</style>
