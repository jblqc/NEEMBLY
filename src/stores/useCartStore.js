import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("cart")) || [],
    checkoutInfo: null,
  }),
  actions: {
    addToCart(product) {
      const existingProduct = this.items.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
      this.saveCart();
    },
    removeFromCart(productId) {
      this.items = this.items.filter((item) => item.id !== productId);
      this.saveCart();
    },
    updateQuantity(productId, quantity) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity;
        this.saveCart();
      }
    },
    clearCart() {
      this.items = [];
      this.saveCart();
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.items));
    },
    setCheckoutInfo(info) {
      this.checkoutInfo = info;
    },
  },
  getters: {
    cartTotal() {
      return this.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    cartItemCount() {
      return this.items.reduce((count, item) => count + item.quantity, 0);
    },
    formattedCartTotal() {
      return this.cartTotal.toFixed(2);
    },
  },
});
