<template>
  <v-container>
    <v-row>
      <v-col v-for="item in cartItems" :key="item.id" cols="12" md="4">
        <v-card>
          <v-img :src="item.image" :alt="item.title" height="200px"></v-img>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-subtitle>${{ item.price }}</v-card-subtitle>
          <v-card-actions>
            <v-btn @click="removeFromCart(item.id)">Remove</v-btn>
            <v-btn @click="increaseQuantity(item)">+</v-btn>
            <v-btn @click="decreaseQuantity(item)">-</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="text-right">
        <v-btn color="red" @click="clearCart">Clear Cart</v-btn>
        <v-divider></v-divider>
        <v-btn color="green">Checkout - ${{ cartTotal }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useCartStore } from '@/stores/useCartStore'

const cartStore = useCartStore()

// Cart items from the cart store
const cartItems = cartStore.items

// Cart total from the cart store
const cartTotal = cartStore.cartTotal

const removeFromCart = (productId) => {
  cartStore.removeFromCart(productId)
}

const increaseQuantity = (item) => {
  item.quantity += 1
  cartStore.addToCart(item)
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity -= 1
    cartStore.addToCart(item)
  }
}

const clearCart = () => {
  cartStore.clearCart()
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
