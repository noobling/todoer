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
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" >
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
      </v-list>
    </v-navigation-drawer>
  </div>  
  <v-toolbar
    app
    :clipped-left="clipped"
  >
  <div v-if="user">
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
  </div>
    <v-btn flat to="/">Home</v-btn>

    <v-btn flat to="/dashboard">
      Dashboard
    </v-btn>
  </v-toolbar>
</div>
    
</template>
<script>
import axios from 'axios'

export default {
  created () {
    ['NewRegistraion', 'Login'].forEach(event => {
      window.events.$on(event, user => {
        this.user = user
      })
    })

    this.fetchUser()
  },
  data () {
    return {
      user: '',
      loggedIn: window.loggedIn,
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'settings',
          title: 'Settings',
          action: '/login'
        },
        {
          icon: 'dashboard',
          title: 'Dashboard',
          action: '/signup'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },

  methods: {
    fetchUser () {
      axios(window.HOST + '/loggedInUser', {
        method: 'GET',
        withCredentials: true
      }).then(({ data }) => {
        this.user = data
      })
    }
  }
}
</script>