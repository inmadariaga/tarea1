import { createRouter, createWebHistory } from 'vue-router'
import Users from '../views/Users.vue'
import Cities from '../views/Cities.vue'
import UserDetails from '../views/UserDetails.vue'
import CityDetails from '../views/CityDetails.vue'

const routes = [
  {
    path: '/',
    name: 'users',
    component: Users
  },
  {
    path: '/cities',
    name: 'cities',
    component: Cities
  },
  {
    path: '/users/:id',
    name: 'UserDetails',
    props: true,
    component: UserDetails
  },
  {
    path: '/cities/:id',
    name: 'CityDetails',
    props: true,
    component: CityDetails
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
