<template>
  <v-app>
    <!-- Navbar Component -->
    <Navbar @toggle-drawer="drawer = !drawer" />
    
    <AppDrawer v-model="drawer" />
    
    <!-- Main Content -->
    <v-main>
      <v-container>
        <h1>Home Page</h1>
        <ProductList />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import AppDrawer from '@/components/AppDrawer.vue'
import ProductList from '@/components/ProductList.vue'

const drawer = ref(false)
</script>

<style scoped>
h1 {
  margin-bottom: 16px;
}
</style>