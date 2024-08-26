import { createRouter, createWebHistory } from 'vue-router';
import GaoleOrder from '@/views/GaoleOrder.vue';
import HomeView from '@/views/HomeView.vue';
import NotFound from '@/views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/order/:id',
      name: 'GaoleOrder',
      component: GaoleOrder
    },
    { path: '/:pathMatch(.*)', name: 'NotFound', component: NotFound }
  ]
});

export default router;
