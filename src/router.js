import Vue from 'vue'
import Router from 'vue-router'
import initRoutes from '@/router/init'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: initRoutes
})

export default router
