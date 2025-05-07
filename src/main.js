import { createApp } from "vue";
import App from "./App.vue";

import "vuetify/styles"; // Global CSS for Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css"; // Material Design Icons

import router from "./router";
import { createPinia } from "pinia"; // Import Pinia for state management

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
});

// Create Vue app instance
const app = createApp(App);

// Register Pinia for state management
const pinia = createPinia();
app.use(pinia);

// Use router and Vuetify, then mount the app
app.use(router).use(vuetify).mount("#app");
