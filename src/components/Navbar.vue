<template>
  <v-app-bar app color="primary" dark>
    <!-- Mobile menu button -->
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')"></v-app-bar-nav-icon>

    <!-- App title/logo -->
    <v-toolbar-title>
      <router-link to="/" class="text-white text-decoration-none">
        My E-Commerce
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Desktop navigation links -->
    <div class="d-none d-md-flex">
      <v-btn
        v-for="item in navItems"
        :key="item.title"
        :to="item.to"
        variant="text"
        class="text-white"
      >
        <v-icon start :icon="item.icon"></v-icon>
        {{ item.title }}
      </v-btn>
    </div>

    <!-- Cart button with badge -->
    <v-badge
      :content="cartStore.cartItemCount"
      :model-value="cartStore.cartItemCount > 0"
      color="red"
      overlap
    >
      <v-btn icon @click="navigateToCart">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-badge>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/useCartStore";

const router = useRouter();
const cartStore = useCartStore();

const navItems = [
  { title: "Home", icon: "mdi-home", to: "/" },
  { title: "Products", icon: "mdi-shopping", to: "/products" },
  { title: "About", icon: "mdi-information", to: "/about" },
];

const navigateToCart = () => {
  router.push("/cart");
};

defineEmits(["toggle-drawer"]);
</script>

<style scoped>
.text-decoration-none {
  text-decoration: none;
}

/* Custom badge styling */
</style>
