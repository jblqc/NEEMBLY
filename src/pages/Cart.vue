<template>
  <v-container>
    <v-row>
      <v-col v-for="item in cartItems" :key="item.id" cols="12" md="4">
        <v-card>
          <v-img :src="item.image" :alt="item.title" height="200px"></v-img>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-subtitle>${{ item.price }}</v-card-subtitle>
          <v-card-actions>
            <v-btn @click="removeFromCart(item)">Remove</v-btn>
            <v-btn @click="increaseQuantity(item)">+</v-btn>
            <v-btn @click="decreaseQuantity(item)">-</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="text-right">
        <v-btn color="red" @click="clearCart" class="mr-10">Clear Cart</v-btn>
<v-btn 
          color="green" 
          @click="goToCheckout"
          :disabled="cartItems.length === 0"
        >
          Checkout - ${{ cartTotal }}
        </v-btn>      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useCartStore } from '@/stores/useCartStore'
import Swal from 'sweetalert2'
import { computed } from 'vue'
import { useRouter } from "vue-router";

const cartStore = useCartStore()
const router = useRouter();

// Make cartItems reactive with computed
const cartItems = computed(() => cartStore.items)
const cartTotal = computed(() => cartStore.cartTotal)

const showToast = (title, icon = 'success') => {
  Swal.fire({
    position: "top-end",
    icon,
    title,
    showConfirmButton: false,
    timer: 1500,
    toast: true,
  })
}


const removeFromCart = (item) => {
 Swal.fire({
  title: 'Remove item?',
  text: `Are you sure you want to remove ${item.title} from your cart?`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#d33',
  cancelButtonColor: '#3085d6',
  confirmButtonText: 'Yes, remove it!',
  didOpen: () => {
    const confirmBtn = document.querySelector('.swal2-confirm')
    const cancelBtn = document.querySelector('.swal2-cancel')
    if (confirmBtn) confirmBtn.style.color = 'white'
    if (cancelBtn) cancelBtn.style.color = 'white'
  }
}).then((result) => {
    if (result.isConfirmed) {
      cartStore.removeFromCart(item.id)
      showToast(`${item.title} removed from cart`, 'error')
    }
  })
}

const increaseQuantity = (item) => {
  const newQuantity = item.quantity + 1
  cartStore.updateQuantity(item.id, newQuantity)
  showToast(`Increased ${item.title} quantity to ${newQuantity}`)
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    const newQuantity = item.quantity - 1
    cartStore.updateQuantity(item.id, newQuantity)
    showToast(`Decreased ${item.title} quantity to ${newQuantity}`)
  } else {
    // If quantity is 1, prompt to remove completely
    removeFromCart(item)
  }
}
const goToCheckout = () => {
  if (cartItems.value.length > 0) {
    router.push('/checkout')
  } else {
    showToast('Your cart is empty!', 'warning')
  }
}

const clearCart = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "This will remove all items from your cart!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, clear it!'
  }).then((result) => {
    if (result.isConfirmed) {
      cartStore.clearCart()
      showToast('Cart cleared successfully', 'success')
    }
  })
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>