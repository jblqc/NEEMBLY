<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbs" class="px-0">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <v-row v-if="loading">
      <v-col cols="12" md="6">
        <v-skeleton-loader type="image" height="400" />
      </v-col>
      <v-col cols="12" md="6">
        <v-skeleton-loader type="article" />
      </v-col>
    </v-row>

    <template v-else>
      <v-alert
        v-if="error"
        type="error"
        class="mb-4"
      >
        Failed to load product: {{ error }}
      </v-alert>

      <v-row v-if="product">
        <v-col cols="12" md="6">
          <v-img
            :src="product.image"
            :alt="product.title"
            height="400"
            contain
            class="bg-grey-lighten-2"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-card variant="flat">
            <v-card-title class="text-h4 mb-2">{{ product.title }}</v-card-title>
            
            <div class="d-flex align-center mb-4">
              <v-rating
                v-model="product.rating.rate"
                half-increments
                readonly
                size="small"
                color="amber"
              />
              <span class="text-caption ml-2">
                {{ product.rating.rate }} ({{ product.rating.count }} reviews)
              </span>
              <v-chip class="ml-4" color="primary" small>
                {{ product.category }}
              </v-chip>
            </div>

            <v-card-text class="pa-0">
              <p class="text-h5 mb-4">${{ product.price.toFixed(2) }}</p>
              <p class="mb-6">{{ product.description }}</p>

              <div class="d-flex align-center mb-6">
                <v-btn
                  color="primary"
                  size="large"
                  @click="addToCart"
                  :loading="isAddingToCart"
                >
                  Add to Cart
                </v-btn>
                <v-btn
                  icon
                  color="grey-darken-1"
                  variant="text"
                  size="large"
                  class="ml-2"
                >
                  <v-icon>mdi-heart-outline</v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </template>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/useProductStore'
import { useCartStore } from '@/stores/useCartStore'


const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const product = ref(null)
const loading = ref(false)
const error = ref(null)
const isAddingToCart = ref(false)

const breadcrumbs = computed(() => {
  const items = [
    { title: 'Home', disabled: false, to: '/' },
    { title: 'Products', disabled: false, to: '/products' },
    { title: product.value?.title || 'Product', disabled: true }
  ]
  return items
})

onMounted(async () => {
  try {
    loading.value = true
    const productId = Number(route.params.id)
    product.value = productStore.getProductById(productId)
    
    if (!product.value) {
      await productStore.fetchProducts()
      product.value = productStore.getProductById(productId)
    }
    
    if (!product.value) {
      throw new Error('Product not found')
    }
 
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

const addToCart = async () => {
  try {
    isAddingToCart.value = true
    cartStore.addToCart(product.value)
  } finally {
    isAddingToCart.value = false
  }
}
</script>