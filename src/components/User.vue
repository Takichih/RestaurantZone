<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <h4 class="text-left">Nom:</h4>
          <v-card>
            <h3 class="name">Gordon</h3>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <h4 class="text-left">Prénom:</h4>
          <v-card>
            <h3 class="name">Ramsay</h3>
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
          height="15"
          max="4"
          min="0"
          model-value="2"
          rounded
        ></v-progress-linear>

        <div class="ms-4 text-h6">77/100</div>
      </v-sheet>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h3 class="text-left">Restaurants visités récemment:</h3>
        </v-col>
      </v-row>
      <v-row>
        <!-- Afficher un bouton pour revenir à la page d'accueil si aucun restaurant n'a été visité -->
        <template v-if="visitedRestaurants.length === 0">
          <v-col cols="12">
            <v-btn color="primary" :to="{ path: '/' }"> Accueil </v-btn>
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
                Score: {{ restaurant.rating }}
              </v-card-subtitle>
              <v-card-text>
                Nombre de visites: {{ restaurant.visits }}
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
import { useRouter } from "vue-router";
export default {
  data() {
    return {
      // Liste des restaurants disponible, filtré selon le nombre de visits
      restaurants: [
        { name: "Chez Wong", rating: 4.5, visits: 4 },
        { name: "Nina Pizza Napolitaine", rating: 4.2, visits: 2 },
        { name: "L'Ostrea", rating: 3.8, visits: 6 },
        { name: "Le Champlain", rating: 4.0, visits: 5 },
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
      this.restaurants[index].isFavorite = !this.restaurants[index].isFavorite;
    },

    // fonction pour supprimer un restaurant de la liste déja visiter.
    deleteRestaurant(name) {
      console.log(`Deleting ${name}`);
      this.restaurants = this.restaurants.filter(
        (restaurant) => restaurant.name !== name,
      );
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

.text-left {
  padding: 5px;
}

.name {
  margin-left: 10px;
}
</style>
