<template>
  <div>
    <div class="text-h3 text-center my-5">Bienvenue sur UFood</div>
    <v-container fluid>
      <v-row>
        <v-col cols="11">
          <v-card class="pa-5">
            <v-row>
              <v-col cols="11">
                <h1 class="text-center">Liste des Restaurants</h1>
              </v-col>
            </v-row>

            <v-row class="mb-4">
              <v-col cols="11" md="5">
                <v-text-field
                  v-model="search"
                  label="Rechercher un restaurant"
                  prepend-inner-icon="mdi-magnify"
                  clearable
                ></v-text-field>
              </v-col>

              <v-col cols="11" md="3">
                <v-select
                  v-model="selectedPrice"
                  :items="priceRanges"
                  prepend-inner-icon="mdi-currency-usd"
                  label="Filtrer par fourchette de prix"
                  clearable
                ></v-select>
              </v-col>

              <v-col cols="11" md="3">
                <v-select
                  v-model="selectedSpeciality"
                  :items="specialities"
                  prepend-inner-icon="mdi-chef-hat"
                  label="Filtrer par genre"
                  clearable
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                v-for="(item, i) in filteredRestaurants"
                :key="i"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <v-card>
                  <v-img
                    :src="item.image"
                    alt="Restaurant image"
                    height="200"
                    cover
                  ></v-img>

                  <v-card-subtitle class="text-center mt-2">
                    {{ item.name }}
                  </v-card-subtitle>
                  <v-card-text class="text-center">
                    {{ item.description }} <br />
                    Prix: {{ item.price }} €
                  </v-card-text>

                  <v-card-actions class="justify-center">
                    <v-btn
                      icon
                      color="primary"
                      class="mx-2"
                      @click="toggleFavorite(i)"
                    >
                      <v-icon :icon="item.isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"></v-icon>
                    </v-btn>

                    <v-btn
                      icon
                      color="secondary"
                      class="mx-2"
                      @click="openDetails(i)"
                    >
                      <v-icon icon="mdi-information-outline"></v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        search: '',
        selectedPrice: null,
        selectedSpeciality: null,
        priceRanges: ['10-20€', '20-30€', '30-40€', '+40€'],
        specialities: ['Français', 'Asiatique', 'Italien', 'Mexicain', 'Africain', 'Canadien'],
        items: [
          {
            name: 'Le Champlain',
            image: 'https://ufood.s3-us-west-2.amazonaws.com/pictures/121ad2e3-dffb-4a7b-82ef-3eea9c337750.jpg',
            description: 'Cuisine typique française',
            speciality: 'Français',
            price: '15',
            isFavorite: false,
          },
          {
            name: 'Chez Wong',
            image: 'https://ufood.s3-us-west-2.amazonaws.com/pictures/5635dd10-ac44-4042-8a10-a551f716aff3.jpg',
            description: 'Délices asiatiques',
            speciality: 'Asiatique',
            price: '24',
            isFavorite: false,
          },
          {
            name: 'Clocher Penché',
            image: 'https://ufood.s3-us-west-2.amazonaws.com/pictures/d5ee5ec5-c82c-4e38-be50-129295f05499.jpg',
            description: 'Pizza italienne authentique',
            speciality: 'Italien',
            price: '12',
            isFavorite: true,
          },
          {
            name: 'Kaiji sushi et izakaya',
            image: 'https://ufood.s3-us-west-2.amazonaws.com/pictures/c7a8fea4-8b3c-42bd-bd66-5a8009233758.jpg',
            description: 'Cuisine mexicaine',
            speciality: 'Mexicain',
            price: '35',
            isFavorite: false,
          },
          {
            name: 'Kebec Club Privé',
            image: 'https://ufood.s3-us-west-2.amazonaws.com/pictures/8bf92b33-66ed-4b61-b1c8-cc7e30fee54b.jpg',
            description: 'Cuisine mexicaine',
            speciality: 'Mexicain',
            price: '45',
            isFavorite: false,
          },
          {
            name: 'lueur',
            image: 'https://ufood.s3-us-west-2.amazonaws.com/pictures/69cef28c-31d9-4e02-8295-86855cea5611.jpg',
            description: 'BBQ coréen',
            speciality: 'Asiatique',
            price: '37',
            isFavorite: false,
          },
          {
            name: 'Le Clan',
            image: 'https://ufood.s3-us-west-2.amazonaws.com/pictures/485ed792-6358-4ffe-baf4-623772b4dcb0.jpg',
            description: 'Cuisine africaine',
            speciality: 'Africain',
            price: '50',
            isFavorite: false,
          },
          {
            name: "L’Orygine",
            image: 'https://ufood.s3-us-west-2.amazonaws.com/pictures/66cf7bd7-3aa8-4a86-bc14-ae2782879104.jpg',
            description: 'Cuisine brésilienne',
            speciality: 'Brésilien',
            price: '13',
            isFavorite: false,
          },
          {
            name: 'Nina Pizza Napolitaine',
            image: 'https://ufood.s3-us-west-2.amazonaws.com/pictures/36b736ba-b98b-4cd3-8c6e-8f47d3854d53.jpg',
            description: 'Pizza italienne authentique',
            speciality: 'Italien',
            price: '23',
            isFavorite: false,
          },
          {
            name: "L'Ostrea",
            image: 'https://ufood.s3-us-west-2.amazonaws.com/pictures/3c207c0d-db68-4e24-a5f3-ed1fa919ccdd.jpg',
            description: 'Spécialité canadienne',
            speciality: 'Canadien',
            price: '21',
            isFavorite: false,
          },
        ],
      };
    },
    computed: {
      filteredRestaurants() {
        return this.items.filter(item => {
          const matchesSearch = item.name.toLowerCase().includes(this.search ? this.search.toLowerCase() : '');
          const priceRange = this.selectedPrice;
          const [minPrice, maxPrice] = priceRange
            ? priceRange.includes('+') 
              ? [parseInt(priceRange.split('-')[0]), Infinity] 
              : priceRange.split('-').map(price => parseInt(price))
            : [0, Infinity];
            
          const matchesPrice = item.price >= minPrice && item.price <= maxPrice;

          const matchesSpeciality = this.selectedSpeciality ? item.speciality === this.selectedSpeciality : true;

          return matchesSearch && matchesPrice && matchesSpeciality;
        });
      },
    },
    methods: {
      toggleFavorite(index) {
        this.items[index].isFavorite = !this.items[index].isFavorite;
      },
      openDetails(index) {
        alert(`Détails du restaurant : ${this.items[index].name}`);
      },
    },
  };
</script>

<style scoped>
  .v-card {
    max-width: 100%;
  }

  .v-img {
    object-fit: cover;
  }
</style>
