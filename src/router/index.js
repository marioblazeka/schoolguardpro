import Vue from 'vue'
import VueRouter from 'vue-router'

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
    component: Dashboard
  },
  {
    path: '/unosi',
    name: 'Unosi',
    component: Unosi
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router