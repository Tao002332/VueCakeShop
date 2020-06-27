import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/admins',
    name: 'User',
    meta: { title: '用户模块', icon: 'user' },
    children: [
      {
        path: 'Admins',
        name: 'Admins',
        component: () => import('@/views/table/admins'),
        meta: { title: '管理员管理', icon: 'table' }
      },
      {
        path: 'Users',
        name: 'Users',
        component: () => import('@/views/table/users'),
        meta: { title: '用户管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/cates',
    name: 'Product',
    meta: { title: '商品模块', icon: 'example' },
    children: [
      {
        path: 'Cates',
        name: 'Cates',
        component: () => import('@/views/table/productCates'),
        meta: { title: '分类管理', icon: 'table' }
      },
      {
        path: 'Spus',
        name: 'Spus',
        component: () => import('@/views/table/productSpus'),
        meta: { title: 'SPU管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/Property',
    component: Layout,
    redirect: '/Property/keys',
    name: 'Property',
    meta: { title: '属性模块', icon: 'example' },
    children: [
      {
        path: 'Keys',
        name: 'Keys',
        component: () => import('@/views/table/propertyKeys'),
        meta: { title: '属性名管理', icon: 'table' }
      }

    ]
  },
  {
    path: '/Order',
    component: Layout,
    redirect: '/Order/orders',
    name: 'Order',
    meta: { title: '订单模块', icon: 'example' },
    children: [
      {
        path: 'Orders',
        name: 'Orders',
        component: () => import('@/views/table/orders'),
        meta: { title: '订单管理', icon: 'table' }
      }

    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
