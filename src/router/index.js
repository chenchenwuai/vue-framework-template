import router, { constantRouterMap, NoMatchRouter } from './routers'
import Router from 'vue-router'
import Config from '@/settings'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['']// no redirect whitelist  ['/login']

/**
 * 路由前置守卫
 */
router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log('[ Router ] : ', from.path, '->', to.path)
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + Config.title
  }
  // TODO
  // code
  NProgress.done()
})

export const resetRouter = (asyncRouter) => {
  const allRouter = [...constantRouterMap, ...asyncRouter, NoMatchRouter]
  const newRouter = new Router({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes: allRouter
  })
  router.matcher = newRouter.matcher
}

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
