import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Home from '@/components/Home'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import TodoList from '@/components/TodoList'
import Profile from '@/components/Profile'
import TodoListCreate from '@/components/TodoListCreate'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/dashboard', component: Dashboard },
    { path: '/', component: Home },
    { path: '/signup', component: Signup },
    { path: '/login', component: Login },
    { path: '/todolist/create', component: TodoListCreate },
    { path: '/todolist/:todolistId', component: TodoList },
    { path: '/profile/:userId', component: Profile }
  ]
})
