<template>
  <v-container>
    <v-row>
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
import "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import { useRoute } from "vue-router";

import "leaflet-routing-machine";
import { ref, onMounted, watch } from "vue";
const routes = useRoute();

const Longitude = ref(-71.2715);
const Latitude = ref(46.7747);


const restaurantLongitude = parseFloat(routes.query.lng);;
const restaurantLatitude = parseFloat(routes.query.lat);;

let map = null;
let route = null;
watch([Longitude, Latitude], ([newLongitude, newLatitude]) => {
  if (map) {
    newLongitude = eval(newLongitude);
    newLatitude = eval(newLatitude);
    if (typeof newLongitude === 'number' && typeof newLatitude === 'number') {
      map.setView([newLatitude, newLongitude], 13);
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
L.control.locate().addTo(map);
map.on('locationfound', function (e) {
    Longitude.value = e.latlng.lng;
    Latitude.value = e.latlng.lat;
    route = L.Routing.control({
      waypoints: [
        L.latLng(Latitude.value, Longitude.value),
        L.latLng(restaurantLatitude, restaurantLongitude)
      ],
    }).addTo(map);
});
});

</script>

<style>
</style>