<template>
  <v-container>
    <!-- Breadcrumbs -->
    <v-breadcrumbs :items="breadcrumbs" class="px-0">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <!-- Search and Filter Section -->
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="productStore.searchQuery"
              label="Search products"
              prepend-inner-icon="mdi-magnify"
              clearable
              variant="outlined"
            />
          </v-col>
          <v-col cols="6" md="3">
            <v-select
              v-model="productStore.selectedCategory"
              :items="productStore.categories"
              label="Category"
              clearable
              variant="outlined"
            />
          </v-col>
          <v-col cols="6" md="3">
            <v-select
              v-model="productStore.sortBy"
              :items="sortOptions"
              label="Sort by"
              variant="outlined"
            />
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model.number="productStore.minPrice"
              label="Min price"
              type="number"
              min="0"
              step="0.01"
              prefix="$"
              variant="outlined"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.number="productStore.maxPrice"
              label="Max price"
              type="number"
              min="0"
              step="0.01"
              prefix="$"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Product Grid -->
    <v-row v-if="productStore.loading">
      <v-col v-for="n in 8" :key="n" cols="12" sm="6" md="4" lg="3">
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>

    <template v-else>
      <v-alert
        v-if="productStore.error"
        type="error"
        class="mb-4"
      >
        Failed to load products: {{ productStore.error }}
      </v-alert>
      
      <v-alert
        v-if="productStore.productCount === 0"
        type="info"
      >
        No products found matching your criteria.
      </v-alert>

      <v-row v-else>
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center mb-4">
            <h2 class="text-h5">Products ({{ productStore.productCount }})</h2>
            <v-btn
              color="primary"
              @click="productStore.fetchProducts"
              :loading="productStore.loading"
              variant="outlined"
            >
              Refresh
            </v-btn>
          </div>
        </v-col>

        <v-col
          v-for="product in productStore.filteredProducts"
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
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useProductStore } from '@/stores/useProductStore'
import ProductCard from './ProductCard.vue'
import { useRoute } from 'vue-router'

const productStore = useProductStore()
const route = useRoute()

const sortOptions = [
  { title: 'Default', value: 'default' },
  { title: 'Price: Low to High', value: 'price-low' },
  { title: 'Price: High to Low', value: 'price-high' },
  { title: 'Highest Rating', value: 'rating' }
]

const breadcrumbs = computed(() => {
  const items = [
    { title: 'Home', disabled: false, to: '/' },
    { title: 'Products', disabled: route.path === '/products' }
  ]
  
  if (productStore.selectedCategory) {
    items.push({
      title: productStore.selectedCategory,
      disabled: true
    })
  }
  
  return items
})

// Fetch products if not already loaded
if (productStore.products.length === 0) {
  productStore.fetchProducts()
}
</script>