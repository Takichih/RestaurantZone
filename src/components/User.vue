<template>
  <div class="userPage">
    <h1>Profile</h1>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h3 class="text-left">Name:</h3>
        </v-col>
      </v-row>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="firstname"
                :counter="10"
                :rules="nameRules"
                label="First name"
                model-value="Gordon"
                hide-details
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="lastname"
                :counter="10"
                :rules="nameRules"
                label="Last name"
                model-value="Ramsay"
                hide-details
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" class="d-flex">
              <v-row class="full-height">
                <v-btn size="x-large" class="bottom-left-btn" color="primary"
                  >Save</v-btn
                >
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h3 class="text-left">Score:</h3>
        </v-col>
      </v-row>
      <v-sheet
        class="d-flex align-center px-4 py-8 mx-auto"
        color="#FFFFF"
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
          height="12"
          max="9"
          min="0"
          model-value="2"
          rounded
        ></v-progress-linear>

        <div class="ms-4 text-h6">47/100</div>
      </v-sheet>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h3 class="text-left">Recently Visited:</h3>
        </v-col>
      </v-row>
      <v-row>
        <!-- Afficher un bouton pour revenir à la page d'accueil si aucun restaurant n'a été visité -->
        <template v-if="visitedRestaurants.length === 0">
          <v-col cols="12">
            <v-btn @click="goToHomepage" color="primary">Go to Homepage</v-btn>
          </v-col>
        </template>

        <!-- Afficher les cartes des restaurants visités s'il y en a -->
        <template v-else>
          <!-- Utiliser v-col avec une largeur de 6 colonnes pour chaque carte, ce qui donne deux cartes par ligne -->
          <v-col
            cols="12"
            md="3"
            v-for="(restaurant, index) in visitedRestaurants"
            :key="restaurant.name"
          >
            <v-card>
              <v-card-title>{{ restaurant.name }}</v-card-title>
              <v-card-subtitle>
                Rating: {{ restaurant.rating }}
              </v-card-subtitle>
              <v-card-text>
                Number of Visits: {{ restaurant.visits }}
              </v-card-text>
              <v-card-actions>
                <v-btn id="heart" icon @click="AddToFavorites(index)">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      // Liste des restaurants disponible, filtré selon le nombre de visits
      restaurants: [
        { name: "Queues de Castor", rating: 4.5, visits: 6 },
        { name: "Nomi", rating: 4.2, visits: 4 },
        { name: "Red Lobster", rating: 3.8, visits: 2 },
        { name: "Domino's Pizza", rating: 4.0, visits: 1 },
      ],
    };
  },
  computed: {
    visitedRestaurants() {
      return this.restaurants.filter((restaurant) => restaurant.visits > 0);
    },
  },
  methods: {
    // Fonction pour ajouter un restaurant déja visiter a la liste des favories
    AddToFavorites(index) {
      // Désactiver pour le livrable 1
      //this.restaurants[index].isFavorite = !this.restaurants[index].isFavorite;
    },
    // fonction pour supprimer un restaurant de la liste déja visiter.
    deleteRestaurant(name) {
      // Désactiver pour le livrable 1
      /*console.log(`Deleting ${name}`);
      this.restaurants = this.restaurants.filter(
        (restaurant) => restaurant.name !== name,
      );*/
    },

    // fonction pour retourner la page d'accueil
    goToHomepage() {
      // Désactiver pour le livrable 1
      //console.log("Navigating to the homepage...");
    },
  },
};
</script>

<style>
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
</style>
