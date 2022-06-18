import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { Notification } from "element-ui";
import 'nprogress/nprogress.css'
import nprogress from "nprogress"
import store from '../store'

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
    component: () => import('../views/GoodsView.vue')
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

router.beforeEach((to, from, next) => {
  nprogress.start();
  if(window.sessionStorage.getItem("useid")){
    store.commit("update_date")
  }
  if(window.sessionStorage.getItem("useid") && to.path=="/Login_Register"){
    Notification({
          title:"出错",
          message: "你已经登录过了,请勿重复登录",
          type: "warning"
      });
    next(from.path)
    nprogress.done();
  }
  // 如果用户未能验证身份，则 `next` 会被调用两次
  next()
})

router.afterEach((to, from) => {
  nprogress.done();
})

export default router
