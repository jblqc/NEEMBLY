<template>
  <v-app>
    <v-main>
      <v-container>
        <!-- Hero Section -->
        <div class="hero d-flex align-center justify-center">
          <div class="text-center text-white px-4">
            <h1 class="text-h3 font-weight-bold mb-2">
              Shop our latest products
            </h1>
            <p class="text-body-1 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
              ratione debitis quis est labore voluptatibus!
            </p>
            <v-btn
              to="/products"
              size="large"
              variant="flat"
              color="white"
              class="text-black font-weight-bold"
            >
              Shop latest products
            </v-btn>
          </div>
        </div>

        <!-- Featured Collections -->
        <v-container class="mt-10">
          <h2 class="text-h5 font-weight-bold mb-6">Featured collections</h2>
          <v-row dense>
            <v-col
              v-for="(cat, i) in store.categories.slice(0, 3)"
              :key="i"
              cols="12"
              sm="4"
            >
              <v-card border flat plain class="rounded-lg" hover>
                <v-img :src="categoryImages[cat]" height="180px" cover></v-img>
                <v-card-text>
                  <div
                    class="text-subtitle-1 font-weight-medium text-capitalize"
                  >
                    {{ cat }}
                  </div>
                  <div class="text-body-2 text-grey-darken-1">
                    Explore top {{ cat }} picks
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <!-- Shop by Category -->

        <!-- Trending Products -->
        <v-container class="mt-10">
          <div class="d-flex justify-space-between align-center mb-6">
            <h2 class="text-h5 font-weight-bold mb-6">Trending Products</h2>
            <v-btn
              variant="text"
              to="/products"
              class="text-primary text-caption"
              >Shop the collection →</v-btn
            >
          </div>
          <v-row dense>
            <v-col
              v-for="(product, index) in trendingProducts"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <ProductCard :product="product" />
            </v-col>
          </v-row>
        </v-container>

        <!-- About Project Section -->
<v-container class="mt-15 mb-10">
  <v-card variant="flat" color="grey-lighten-4" class="pa-6 rounded-lg">
    <v-row align="center">
      <v-col cols="12" md="8">
        <h2 class="text-h5 font-weight-bold mb-2">About This Project</h2>
        <p class="text-body-1 mb-4">
          This demo showcases a modern e-commerce frontend built with Vue.js and Vuetify. 
          Includes product browsing, cart management, and admin features.
        </p>
        <v-btn 
          to="/about" 
          variant="outlined" 
          color="primary"
          size="large"
        >
          Learn More
        </v-btn>
      </v-col>
      <v-col cols="12" md="4" class="text-center">
        <v-icon 
          icon="mdi-code-tags" 
          size="80" 
          color="primary" 
          class="d-none d-md-block"
        />
      </v-col>
    </v-row>
  </v-card>
</v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useProductStore } from "@/stores/useProductStore";
import ProductCard from "@/components/ProductCard.vue";
const store = useProductStore();

onMounted(() => {
  if (store.products.length === 0) {
    store.fetchProducts();
  }
});

const trendingProducts = computed(() => {
  const shuffled = [...store.products].sort(() => 0.8 - Math.random());
  return shuffled.slice(0, 8);
});

// Placeholder images for each category
const categoryImages = {
  electronics:
    "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVsZWN0cm9uaWNzfGVufDB8fDB8fHww",
  jewelery:
    "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8amV3ZWxyeXxlbnwwfHwwfHx8MA%3D%3D",
  "men's clothing":
    "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "women's clothing":
    "https://images.unsplash.com/photo-1524255684952-d7185b509571?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tZW5zJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
};
</script>

<style scoped>
.hero {
  height: 80vh;
  background: url("https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
    center center / cover no-repeat;
  position: relative;
}
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}
.hero > div {
  position: relative;
  z-index: 1;
}
</style>
