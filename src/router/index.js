import { createRouter, createWebHistory } from 'vue-router';
import GaoleOrder from '@/views/GaoleOrder.vue';
import HomeView from '@/views/HomeView.vue';
import NotFound from '@/views/NotFound.vue';
import TheManual from '@/views/TheManual.vue';
import TheSupport from '@/views/TheSupport.vue';

const routes = [
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
  {
    path: '/manual',
    name: 'manual',
    component: TheManual
  },
  {
    path: '/support',
    name: 'support',
    component: TheSupport
  },
  { path: '/:pathMatch(.*)', name: 'NotFound', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
