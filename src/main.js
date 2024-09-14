import { createApp } from "vue";

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from "vuetify";
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'leaflet/dist/leaflet.css';
// Router
import { router } from "./router";
// Components
import App from "./App.vue";
const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives
});

app.use(router)
app.use(vuetify)
app.mount("#app");
