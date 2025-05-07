<template>
  <v-card class="product-card" hover>
    <div @click="navigateToProduct" class="clickable-area">
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
    </div>
    <v-card-actions>
      <v-btn
        color="primary"
        variant="flat"
        @click.stop="addToCart"
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
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2' 
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['added-to-cart'])
const router = useRouter()
const isAddingToCart = ref(false)

const showSuccessAlert = (product) => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: `${product.title} added to cart`,
    showConfirmButton: false,
    timer: 1500,
    toast: true,
  });
}

const navigateToProduct = () => {
  router.push({ name: 'product-detail', params: { id: props.product.id } })
}

const addToCart = (event) => {
  event.stopPropagation()
  try {
    isAddingToCart.value = true
    emit('added-to-cart', props.product)
      showSuccessAlert(props.product) 
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

.clickable-area {
  cursor: pointer;
  flex-grow: 1;
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