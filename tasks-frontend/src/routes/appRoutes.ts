// appRoutes.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import taskRoutes from './task/taskRoutes'
import authRoutes from './auth/authRoutes'
import { logout } from '@/requests/authRequests'
import { useUserStore } from '@/stores/userStore'

const routes: RouteRecordRaw[] = [
  {
    path: '/logout',
    name: 'logout',
    redirect: '',
    beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      try {
        const response = logout()
        const userStore = useUserStore()
        userStore.delUser()
        next({ name: 'login' })
      } catch (error) {}
    }
  },
  ...authRoutes,
  ...taskRoutes
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
