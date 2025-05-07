<template>
  <v-card flat border class="product-card" >
    <div class="image-container" @click="navigateToProduct">
      <v-img
        :src="product.image"
        alt="Product image"
        aspect-ratio="1"
        cover
        class="rounded-t-xl"
      ></v-img>

      <!-- Gradient Overlay -->
      <div class="gradient-overlay"></div>
    </div>

    <v-card-item class="pt-4 px-4">
      <v-card-title class="text-body-1 font-weight-medium text-wrap mb-1">
        {{ product.title }}
      </v-card-title>

      <v-card-subtitle class="text-subtitle-1 font-weight-bold d-flex align-center">
        ₱{{ product.price.toFixed(2) }}
        <v-chip
          v-if="product.rating"
          class="ml-2"
          size="small"
          color="amber"
          text-color="amber"
        >
          {{ product.rating.rate }} ★
        </v-chip>
      </v-card-subtitle>
    </v-card-item>

    <v-card-actions class="px-4 pb-4 pt-0">
      <v-btn
      block
      variant="flat"
      color="surface-light"
      rounded
      @click="addToCart"
    >
      Add to cart
    </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/useCartStore";
import Swal from "sweetalert2";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const cartStore = useCartStore();
const isAddingToCart = ref(false);

const navigateToProduct = () => {
  router.push({ name: "product-detail", params: { id: props.product.id } });
};

const addToCart = (event) => {
  event.stopPropagation();
  isAddingToCart.value = true;
  try {
    cartStore.addToCart(props.product);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${props.product.title} added to cart`,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
    });
  } finally {
    isAddingToCart.value = false;
  }
};
</script>
<style scoped>
.product-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
  border-radius: 12px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.052);
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.141);
}

.image-container {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.gradient-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.05),
    rgba(var(--v-theme-surface), 1)
  );
  pointer-events: none;
}

.clickable-area {
  cursor: pointer;
  flex-grow: 1;
}

.product-image {
  object-fit: contain;
  background: #f5f5f5;
  padding: 1rem;
}

.v-card-actions {
  margin-top: auto;
}
</style>
