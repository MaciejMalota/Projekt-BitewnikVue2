import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '/src/views/Home.vue'
import Register from '/src/views/Register.vue'
import Tournaments from '/src/views/Tournaments.vue'
import Teams from '/src/views/Teams.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/tournaments',
    name: 'Tournaments',
    component: Tournaments
  },
  {
    path: '/teams',
    name: 'Teams',
    component: Teams
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
