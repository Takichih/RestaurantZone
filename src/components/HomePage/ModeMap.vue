<template>
  <div>
    <div :id="uniqueMapId" style="height: 100vh;"></div>
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watchEffect, onUnmounted, nextTick } from 'vue';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import restaurantService from "@/api/restaurantService";
  
  const uniqueMapId = `map-${Math.random().toString(36).substr(2, 9)}`;
  const nearbyRestaurants = ref([]);
  const Latitude = ref(46.8054132);
  const Longitude = ref(-71.2897939);
  let carte = null;
  navigator.geolocation.getCurrentPosition((position) => {
        Latitude.value = position.coords.latitude;
        Longitude.value = position.coords.longitude;
      });
  
  
  async function displayNearbyRestaurants(userLat, userLon) {
    console.log(carte!==null)
    console.log(Longitude.value)
    if (!userLat || !userLon || !carte) {
        console.error('Paramètres invalides ou carte non initialisée');
        return;
    }

    console.log('Carte:', !!carte, 'Coords:', userLat, userLon);
    
    const userIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      try{
        nearbyRestaurants.value = await restaurantService.getRestaurants(10, 0, null, null, null, userLon, userLat);
        console.log("Les 10 restaurants les plus proches : ", nearbyRestaurants.value)
      }
      catch(error){
        console.error("Erreur dans la recuperation des restaurants : ", error);
        return
      }
      carte.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          carte.removeLayer(layer);
        }
      });
      console.log("marker cleaned")
      carte.setView([userLat, userLon], 13);
      L.marker([userLat, userLon], {icon: userIcon})
        .addTo(carte)
        .bindPopup('Votre position');

      nearbyRestaurants.value.forEach((restaurant, index) => {
        const latitude = restaurant.location.coordinates[1]
        const longitude = restaurant.location.coordinates[0]
        console.log(`Ajout marqueur ${index}:`, latitude, longitude);
        const name = restaurant.name
        L.marker([latitude, longitude]) .addTo(carte) 
        .bindPopup(`<b>${name}</b>`); 
        console.log(`Marqueur ${index} ajouté avec succès`); 
      })
      
  }
  
  onMounted(async() => {
    if (carte) {
      carte.remove();
      carte = null;
    }
  
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
    await nextTick();
    const mapElement = document.getElementById(uniqueMapId);
    if (!mapElement) {
        console.error('Élément de carte non trouvé');
        return;
    }
    try {
      carte = L.map(uniqueMapId).setView([0, 0], 15);
  
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(carte);
  
      await getRestaurants();

      displayNearbyRestaurants(Latitude.value, Longitude.value);
    }catch(error){
      console.error('Erreur lors de l\'initialisation de la carte:', error);
    }
  });
  
  onUnmounted(() => {
    if (carte) {
      carte.remove();
      carte = null;
    }
  });
  
  watchEffect(() => {
    if (Latitude.value && Longitude.value && carte) {
        console.log('WatchEffect déclenché:', Latitude.value, Longitude.value);
        displayNearbyRestaurants(Latitude.value, Longitude.value);
        carte.setView([Latitude.value, Longitude.value], 13);
    }
});
  </script>
  
  <style scoped>
  [id^="map-"] {
    height: 400px;
    width: 100%;
    z-index: 1;
  }
  </style>