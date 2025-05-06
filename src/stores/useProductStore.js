import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
  }),
  actions: {
    async fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        this.products = await res.json();
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    },
  },
});
