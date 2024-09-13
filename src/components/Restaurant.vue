<template>
  <span class="restaurant">
    <v-card :restaurant="restaurant" class="mx-auto my-12" width="60vw">
      <v-carousel :show-arrows="false" cycle hide-delimiters height="50vh">
        <v-carousel-item v-for="(restaurantPicture, index) in restaurant.pictures" :key="index" :src="restaurantPicture"
          cover></v-carousel-item>
      </v-carousel>

      <v-card-item>
        <v-card-title>{{ restaurant.name }}</v-card-title>

        <v-card-subtitle>
          <a :href="`tel:${cleanUpTelNumberForHref(restaurant.tel)}`">{{ restaurant.tel }}</a>
        </v-card-subtitle>
        <v-card-subtitle>
          {{ restaurant.address }}
        </v-card-subtitle>
      </v-card-item>

      <v-card-text class="pb-2">
        <v-row class="mx-0 align-center">
          <v-rating :model-value="restaurant.rating" color="amber" density="compact" size="small" half-increments
            readonly></v-rating>

          <div class="text-grey ms-2 mt-1">
            {{ Math.round(restaurant.rating * 100) / 100 }}
          </div>
        </v-row>

        <div class="mt-4 text-subtitle-1">
          <p v-for="n in restaurant.price_range" :key="n">$</p> •
          <p v-for="(genre, index) in restaurant.genres" :key="index">{{ genre }}</p>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              Jour
            </th>
            <th class="text-left">
              Heures
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(hours, day, index) in restaurant.opening_hours" :key="index">
            <td>
              <p>{{ switchDaysToFrench(day) }}</p>
            </td>
            <td>{{ cleanUpBusinessHours(hours) }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </span>
</template>

<script>
export default {
  data() {
    return {
      restaurant: {
        opening_hours: {
          "sunday": "11:00-21:00",
          "monday": "11:30-22:00",
          "tuesday": "11:30-22:00",
          "wednesday": "11:30-22:00",
          "thursday": "11:30-22:00",
          "friday": "11:30-22:00",
          "saturday": "11:00-22:00"
        },
        pictures: [
          "https://ufood.s3-us-west-2.amazonaws.com/pictures/121ad2e3-dffb-4a7b-82ef-3eea9c337750.jpg",
          "https://ufood.s3-us-west-2.amazonaws.com/pictures/5635dd10-ac44-4042-8a10-a551f716aff3.jpg",
          "https://ufood.s3-us-west-2.amazonaws.com/pictures/d5ee5ec5-c82c-4e38-be50-129295f05499.jpg",
          "https://ufood.s3-us-west-2.amazonaws.com/pictures/c7a8fea4-8b3c-42bd-bd66-5a8009233758.jpg",
          "https://ufood.s3-us-west-2.amazonaws.com/pictures/8bf92b33-66ed-4b61-b1c8-cc7e30fee54b.jpg",
          "https://ufood.s3-us-west-2.amazonaws.com/pictures/69cef28c-31d9-4e02-8295-86855cea5611.jpg",
          "https://ufood.s3-us-west-2.amazonaws.com/pictures/485ed792-6358-4ffe-baf4-623772b4dcb0.jpg",
          "https://ufood.s3-us-west-2.amazonaws.com/pictures/66cf7bd7-3aa8-4a86-bc14-ae2782879104.jpg",
          "https://ufood.s3-us-west-2.amazonaws.com/pictures/36b736ba-b98b-4cd3-8c6e-8f47d3854d53.jpg",
          "https://ufood.s3-us-west-2.amazonaws.com/pictures/3c207c0d-db68-4e24-a5f3-ed1fa919ccdd.jpg"
        ],
        name: "Queues de Castor",
        place_id: "ChIJ-fDBsRWRuEwR04p9vegfIdo",
        tel: "(418) 694-1444",
        address: "28 Boulevard Champlain, Québec, QC G1K 4H7, Canada",
        price_range: 1,
        rating: 3.5808704801119697,
        genres: [
          "desserts"
        ],
        location: {
          coordinates: [
            -71.2034528,
            46.8119889
          ],
          type: "Point"
        },
        id: "5f31fc6155d7790550c08afe"
      }
    }
  },

  methods: {
    cleanUpTelNumberForHref(telNumber) {
      telNumber = telNumber.replace(")", "")
      telNumber = telNumber.replace("(", "")
      telNumber = telNumber.replace("-", "")
      telNumber = telNumber.replace(" ", "")
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
    }
  }
}
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
</style>
