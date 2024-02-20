import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import CartPage from './views/CartPage.vue';
import ProductPage from './views/ProductPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage
    },
    {
      path: '/product/:id',
      component: ProductPage,
      props: true
    }
  ],
});

export default router;