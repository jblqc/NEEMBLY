<template>
  <v-card class="product-card" hover>
    <v-img
      :src="product.image"
      :alt="product.title"
      height="200px"
      cover
      class="product-image"
    />
    <v-card-item>
      <v-card-title class="text-h6 text-wrap">{{ product.title }}</v-card-title>
      <v-card-subtitle class="text-h6 font-weight-bold">
        ${{ product.price.toFixed(2) }}
        <v-chip v-if="product.rating" small class="ml-2">
          {{ product.rating.rate }} ★
        </v-chip>
      </v-card-subtitle>
    </v-card-item>
    <v-card-actions>
      <v-btn
        color="primary"
        variant="flat"
        @click="addToCart"
        block
        :loading="isAddingToCart"
      >
        Add to Cart
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/useCartStore'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
const isAddingToCart = ref(false)

const addToCart = async () => {
  try {
    isAddingToCart.value = true
    cartStore.addToCart(props.product)
  } finally {
    isAddingToCart.value = false
  }
}
</script>

<style scoped>
.product-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  object-fit: contain;
  background: #f5f5f5;
  padding: 1rem;
}

.v-card-actions {
  margin-top: auto;
}
</style>