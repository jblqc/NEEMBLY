<template>
  <v-form @submit.prevent="handleSubmit" class="product-form">
    <v-card>
      <v-card-title class="text-h5">Add New Product</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="form.title"
          label="Product Title"
          :rules="[required]"
          clearable
          required
        />

        <v-text-field
          v-model.number="form.price"
          label="Price"
          type="number"
          min="0"
          step="0.01"
          :rules="[required, positiveNumber]"
          prefix="$"
          required
        />

        <v-text-field
          v-model="form.image"
          label="Image URL"
          :rules="[required, validUrl]"
          clearable
          required
        />

        <v-textarea
          v-model="form.description"
          label="Description"
          rows="2"
          auto-grow
          :rules="[required]"
          required
        />

        <v-select
          v-model="form.category"
          label="Category"
          :items="categories"
          :rules="[required]"
          required
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          type="submit"
          color="primary"
          size="large"
          :loading="isSubmitting"
        >
          Submit Product
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script setup>
import { ref } from 'vue'
import { useProductStore } from '@/stores/useProductStore'

const productStore = useProductStore()

const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing"
]

const form = ref({
  title: '',
  price: 0,
  image: '',
  description: '',
  category: ''
})

const isSubmitting = ref(false)

const required = (value) => !!value || 'This field is required'
const positiveNumber = (value) => value > 0 || 'Must be positive'
const validUrl = (value) => {
  try {
    new URL(value)
    return true
  } catch {
    return 'Invalid URL'
  }
}

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    
    // For FakeStoreAPI, we can't actually POST new products (it's read-only)
    // So we'll simulate adding to the local store
    const newProduct = {
      ...form.value,
      id: Date.now(), // Generate a temporary ID
      rating: { rate: 0, count: 0 } // Default rating
    }

    // Add to the beginning of the products array
    productStore.products.unshift(newProduct)

    // Reset form
    form.value = {
      title: '',
      price: 0,
      image: '',
      description: '',
      category: ''
    }

    alert('Product added successfully (local only - FakeStoreAPI is read-only)')
  } catch (error) {
    console.error('Error adding product:', error)
    alert('Failed to add product')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.product-form {
  max-width: 800px;
  margin: 0 auto;
}
</style>