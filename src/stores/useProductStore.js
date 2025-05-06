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
  },
  getters: {
    filteredProducts() {
      let filtered = [...this.products];

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (product) =>
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
      }

      // Filter by category
      if (this.selectedCategory) {
        filtered = filtered.filter(
          (product) => product.category === this.selectedCategory
        );
      }

      // Filter by price range
      if (this.minPrice) {
        filtered = filtered.filter((product) => product.price >= this.minPrice);
      }
      if (this.maxPrice) {
        filtered = filtered.filter((product) => product.price <= this.maxPrice);
      }

      // Sort products
      switch (this.sortBy) {
        case "price-low":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filtered.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
        default:
          // Keep original order
          break;
      }

      return filtered;
    },
    productCount() {
      return this.filteredProducts.length;
    },
  },
});
