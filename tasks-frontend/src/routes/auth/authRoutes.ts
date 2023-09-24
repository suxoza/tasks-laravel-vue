import { RouteRecordRaw } from 'vue-router'
import { requireGuest } from '../auth'

const Login = () => import('@/views/auth/Login.vue')
const Register = () => import('@/views/auth/Register.vue')

const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: requireGuest
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: requireGuest
  }
]

export default authRoutes
