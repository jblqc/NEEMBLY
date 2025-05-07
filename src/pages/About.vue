<template>
  <v-container class="about-container">
    <v-card flat class="transparent-card">
      <!-- Header -->
      <v-card-title class="text-h4 font-weight-bold mb-4">
        About This Project
      </v-card-title>

      <!-- App Summary -->
      <v-card-text class="text-body-1 mb-6">
        A modern e-commerce demo built with Vue.js, showcasing core frontend development skills. 
        This app integrates with the FakeStore API to demonstrate product management, filtering, 
        and cart functionality.
      </v-card-text>

      <!-- Key Features Grid -->
      <v-card-title class="text-h5 mb-3">Key Features</v-card-title>
      <v-row class="mb-6">
        <v-col v-for="(feature, i) in features" :key="i" cols="12" md="6">
          <v-card variant="outlined" class="feature-card pa-4">
            <v-icon size="32" :color="feature.color" class="mb-2">
              {{ feature.icon }}
            </v-icon>
            <h3 class="text-h6 mb-2">{{ feature.title }}</h3>
            <p class="text-body-2">{{ feature.description }}</p>
          </v-card>
        </v-col>
      </v-row>

      <!-- Tech Stack -->
      <v-card-title class="text-h5 mb-3">Tech Stack</v-card-title>
      <div class="tech-stack mb-6">
        <v-chip
          v-for="(tech, i) in techStack"
          :key="i"
          class="ma-1"
          :color="tech.color"
          variant="outlined"
        >
          <v-icon start :icon="tech.icon" />
          {{ tech.name }}
        </v-chip>
      </div>

      <!-- Admin Note -->
      <v-alert variant="tonal" color="info" class="mb-4">
        <strong>Interviewer Note:</strong> The admin panel is accessible via the 
        <v-icon icon="mdi-shield-account" size="small" /> icon in the header.
      </v-alert>
    </v-card>
  </v-container>
</template>

<script setup>
const features = [
  {
    icon: 'mdi-store-search',
    title: 'Product Browsing',
    description: 'View and filter products with real API data, including search, category filters, customer ratings, sort by and price ranges.',
    color: 'primary'
  },
  {
    icon: 'mdi-cart',
    title: 'Shopping Cart',
    description: 'Add/remove items, update quantities, and persist cart data across sessions.',
    color: 'green'
  },
  {
    icon: 'mdi-credit-card-check',
    title: 'Checkout Flow',
    description: 'Simulated checkout process with form validation and order confirmation.',
    color: 'deep-purple'
  },
  {
    icon: 'mdi-shield-account',
    title: 'Admin Panel',
    description: 'Create (persisted in localStorage) to demonstrate CRUD operation.',
    color: 'orange'
  }
];

const techStack = [
  { name: 'Vue 3', icon: 'mdi-vuejs', color: 'green' },
  { name: 'Pinia', icon: 'mdi-database', color: 'orange' },
  { name: 'Vuetify', icon: 'mdi-material-design', color: 'blue' },
  { name: 'FakeStore API', icon: 'mdi-api', color: 'purple' },
  { name: 'Vue Router', icon: 'mdi-routes', color: 'red' }
];
</script>

<style scoped>
.about-container {
  max-width: 900px;
  padding-top: 32px;
}

.transparent-card {
  background-color: transparent !important;
}

.feature-card {
  height: 100%;
  transition: transform 0.2s;
  border-radius: 12px;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
}
</style>