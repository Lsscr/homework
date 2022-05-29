import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/goods',
    name: 'goods',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/GoodsView.vue')
  },
  {
    path: '/Login_Register',
    name: 'Login_Register',
    component: () => import('@/views/Login_Register_View')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/Order')
  }
]

const router = new VueRouter({
  routes
})

export default router
