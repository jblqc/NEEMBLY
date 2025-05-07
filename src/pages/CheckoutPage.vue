<template>
  
  <v-container>
    <v-breadcrumbs :items="breadcrumbs" class="px-0">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
 <v-alert
      v-if="cartStore.cartItemCount === 0"
      type="warning"
      class="mb-6"
    >
      Your cart is empty! Please add items before checkout.
      <v-btn color="warning" variant="text" to="/" class="ml-2">
        Continue Shopping
      </v-btn>
    </v-alert>
        <template v-else>

    <v-row>
      <v-col cols="12" md="8">
        <v-card class="mb-6">
          <v-card-title>Shipping Information</v-card-title>
          <v-card-text>
            <v-form v-model="formValid">
              <v-text-field
                v-model="checkoutInfo.name"
                label="Full Name"
                :rules="[required]"
                required
              />
              <v-text-field
                v-model="checkoutInfo.email"
                label="Email"
                :rules="[required, email]"
                required
              />
              <v-text-field
                v-model="checkoutInfo.address"
                label="Address"
                :rules="[required]"
                required
              />
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="checkoutInfo.city"
                    label="City"
                    :rules="[required]"
                    required
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="checkoutInfo.zip"
                    label="ZIP Code"
                    :rules="[required]"
                    required
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title>Payment Method</v-card-title>
          <v-card-text>
            <v-radio-group v-model="paymentMethod">
              <v-radio
                label="Credit Card"
                value="credit"
              />
              <v-radio
                label="PayPal"
                value="paypal"
              />
              <v-radio
                label="Bank Transfer"
                value="bank"
              />
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Order Summary</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="item in cartStore.items"
                :key="item.id"
              >
                <template v-slot:prepend>
                  <v-img
                    :src="item.image"
                    width="60"
                    height="60"
                    class="mr-4"
                  />
                </template>
                
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>
                  ${{ item.price.toFixed(2) }} × {{ item.quantity }}
                </v-list-item-subtitle>
                
                <template v-slot:append>
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </template>
              </v-list-item>
              
              <v-divider class="my-2" />
              
              <v-list-item>
                <v-list-item-title>Subtotal</v-list-item-title>
                <template v-slot:append>
                  ${{ cartStore.formattedCartTotal }}
                </template>
              </v-list-item>
              
              <v-list-item>
                <v-list-item-title>Shipping</v-list-item-title>
                <template v-slot:append>
                  $5.00
                </template>
              </v-list-item>
              
              <v-list-item>
                <v-list-item-title class="font-weight-bold">Total</v-list-item-title>
                <template v-slot:append>
                  <span class="font-weight-bold">
                    ${{ (cartStore.cartTotal + 5).toFixed(2) }}
                  </span>
                </template>
              </v-list-item>
            </v-list>
            
            <v-btn
              color="primary"
              size="large"
              block
              @click="placeOrder"
              :loading="isPlacingOrder"
              :disabled="!formValid || cartStore.cartItemCount === 0"
            >
              Place Order
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row></template>
  </v-container>
</template>

<script setup>
import { ref,watch } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const breadcrumbs = [
  { title: 'Home', disabled: false, to: '/' },
  { title: 'Cart', disabled: false, to: '/cart' },
  { title: 'Checkout', disabled: true }
]

const formValid = ref(false)
const isPlacingOrder = ref(false)
const paymentMethod = ref('credit')

const checkoutInfo = ref({
  name: '',
  email: '',
  address: '',
  city: '',
  zip: ''
})

const required = (value) => !!value || 'Required'
const email = (value) => /.+@.+\..+/.test(value) || 'Invalid email'

const placeOrder = async () => {
  try {
    isPlacingOrder.value = true
    cartStore.setCheckoutInfo(checkoutInfo.value)
    
    // In a real app, you would process the payment here
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect to confirmation page
    router.push('/order-confirmation')
    cartStore.clearCart()
  } catch (error) {
    console.error('Order failed:', error)
  } finally {
    isPlacingOrder.value = false
  }
}
watch(() => cartStore.cartItemCount, (count) => {
  if (count === 0) {
    router.push('/cart')
  }
}, { immediate: true })

</script>