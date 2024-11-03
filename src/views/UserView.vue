<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <h4 class="text-left">Nom:</h4>
          <v-card>
            <h3 class="name">{{ userName }}</h3>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <h4 class="text-left">ID:</h4>
          <v-card>
            <h3 class="name">{{ userID }}</h3>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h3 class="text-left">Score:</h3>
        </v-col>
      </v-row>
      <v-sheet
        class="d-flex align-center px-4 py-8 mx-auto"
        color="#FFFFFF"
        max-width=""
        rounded="lg"
      >
        <v-progress-linear
          :location="null"
          bg-color="#7e7e7e"
          buffer-color="#2196F3"
          buffer-opacity="1"
          buffer-value="3"
          color="#4CAF50"
          height="15"
          max="4"
          min="0"
          :model-value="userRating"
          rounded
        ></v-progress-linear>

        <div class="ms-4 text-h6">{{ userRating }}/100</div>
      </v-sheet>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h3 class="text-left">Restaurants visités récemment:</h3>
        </v-col>
      </v-row>
      <v-row>
        <!-- Show a button to return to the homepage if no restaurants were visited -->
        <template v-if="visitedRestaurants.length === 0">
          <v-col cols="12">
            <v-btn color="primary" @click="goHome"> Accueil </v-btn>
          </v-col>
        </template>
        <!-- Show cards for each visited restaurant if available -->
        <template v-else>
          <!-- Use v-col with 6-column width per card, for two cards per row -->
          <v-col
            cols="12"
            md="3"
            v-for="(restaurant, index) in visitedRestaurants"
            :key="restaurant.name"
          >
            <v-card>
              <v-card-title>{{ restaurant.name }}</v-card-title>
              <v-card-subtitle>
                Score: {{ restaurant.rating }}
              </v-card-subtitle>
              <v-card-text>
                Nombre de visites: {{ restaurant.visits }}
              </v-card-text>
              <v-card-actions>
                <v-btn id="heart" icon @click="addToFavorites(index)">
                  <v-icon>{{
                    restaurant.isFavorite ? "mdi-heart" : "mdi-heart-outline"
                  }}</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="deleteRestaurant(restaurant.name)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-container>
    <Favorites />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import * as userService from "@/api/UserService";
import Favorites from "@/components/Favorites.vue";
import { useRouter } from "vue-router";
import FavoriteService from "@/api/FavoriteService";

// Define user data references
const userName = ref(null);
const userID = ref(null);
const userEmail = ref(null);
const userRating = ref(0);

// List of restaurants visited
const restaurants = ref([
  { id: "1", name: "Chez Wong", rating: 4.5, visits: 4 },
  { id: "2", name: "Nina Pizza Napolitaine", rating: 4.2, visits: 2 },
  { id: "3", name: "L'Ostrea", rating: 3.8, visits: 6 },
  { id: "4", name: "Le Champlain", rating: 4.0, visits: 5 },
]);

const router = useRouter();
//j'ajoute une fonction goHome
function goHome() {
  router.push("/");
}

// Computed property to filter visited restaurants
const visitedRestaurants = computed(() =>
  restaurants.value.filter((restaurant) => restaurant.visits > 0),
);

// Function to add or remove a restaurant from favorites
const addToFavorites = async (index) => {
  const restaurant = restaurants.value[index];
  const favoriteId = "672686c5242806c2468d2d94";

  try {
    if (restaurant.isFavorite) {
      await FavoriteService.removeRestaurantFromFavoriteList(
        favoriteId,
        restaurant.id,
      );
      restaurant.isFavorite = false;

      console.log(`Removed ${restaurant.name} from favorites`);
    } else {
      await FavoriteService.addRestaurantToFavoriteList(
        favoriteId,
        restaurant.id,
      );
      restaurant.isFavorite = true;
      console.log(`Added ${restaurant.name} to favorites`);
    }
    await fetchUserFavorites();
  } catch (error) {
    console.error("Error adding restaurant to favorites:", error);
  }
};

// Function to delete a restaurant from the visited list
function deleteRestaurant(name) {
  console.log(`Deleting ${name}`);
  restaurants.value = restaurants.value.filter(
    (restaurant) => restaurant.name !== name,
  );
}

// Fetch user information when the component is mounted
onMounted(async () => {
  console.log(
    "Import User services : " + (await userService.testUserService()),
  );
  await userService.getUserList();
  try {
    const user = await userService.getActiveUser();
    userName.value = user.name;
    userID.value = user.id;
    userEmail.value = user.email;
    userRating.value = parseInt(user.rating);
    console.log("User: ", user);
    console.log("User name: ", userName.value);
  } catch (error) {
    console.error("Error while fetching user: ", error);
    alert("Error while fetching user: " + error);
  }
});
</script>

<style scoped>
.d-flex {
  display: flex;
  justify-content: flex-end;
}

.bottom-left-btn {
  margin: 15px;
}

#heart {
  color: red;
}

.text-left {
  padding: 5px;
}

.name {
  margin-left: 10px;
}
</style>
