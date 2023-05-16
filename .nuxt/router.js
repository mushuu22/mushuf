import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _44f3ba2a = () => interopDefault(import('../pages/tasks/new/index.vue' /* webpackChunkName: "pages/tasks/new/index" */))
const _14f13f45 = () => interopDefault(import('../pages/tasks/taskDetails.vue' /* webpackChunkName: "pages/tasks/taskDetails" */))
const _0fa5b7e1 = () => interopDefault(import('../pages/tasks/taskUpdateDelete.vue' /* webpackChunkName: "pages/tasks/taskUpdateDelete" */))
const _92ce52ca = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/tasks/new",
    component: _44f3ba2a,
    name: "tasks-new"
  }, {
    path: "/tasks/taskDetails",
    component: _14f13f45,
    name: "tasks-details"
  }, {
    path: "/tasks/:id/edit",
    component: _0fa5b7e1,
    name: "task-update-delete"
  }, {
    path: "/",
    component: _92ce52ca,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
