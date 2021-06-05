import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '/src/views/Home.vue'
import Register from '/src/views/Register.vue'
import Tournaments from '/src/views/Tournaments.vue'
import Teams from '/src/views/Teams.vue'
import addTournament from '/src/views/AddTournament.vue'
import PageNotFound from '/src/views/PageNotFound.vue'
import Details from '/src/views/Details.vue'
import Logout from '/src/views/Logout.vue'
import myTournaments from '/src/views/myTournaments.vue'
import User from '/src/views/User.vue'
import AddTeam from '/src/views/AddTeam.vue'
import '/src/assets/css/global.css';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresVisitor: true,
    }

  },
  {
    path: '/addteam',
    name: 'AddTeam',
    component: AddTeam,
    meta: {
      requiresRank: 2,
    }

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
  },
  {
    path: '/mytournaments',
    name: 'myTournaments',
    component: myTournaments,
    meta: {
      requiresRank: 2,
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/addtournament',
    name: 'addTournament',
    component: addTournament,
    meta: {
      requiresRank: 2,
    }
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: User,
    props: true,
    meta: {
      requiresRank: 2,
    }
  },
  {
    path: '/tournaments/:tournamentId/details',
    name: 'details',
    component: Details,
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    component: PageNotFound,
    name: 'PageNotFound'
  },

]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
