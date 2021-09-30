import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import routerGuard from './guard'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  // 找不到页面
  {
    path: '/404',
    name: 'notFound',
    meta: {
      title: '找不到页面'
    },
    component: () => import('@/views/not-found/not-found.vue')
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

routerGuard(router)

export default router
