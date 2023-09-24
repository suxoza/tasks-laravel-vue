import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

export const requireAuth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const userStore = useUserStore()
  if (userStore.isAuthenticated) {
    next()
  } else {
    next('/login')
  }
}

export const requireGuest = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const userStore = useUserStore()
  if (userStore.isAuthenticated) {
    next({ name: 'task-list' })
  } else {
    next()
  }
}
