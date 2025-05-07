<template>
  <v-app-bar flat color="white" height="64" class="px-4">
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" class="text-black" />

    <v-toolbar-title class="font-weight-medium text-h6">
      <router-link to="/" class="text-black text-decoration-none">NEEMBLY</router-link>
    </v-toolbar-title>

    <v-spacer />

    <!-- Desktop navigation: icon-only with tooltips -->
    <div class="d-none d-md-flex align-center">
      <v-tooltip v-for="item in navItems" :key="item.title" location="bottom">
        <template #activator="{ props }">
          <v-btn icon v-bind="props" :to="item.to" class="text-black">
            <v-icon :icon="item.icon" :color="item.color"/>
          </v-btn>
        </template>
        <span>{{ item.title }}</span>
      </v-tooltip>
    </div>

    <!-- Cart icon with badge -->
    <v-badge
      :content="cartStore.cartItemCount"
      :model-value="cartStore.cartItemCount > 0"
      color="green"
      overlap
      class="mr-3"
    >
      <v-btn icon @click="navigateToCart" class="text-black">
        <v-icon color="green">mdi-cart</v-icon>
      </v-btn>
    </v-badge>
  </v-app-bar>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/useCartStore'

const router = useRouter()
const cartStore = useCartStore()

const navItems = [
  { title: 'Home', icon: 'mdi-home', to: '/',color:'grey-darken-4' },
  { title: 'Products', icon: 'mdi-shopping', to: '/products', color: 'green-darken-2' },
  { title: 'Admin', icon: 'mdi-shield-account', to: '/admin',color: 'orange' },
]

const navigateToCart = () => {
  router.push('/cart')
}

defineEmits(['toggle-drawer'])
</script>

<style scoped>
.text-decoration-none {
  text-decoration: none;
}

.v-badge__badge {
  font-size: 10px;
  font-weight: 600;
  border-radius: 999px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
}
</style>
