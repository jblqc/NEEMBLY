<template>
  <v-app>

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

import ProductList from '@/components/ProductList.vue'

</script>

<style scoped>
h1 {
  margin-bottom: 16px;
}
</style>