<template>
  <v-app>
    <!-- Navbar Component -->
    <Navbar @toggle-drawer="toggleDrawer" />
    
    <AppDrawer v-model="drawer" />
    
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import AppDrawer from '@/components/AppDrawer.vue'

const drawer = ref(false)

const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>