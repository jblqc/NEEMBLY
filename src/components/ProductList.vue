<template>
  <v-container class="product-list-container">
    <!-- Breadcrumbs -->
    <v-breadcrumbs :items="breadcrumbs" class="px-0">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <v-row>
      <!-- Filters Column -->
      <v-col cols="12" md="3" class="filters-column">
        <v-card class="mb-4">
          <v-card-title class="text-h6">Filters</v-card-title>
          <v-card-text>
            <!-- Search Field -->
            <v-text-field
              v-model="productStore.searchQuery"
              label="Search products"
              prepend-inner-icon="mdi-magnify"
              clearable
              variant="outlined"
              class="mb-4"
            />

            <!-- Price Range Slider -->
            <div class="mb-6">
              <div class="d-flex justify-space-between mb-2">
                <span>Price Range</span>
                <span>${{ priceRange[0] }} - ${{ priceRange[1] }}</span>
              </div>
              <v-range-slider
                v-model="priceRange"
                :min="0"
                :max="1000"
                :step="10"
                thumb-label="always"
                @update:modelValue="handlePriceRangeChange"
              >
                <template v-slot:thumb-label="{ modelValue }">
                  ${{ modelValue }}
                </template>
              </v-range-slider>
            </div>

            <!-- Category Checkboxes -->
            <div class="mb-6">
              <v-card-subtitle class="pl-0">Categories</v-card-subtitle>
              <v-checkbox
                v-for="category in productStore.categories"
                :key="category"
                v-model="selectedCategories"
                :label="category"
                :value="category"
                hide-details
                density="comfortable"
                class="mt-1"
              />
            </div>

            <!-- Rating Filter -->
            <div class="mb-4">
              <v-card-subtitle class="pl-0">Customer Rating</v-card-subtitle>
              <v-radio-group v-model="selectedRating" class="mt-2">
                <v-radio
                  v-for="n in 5"
                  :key="n"
                  :value="6 - n"
                  :label="`${6 - n} stars & up`"
                >
                  <template v-slot:label>
                    <v-rating
                      :model-value="6 - n"
                      readonly
                      size="small"
                      color="amber"
                      density="compact"
                      class="mr-2"
                    />
                    <span>& up</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </div>

            <!-- Clear Filters Button -->
            <v-btn
              block
              variant="outlined"
              color="error"
              @click="clearFilters"
              class="mt-2"
            >
              Clear All Filters
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Products Column -->
      <v-col cols="12" md="9">
        <v-row v-if="productStore.loading">
          <v-col v-for="n in 8" :key="n" cols="12" sm="6" md="4" lg="3">
            <v-skeleton-loader type="card" />
          </v-col>
        </v-row>

        <template v-else>
          <v-alert v-if="productStore.error" type="error" class="mb-4">
            Failed to load products: {{ productStore.error }}
          </v-alert>

          <div class="d-flex justify-space-between align-center mb-4">
            <h2 class="text-h5">Products ({{ filteredProducts.length }})</h2>
            <v-select
              v-model="productStore.sortBy"
              :items="sortOptions"
              label="Sort by"
              variant="outlined"
              density="compact"
              style="max-width: 200px"
            />
          </div>

          <v-alert v-if="filteredProducts.length === 0" type="info">
            No products found matching your criteria.
          </v-alert>

          <v-row v-else>
          <v-col
  v-for="product in filteredProducts"
  :key="product.id"
  cols="12"
  sm="6"
  md="4"
  lg="3"
>
  <ProductCard :product="product" />
</v-col>
          </v-row>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useProductStore } from "@/stores/useProductStore";
import ProductCard from "./ProductCard.vue";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";

const productStore = useProductStore();
const route = useRoute();

// State
const priceRange = ref([0, 1000]);
const selectedCategories = ref([]);
const selectedRating = ref(null);

// Computed
const breadcrumbs = computed(() => [
  { title: "Home", disabled: false, to: "/" },
  { title: "Products", disabled: route.path === "/products" },
]);

const sortOptions = [
  { title: "Default", value: "default" },
  { title: "Price: Low to High", value: "price-low" },
  { title: "Price: High to Low", value: "price-high" },
  { title: "Highest Rating", value: "rating" },
];

const filteredProducts = computed(() => {
  let products = [...productStore.products];

  // Apply search filter
  if (productStore.searchQuery) {
    const query = productStore.searchQuery.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  // Apply price range filter
  products = products.filter(
    (p) => p.price >= priceRange.value[0] && p.price <= priceRange.value[1]
  );

  // Apply category filter
  if (selectedCategories.value.length > 0) {
    products = products.filter((p) =>
      selectedCategories.value.includes(p.category)
    );
  }

  // Apply rating filter
  if (selectedRating.value) {
    products = products.filter((p) => p.rating.rate >= selectedRating.value);
  }

  // Apply sorting
  switch (productStore.sortBy) {
    case "price-low":
      return products.sort((a, b) => a.price - b.price);
    case "price-high":
      return products.sort((a, b) => b.price - a.price);
    case "rating":
      return products.sort((a, b) => b.rating.rate - a.rating.rate);
    default:
      return products;
  }
});

// Methods
const handlePriceRangeChange = (range) => {
  productStore.minPrice = range[0];
  productStore.maxPrice = range[1];
};

const clearFilters = () => {
  productStore.searchQuery = "";
  priceRange.value = [0, 1000];
  selectedCategories.value = [];
  selectedRating.value = null;
  productStore.sortBy = "default";
};

const showSuccessAlert = (product) => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: `${product.title} added to cart`,
    showConfirmButton: false,
    timer: 1500,
    toast: true,
  });
};

// Initialize
if (productStore.products.length === 0) {
  productStore.fetchProducts();
}
</script>

<style scoped>
.product-list-container {
  max-width: 1400px;
}

.filters-column {
  position: sticky;
  top: 20px;
  align-self: flex-start;
}

.v-range-slider {
  padding: 0 16px;
}

.v-radio-group :deep(.v-selection-control) {
  min-height: 40px;
}
</style>
