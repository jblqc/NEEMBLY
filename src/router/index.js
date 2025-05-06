import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Admin from "@/pages/Admin.vue";
import Cart from "@/pages/Cart.vue";
import ProductList from "@/components/ProductList.vue";
import ProductDetail from "@/components/ProductDetail.vue";
import CheckoutPage from "@/pages/CheckoutPage.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/products",
    name: "products",
    component: ProductList,
  },
  {
    path: "/products/:id",
    name: "product-detail",
    component: ProductDetail,
    props: true,
  },
  
  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutPage,
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
