<template>
  <v-container>
    <v-row v-if="cartItems.length > 0" class="gy-6">
      <!-- Left Column: Cart Items -->
      <v-col cols="12" md="8">
        <v-row>
          <v-col
            v-for="item in cartItems"
            :key="item.id"
            cols="12"
            md="6"
            lg="6"
          >
            <v-card  flat border class="cart-card">
              <v-row no-gutters>
                <v-col
                  cols="4"
                  class="d-flex align-center justify-center pa-2"
                >
                  <v-img
                    :src="item.image"
                    :alt="item.title"
                    height="120px"
                    contain
                    class="rounded-lg"
                  />
                </v-col>

                <v-col
                  cols="8"
                  class="py-4 pr-4 d-flex flex-column justify-space-between"
                >
                  <div>
                    <h3
                      class="text-subtitle-1 font-weight-medium mb-1 text-truncate"
                    >
                      {{ item.title }}
                    </h3>
                    <p class="text-body-2 text-grey-darken-1 mb-1">
                      ₱{{ item.price.toFixed(2) }}
                    </p>
                    <p class="text-caption text-grey-darken-2">
                      Quantity: {{ item.quantity }}
                    </p>
                  </div>
                  <div class="d-flex align-center mt-3 gap-2">
                    <v-btn icon size="xs" @click="decreaseQuantity(item)">
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <v-btn icon size="xs" @click="increaseQuantity(item)">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      icon
                      color="red"
                      size="small"
                      @click="removeFromCart(item)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- Right Column: Sticky Order Summary -->
      <v-col cols="12" md="4">
        <div class="order-summary-sticky">
          <v-card flat border>
            <v-card-title class="text-h6">Order Summary</v-card-title>
            <v-divider></v-divider>

            <v-card-text>
              <div class="d-flex justify-space-between mb-2">
                <span>Subtotal</span>
                <span>₱{{ cartTotal.toFixed(2) }}</span>
              </div>
              <div class="d-flex justify-space-between mb-2">
                <span>Shipping Estimate</span>
                <span>₱{{ shipping.toFixed(2) }}</span>
              </div>
              <v-divider class="my-2"></v-divider>
              <div class="d-flex justify-space-between font-weight-bold">
                <span>Order Total</span>
                <span>₱{{ (cartTotal + shipping).toFixed(2) }}</span>
              </div>
            </v-card-text>

            <v-card-actions class="pa-4 pt-0 flex-column">
              <v-btn
                block
                color="green"
                variant="elevated"
                @click="goToCheckout"
                :disabled="cartItems.length === 0"
              >
                <v-icon left>mdi-credit-card-outline</v-icon>
                Checkout
              </v-btn>
              <v-btn
                block
                color="red"
                variant="outlined"
                class="mt-2"
                @click="clearCart"
              >
                <v-icon left>mdi-trash-can-outline</v-icon>
                Clear Cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <!-- Empty Cart UI -->
    <v-row v-else>
      <v-col cols="12" class="text-center py-12">
        <v-icon size="64" color="grey">mdi-cart-off</v-icon>
        <div class="text-subtitle-1 mt-2">Your cart is empty</div>
      </v-col>
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
const shipping = 5.00

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
, didOpen: () => {
    const confirmBtn = document.querySelector('.swal2-confirm')
    const cancelBtn = document.querySelector('.swal2-cancel')
    if (confirmBtn) confirmBtn.style.color = 'white'
    if (cancelBtn) cancelBtn.style.color = 'white'
  }
}).then((result) => {
    if (result.isConfirmed) {
      cartStore.clearCart()
      showToast('Cart cleared successfully', 'success')
    }
  })
}
</script>
<style scoped>
.cart-card {
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.033);
  transition: transform 0.3s ease;
}
.cart-card:hover {
  transform: translateY(-4px);
}
.gap-2 {
  gap: 0.5rem;
}
.order-summary-sticky {
  position: sticky;

  top: 20px;
}

</style>
