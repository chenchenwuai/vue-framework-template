import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/404',
    component: () => import('@/views/frame-features/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/frame-features/401'),
    hidden: true
  }
]

export const NoMatchRouter = {
  path: '*', redirect: '/404', hidden: true
}

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
