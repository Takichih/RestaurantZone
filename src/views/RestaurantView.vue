<script setup>
import axios from "axios";
import {ref, onMounted} from "vue"
import moment from "moment";
import "moment/locale/fr";
import InteractiveMap from "@/components/InteractiveMap";
import ModaleVisite from "@/components/ModaleVisite.vue";

const restaurantId = ref("5f31fc7155d7790550c08b02");
const restaurant = ref(null);
const visits = ref([]);

async function fetchRestaurantDetails(){
  try{
    const response = await axios.get(
      `https://ufoodapi.herokuapp.com/unsecure/restaurants/${restaurantId.value}`
    );
    restaurant.value = response.data;

    console.log("Détails du restaurant :");
    for (const key in restaurant.value) {
      if (restaurant.value.hasOwnProperty(key)) {
        console.log(`Attribut: ${key}, Valeur: ${restaurant.value[key]}, Type: ${typeof restaurant.value[key]}`);
      }
    }
  } catch (error){
    console.error("Erreur lors de la récupération des détails du restaurant:", error);
  }
}

async function fetchRestaurantVisits(){
  try{
    const response = await axios.get(
      `https://ufoodapi.herokuapp.com/unsecure/restaurants/${restaurantId.value}/visits`
    );
    visits.value = response.data.items;
  } catch(error){
    console.error("Erreur lors de la récupération des visites du restaurant:", error);
  }
}

const formatDate = (dateString) => {
  return moment(dateString).locale("fr").format("D MMMM YYYY, HH[h]mm")
}

const handleVisitSubmitted = (visitData) => {
  console.log("Nouvelle visite reçue :", visitData); 

  visits.value.unshift(visitData);
};

onMounted(() => {
  fetchRestaurantDetails();
  fetchRestaurantVisits();
});

</script>

<template>
  <span class="restaurant">
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mx-auto" height="100%">
          <v-carousel :show-arrows="false" cycle hide-delimiters height="70vh">
            <v-carousel-item
              v-for="(restaurantPicture, index) in restaurant?.pictures"
              :key="index"
              :src="restaurantPicture"
              cover
            ></v-carousel-item>
          </v-carousel>

          <v-card-item>
            <v-card-title>{{ restaurant?.name }}</v-card-title>

            <v-card-subtitle>
              <a :href="`tel:${cleanUpTelNumberForHref(restaurant?.tel)}`">{{
                restaurant?.tel
              }}</a>
            </v-card-subtitle>
            <v-card-subtitle>
              {{ restaurant?.address }}
            </v-card-subtitle>
          </v-card-item>
          <v-card-text class="pb-2">
            <v-row class="mx-0 align-center">
              <v-rating
                :model-value="restaurant?.rating"
                color="amber"
                density="compact"
                size="small"
                half-increments
                readonly
              ></v-rating>

              <div class="text-grey ms-2 mt-1">
                {{ Math.round(restaurant?.rating * 100) / 100 }}
              </div>
            </v-row>

            <div class="mt-4 text-subtitle-1">
              <p v-for="n in restaurant?.price_range" :key="n">$</p>
              •
              <p v-for="(genre, index) in restaurant?.genres" :key="index">
                {{ genre }}
              </p>
            </div>
          </v-card-text>

            <div v-if="visits && visits.length" class="mt-4 text-subtitle-1">
              <v-divider></v-divider>
              <v-card-title class="mt-4">Avis des visiteurs</v-card-title>

              <div v-for="visit in visits" :key="visit.id" class=" visit-card mt-4">

                <v-card-item>
                  <v-row class="d-flex align-center" justify="space-between">
                    <v-col class="text-start" cols="6">
                      <p class="text-body-2">
                        {{ visit.user_id }}
                      </p>
                    </v-col>
                    <v-col class="text-end" cols="6">
                      <p class="text-body-2 text-grey">
                        {{ formatDate(visit.date) }}
                      </p>
                    </v-col>
                  </v-row>
                </v-card-item>

                <v-card-text class="rating">
                  <v-row class="mx-0 align-center">
                    <v-rating 
                    :model-value="visit.rating" 
                    color="amber" 
                    density="compact"
                    size="small"
                    half-increments 
                    readonly>
                    </v-rating>

                    <span class="text-grey ms-2 mt-1">
                      {{ visit.rating }}
                    </span> 
                  </v-row>
                
                  <div class="comment mt-4 text-subtitle-1">              
                    <p>
                      {{ visit.comment }}
                    </p> 
                  </div>
                </v-card-text>   
              </div>
            </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Horaire hebdomadaire</v-card-title>

              <v-table density="compact">
                <thead>
                  <tr>
                    <th class="text-left">Jour</th>
                    <th class="text-left">Heures</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(hours, day, index) in restaurant?.opening_hours"
                    :key="index"
                  >
                    <td>
                      <p>{{ switchDaysToFrench(day) }}</p>
                    </td>
                    <td>{{ cleanUpBusinessHours(hours) }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card></v-col
          >
        </v-row>
        <v-row>
          <v-col>
            <v-card width="100%" v-if="restaurant?.location.coordinates">
              <InteractiveMap
                :longitude="restaurant?.location.coordinates[0]"
                :latitude="restaurant?.location.coordinates[1]"
              />
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <ModaleVisite :id="restaurant?.id" @visitSubmitted="handleVisitSubmitted"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </span>
</template>

<script>
export default {

  methods: {
    cleanUpTelNumberForHref(telNumber) {
      if (!telNumber) return "";
      telNumber = telNumber.replace(")", "");
      telNumber = telNumber.replace("(", "");
      telNumber = telNumber.replace("-", "");
      telNumber = telNumber.replace(" ", "");
      telNumber = "+1" + telNumber;

      return telNumber;
    },
    switchDaysToFrench(englishDay) {
      let frenchDay;
      englishDay.toLowerCase();

      switch (englishDay) {
        case "monday":
          frenchDay = "lundi";
          break;
        case "tuesday":
          frenchDay = "mardi";
          break;
        case "wednesday":
          frenchDay = "mercredi";
          break;
        case "thursday":
          frenchDay = "jeudi";
          break;
        case "friday":
          frenchDay = "vendredi";
          break;
        case "saturday":
          frenchDay = "samedi";
          break;
        case "sunday":
          frenchDay = "dimanche";
          break;
        default:
          frenchDay = "aucun";
          break;
      }

      return frenchDay;
    },
    cleanUpBusinessHours(hours) {
      hours = hours.replace("-", " à ");

      return hours;
    },
  },
};
</script>

<style>
.restaurant {
  p {
    display: inline-block;
  }

  p::first-letter {
    text-transform: capitalize;
  }

  .v-card-subtitle {
    white-space: unset !important;
  }

  th {
    font-weight: bold !important;
  }
}

.directions {
  text-decoration: none;
}

.visit-card {
  background-color: #f0f0f5;
  border-radius: 8px;
  margin: 20px;
}


</style>
