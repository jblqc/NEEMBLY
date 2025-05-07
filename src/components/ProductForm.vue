<template>
  <v-form @submit.prevent="handleSubmit" class="product-form">
    <v-card elevation="3" class="pa-6">
      <v-card-title class="text-h5 font-weight-bold pb-0">Add New Product</v-card-title>

      <v-card-text class="pt-4">
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.title"
              label="Product Title"
              :rules="[required]"
              clearable
              required
              variant="outlined"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model.number="form.price"
              label="Price"
              type="number"
              min="0"
              step="0.01"
              :rules="[required, positiveNumber]"
              prefix="₱"
              required
              variant="outlined"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="form.image"
              label="Image URL"
              :rules="[required, validUrl]"
              clearable
              required
              variant="outlined"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="form.description"
              label="Description"
              rows="2"
              auto-grow
              :rules="[required]"
              required
              variant="outlined"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="form.category"
              label="Category"
              :items="categories"
              :rules="[required]"
              required
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider class="my-4" />

      <v-card-actions>
        <v-spacer />
        <v-btn
          type="submit"
          color="primary"
          size="large"
          class="text-white"
          :loading="isSubmitting"
        >
          Submit Product
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/useProductStore'
import { useRouter } from 'vue-router'

import Swal from 'sweetalert2'

const productStore = useProductStore()
const router = useRouter()
const categories = [
  'electronics',
  'jewelery',
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
const loading = ref(false)
const error = ref(null)

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

    const newProduct = {
      ...form.value,
      id: Date.now(),
      rating: { rate: 0, count: 0 }
    }

    productStore.products.unshift(newProduct)

    const saved = JSON.parse(localStorage.getItem('localProducts') || '[]')
    saved.unshift(newProduct)
    localStorage.setItem('localProducts', JSON.stringify(saved))

    form.value = {
      title: '',
      price: 0,
      image: '',
      description: '',
      category: ''
    }

    await Swal.fire({
      icon: 'success',
      title: 'Product Added!',
      text: 'The product has been successfully saved locally.',
      confirmButtonColor: '#4caf50'
    })
        router.push('/')

  } catch (error) {
    console.error('Error adding product:', error)

    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to add product.',
      confirmButtonColor: '#f44336'
    })
  } finally {
    isSubmitting.value = false
  }
}


onMounted(async () => {
  try {
    loading.value = true
    await productStore.fetchProducts()

    const localProducts = JSON.parse(localStorage.getItem('localProducts') || '[]')
    if (localProducts.length > 0) {
      productStore.products.unshift(...localProducts)
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.product-form {
  max-width: 800px;
  margin: 2rem auto;
}
</style>
