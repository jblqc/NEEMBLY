<template>
  <v-navigation-drawer v-model="model" location="left">
    <v-list>
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :to="item.to"
      >
        <template v-slot:prepend>
          <v-icon :color="item.color">{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:open'])

const model = ref(props.open)

watch(() => props.open, (newVal) => {
  model.value = newVal
})

watch(model, (newVal) => {
  emit('update:open', newVal)
})

const navItems = [
   { title: 'Home', icon: 'mdi-home', to: '/',color:'grey-darken-4' },
  { title: 'Products', icon: 'mdi-shopping', to: '/products', color: 'green-darken-2' },
  { title: 'Admin', icon: 'mdi-shield-account', to: '/admin',color: 'orange' },
  { title: 'About', icon: 'mdi-information', to: '/about', color:'blue-grey-darken-1' },
]
</script>