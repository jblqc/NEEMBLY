// src/main.js
import { createApp } from "vue";
import App from "./App.vue";

import "vuetify/styles"; // Global CSS
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import router from "./router";
import { createPinia } from "pinia"; // ✅ Import Pinia

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

// ✅ Register Pinia before mounting
const pinia = createPinia();
app.use(pinia);

app.use(router).use(vuetify).mount("#app");
