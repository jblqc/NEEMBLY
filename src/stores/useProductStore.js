import { defineStore } from "pinia";

export const useProductStore = defineStore("products", {
  state: () => ({
    products: [],
    categories: [],
    searchQuery: "",
    selectedCategory: null,
    minPrice: null,
    maxPrice: null,
    sortBy: "default",
    loading: false,
    error: null,
  }),
  actions: {
    async fetchProducts() {
      try {
        this.loading = true;
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        this.products = data;
        this.categories = [...new Set(data.map((product) => product.category))];
      } catch (error) {
        this.error = error.message;
        console.error("Error fetching products:", error);
      } finally {
        this.loading = false;
      }
    },
    async addProduct(product) {
      try {
        this.loading = true;
        // In a real app, you would POST to your API
        const newProduct = {
          ...product,
          id: Date.now(),
          rating: { rate: 0, count: 0 },
        };
        this.products.unshift(newProduct);
        return newProduct;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async updateProduct(updatedProduct) {
      try {
        this.loading = true;
        const index = this.products.findIndex(
          (p) => p.id === updatedProduct.id
        );
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async deleteProduct(productId) {
      try {
        this.loading = true;
        this.products = this.products.filter((p) => p.id !== productId);
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    getProductById(productId) {
      // Convert productId to number since route params are strings
      const id = Number(productId);
      return this.products.find((product) => product.id === id);
    },
  },
  getters: {
  
  },
});
