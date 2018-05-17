import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Home from '@/components/Home'
import Signup from '@/components/Signup'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/dashboard', component: Dashboard },
    { path: '/', component: Home },
    { path: '/signup', component: Signup }
  ]
})
