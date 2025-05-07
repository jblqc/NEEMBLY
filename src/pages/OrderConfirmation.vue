<template>
  <v-container class="text-center">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-6">
          <v-icon color="green" size="64">mdi-check-circle</v-icon>
          <h2 class="my-4">Thank you for your order!</h2>
          <p>Your order has been successfully placed. A confirmation email has been sent to <strong>{{ checkoutInfo.email }}</strong>.</p>

          <v-divider class="my-6" />

          <v-card-title class="text-left">Order Summary</v-card-title>
          <v-list class="text-left">
            <v-list-item
              v-for="item in cartStore.checkoutInfo.items"
              :key="item.id"
            >
              <template v-slot:prepend>
                <v-img :src="item.image" width="50" height="50" class="mr-4" />
              </template>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle>₱{{ item.price.toFixed(2) }} × {{ item.quantity }}</v-list-item-subtitle>
              <template v-slot:append>
                ₱{{ (item.price * item.quantity).toFixed(2) }}
              </template>
            </v-list-item>

            <v-divider class="my-2" />

            <v-list-item>
              <v-list-item-title>Subtotal</v-list-item-title>
<template v-slot:append>
  ₱{{ (cartStore.cartTotal ?? 0).toFixed(2) }}
</template>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Shipping</v-list-item-title>
              <template v-slot:append>₱5.00</template>
            </v-list-item>

            <v-list-item>
              <v-list-item-title class="font-weight-bold">Total</v-list-item-title>
              <template v-slot:append class="font-weight-bold">
₱{{ ((cartStore.cartTotal ?? 0) + 5).toFixed(2) }}
              </template>
            </v-list-item>
          </v-list>

          <v-divider class="my-6" />

        <v-btn color="primary" class="mr-4" @click="goToHomeAndClearCart">Back to Home</v-btn>
<v-btn variant="outlined"@click="goToHomeAndClearCart">Continue Shopping</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useCartStore } from '@/stores/useCartStore'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

// Checkout info was already stored during placeOrder()
const checkoutInfo = cartStore.checkoutInfo

const goToHomeAndClearCart = () => {
  cartStore.clearCart()
  router.push('/')
}
</script>