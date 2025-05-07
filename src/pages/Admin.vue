<template>
  <v-container>
      <v-card-title class="text-h5 font-weight-bold pb-0">Sample Admin Panel</v-card-title>
    <v-card-subtitle class="text-body-1 text-grey-darken-1">
        Fill out the details below to create a new product. Your product will be stored locally.
    </v-card-subtitle>

   
    <ProductForm />
  </v-container>
</template>

<script setup>
import ProductForm from '@/components/ProductForm.vue'
</script>

<style scoped>
h1 {
  margin-bottom: 16px;
}
</style>
