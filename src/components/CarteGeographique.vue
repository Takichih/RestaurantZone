<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-4 mb-4">
          <v-card-title>Map</v-card-title>
          <v-text-field label="Longitude" v-model="Longitude" type="number"></v-text-field>
          <v-text-field label="Latitude" v-model="Latitude" type="number"></v-text-field>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card class="pa-2">
          <div id="map" style="height: 500px; width: 100%;"></div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import L from "leaflet";
import "leaflet-routing-machine";
import { ref, onMounted, watch } from "vue";


const Longitude = ref(-71.2715);
const Latitude = ref(46.7747);

const secondLatitude = ref(-60.561668)
const secondLongitude = ref(45.508888)

let map = null;
let circle = null;
let route = null;
watch([Longitude, Latitude], ([newLongitude, newLatitude]) => {
  if (map && circle) {
    newLongitude = eval(newLongitude);
    newLatitude = eval(newLatitude);
    if (typeof newLongitude === 'number' && typeof newLatitude === 'number') {
      map.setView([newLatitude, newLongitude], 13);
      circle.setLatLng([newLatitude, newLongitude]);
    }
  }
}, { immediate: true });


onMounted(() => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });
  map = L.map('map').setView([Latitude.value, Longitude.value], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
route = L.Routing.control({
  waypoints:[
    L.latLng(Latitude.value, Longitude.value),
    L.latLng(secondLatitude.value, secondLongitude.value)
  ]
}).addTo(map);
});

</script>

<style>
</style>