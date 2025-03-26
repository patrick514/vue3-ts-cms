import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { fi } from 'element-plus/es/locales.mjs'
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    { path: '/login', component: () => import('../views/login/Login.vue') },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue'),
    },
  ],
})


// router.addRoute('main',localRouter[0])
// router.addRoute('main', localRouter[1])

//导航守卫
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }

  // 如果是进入到main 路由拦截
  if (to.path === '/main') {
    return firstMenu.url
  }
})
export default router
