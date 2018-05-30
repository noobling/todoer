<template>
<div>
  <div v-if="user">
    <v-navigation-drawer
      persistent
      v-model="drawer"
      fixed
      app
    >
    <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar @click="profile">
            <v-list-tile-avatar>
              <img :src="userAvatar(user)" >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ user.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          @click=""
          :to="item.action"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-group>
          <v-list-tile slot="activator">
            <v-list-tile-title>Your Todo Lists</v-list-tile-title>
          </v-list-tile>
          <v-list-tile 
            v-for="(todoList, i) in ownerTodoLists"
            :key="i"
            :to="'/todolist/' + todoList._id"
          >
            <v-list-tile-title>{{todoList.name}}</v-list-tile-title>
          </v-list-tile>
        </v-list-group>

        <v-list-group>
          <v-list-tile slot="activator">
            <v-list-tile-title>Todo Lists Participating In</v-list-tile-title>
          </v-list-tile>
          <v-list-tile 
            v-for="(todoList, i) in participatingTodoLists"
            :key="i"
            :to="'/todolist/' + todoList._id"
          >
            <v-list-tile-title>{{todoList.name}}</v-list-tile-title>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>  
  <v-toolbar
    app
    :clipped-left="clipped"
  >
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="user"></v-toolbar-side-icon>
      <v-btn flat :to="user? '/dashboard': '/'">
        Home
      </v-btn>
    <v-spacer></v-spacer>    
        <v-btn to="/login" flat v-if="!user">Log In</v-btn>
      <notifications :user="user" v-if="user"></notifications>
      
      <v-btn flat @click="logout" v-if="user">Logout</v-btn>
    
    <div>
    <v-switch
      class="mt-4"
      v-model="darkTheme"
    ></v-switch>
    </div>
    
  </v-toolbar>
</div>
    
</template>
<script>
import axios from 'axios'
import Notifications from './Notifications'
const utils = require('../js/utils')

export default {
  components: { Notifications },

  created () {
    ['NewRegistration', 'Login'].forEach(event => {
      window.events.$on(event, user => {
        this.user = user
        window.user_id = user._id
      })
    })

    window.events.$on('JoinedTodoList', () => {
      this.fetchUserTodoLists()
    })

    window.events.$on('TodoListCreated', () => {
      this.fetchUserTodoLists()
    })

    this.fetchUser()
  },

  watch: {
    user: function (val) {
      this.fetchUserTodoLists()
    },
    darkTheme: function (val) {
      window.events.$emit('ThemeChange', this.darkTheme)
    }
  },

  data () {
    return {
      user: '',
      loggedIn: window.loggedIn,
      clipped: false,
      drawer: true,
      fixed: false,
      ownerTodoLists: [],
      participatingTodoLists: [],
      userAvatar: utils.userAvatar,
      items: [
        {
          icon: 'dashboard',
          title: 'Dashboard',
          action: '/dashboard'
        },
        {
          icon: 'add',
          title: 'Create Todo List',
          action: '/todolist/create'
        },
        {
          icon: 'group',
          title: 'Join Todo List',
          action: '/todolist/join'
        },
        {
          icon: 'settings',
          title: 'Settings',
          action: '/login'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Todoer',
      darkTheme: true
    }
  },

  methods: {
    fetchUser () {
      axios(window.HOST + '/loggedInUser', {
        method: 'GET',
        withCredentials: true
      }).then(({ data }) => {
        this.user = data
        window.user_id = data._id
      })
    },

    logout () {
      axios(window.HOST + '/logout', {
        method: 'GET',
        withCredentials: true
      }).then(() => {
        this.user = null
        this.$router.push('/')
      })
    },

    fetchUserTodoLists () {
      axios(window.HOST + '/user/todoLists', {
        method: 'GET',
        withCredentials: true
      }).then(({data}) => {
        this.ownerTodoLists = []
        this.participatingTodoLists = []
        data.forEach(todoList => {
          if (todoList.owner === this.user._id) {
            this.ownerTodoLists.push(todoList)
          } else {
            this.participatingTodoLists.push(todoList)
          }
        })
      })
    },

    profile: function () {
      this.$router.push('/profile/' + this.user._id)
    }
  }
}
</script>