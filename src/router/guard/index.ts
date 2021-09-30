/*
 * @Description: 路由守卫
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2021-09-30 09:41:33
 * @LastEditTime: 2021-09-30 09:48:50
 * @LastEditors: 安知鱼
 */
import { Router } from 'vue-router'
import Cache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

export default function routerGuard(router: Router) {
  router.beforeEach((to) => {
    document.title = `${to.meta.title} | 直播系统`
    if (to.path !== '/login') {
      const token = Cache.getCache('token')
      if (!token) {
        return '/login'
      }
    }

    // console.log(router.getRoutes())
    // console.log(to)

    if (to.path === '/main') {
      return firstMenu.url
    }
  })
}
