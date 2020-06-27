import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('@/views/Home')
        },
        {
          path: 'Shop',
          name: 'Shop',
          component: () => import('@/views/Shop')
        },
        {
          path: 'ShopDetail',
          name: 'ShopDetail',
          component: () => import('@/views/Shop/shopDetail')
        },
        {
          path: 'CheckOut',
          name: 'CheckOut',
          component: () => import('@/views/Shop/checkOut')
        },
        {
          path: 'Login',
          name: 'Login',
          component: () => import('@/views/Login')
        },
        {
          path: 'ChangePwd',
          name: 'ChangePwd',
          component: () => import('@/views/User/changePwd')
        },
        {
          path: 'Register',
          name: 'Register',
          component: () => import('@/views/User/register')
        },
        {
          path: 'Order',
          name: 'Order',
          component: () => import('@/views/Order')
        }
      ]
    }
  ]
})
