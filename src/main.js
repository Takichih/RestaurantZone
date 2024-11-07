import { createApp } from "vue";

// Vuetify
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import { VDateInput } from "vuetify/lib/labs/components.mjs";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "leaflet/dist/leaflet.css";

// Router
import { router } from "./router";

// Components
import App from "./App.vue";

// General styles
import "@/assets/app.css";

const vuetify = createVuetify({
  components: {
    VDateInput,
    ...components,
  },
  directives,
});

createApp(App).use(router).use(vuetify).mount("#app");
