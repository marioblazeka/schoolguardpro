import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import UvjetiKoristenja from '../views/Uvjetikoristenja.vue'
import PravilaPrivatnosti from '../views/Pravilaprivatnosti.vue'
import Dashboard from '../views/Dashboard.vue'
import Unosi from '../views/Unosi.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/uvjetikoristenja',
    name: 'UvjetiKoristenja',
    component: UvjetiKoristenja
  },
  {
    path: '/pravilaprivatnosti',
    name: 'PravilaPrivatnosti',
    component: PravilaPrivatnosti
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/unosi',
    name: 'Unosi',
    component: Unosi,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

function getCurrentUser() {
  return new Promise(resolve => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe()
      resolve(user)
    })
  })
}

router.beforeEach(async (to, from, next) => {
  if (!to.matched.some(route => route.meta.requiresAuth)) {
    next()
    return
  }

  const user = await getCurrentUser()
  next(user ? undefined : { name: 'Login', query: { redirect: to.fullPath } })
})