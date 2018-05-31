import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/pages/Dashboard'
import Home from '@/components/pages/Home'
import Signup from '@/components/pages/Signup'
import Login from '@/components/pages/Login'
import TodoList from '@/components/todolist/TodoList'
import TodoListCreate from '@/components/todolist/TodoListCreate'
import TodoItemCreate from '@/components/todoitem/TodoItemCreate'
import TodoListJoin from '@/components/todolist/TodoListJoin'
import ProfilePage from '@/components/profile/ProfilePage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/dashboard', component: Dashboard },
    { path: '/', component: Home },
    { path: '/signup', component: Signup },
    { path: '/login', component: Login },
    { path: '/profile/:userId', component: ProfilePage },
    { path: '/todoList/create', component: TodoListCreate },
    { path: '/todoList/join', component: TodoListJoin },
    { path: '/todoList/:todoListId', component: TodoList },
    { path: '/todoList/:todoListId/todoItem/create', component: TodoItemCreate }
  ]
})
