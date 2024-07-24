import { createRouter, createWebHistory } from 'vue-router'
import Rush6Order from '@/views/Rush6Order.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'rush6',
      component: Rush6Order
    }
  ]
})

export default router
