import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue' 
import Forgotpassword from '../views/Forgotpassword.vue'
import Uvjetikoristenja from '../views/Uvjetikoristenja.vue'
import Pravilaprivatnosti from '../views/Pravilaprivatnosti.vue'
import Daashboard from '../views/Daashboard.vue'
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