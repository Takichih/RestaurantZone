<template>
  <div id="map" style="height: 500px; width: 100%"></div>
</template>

<script setup>
import L from "leaflet";
import "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import "leaflet-routing-machine";
import { ref, onMounted, watch } from "vue";

const props = defineProps(["longitude", "latitude"]);

const Longitude = ref(-71.2715);
const Latitude = ref(46.7747);

const restaurantLongitude = parseFloat(props.longitude);
const restaurantLatitude = parseFloat(props.latitude);

let map = null;
let route = null;

watch(
  [Longitude, Latitude],
  ([newLongitude, newLatitude]) => {
    if (map) {
      newLongitude = eval(newLongitude);
      newLatitude = eval(newLatitude);
      if (typeof newLongitude === "number" && typeof newLatitude === "number") {
        map.setView([newLatitude, newLongitude], 13);
      }
    }
  },
  { immediate: true },
);

onMounted(() => {
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  map = L.map("map").setView([restaurantLatitude, restaurantLongitude], 15);
  L.marker([restaurantLatitude, restaurantLongitude]).addTo(map);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.control.locate().addTo(map);

  map.on("locationfound", function (e) {
    Longitude.value = e.latlng.lng;
    Latitude.value = e.latlng.lat;
    if (route){
      map.removeControl(route);
    }
    route = L.Routing.control({
      waypoints: [
        L.latLng(Latitude.value, Longitude.value),
        L.latLng(restaurantLatitude, restaurantLongitude),
      ],
    }).addTo(map);
  });
});
</script>

<style>
.leaflet-routing-container {
  background-color: aliceblue;
  border-radius: 8px;
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-size: small;
}

</style>
