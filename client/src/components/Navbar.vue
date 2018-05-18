<template>
<div>
  <div v-if="loggedIn">
    <v-navigation-drawer
      persistent
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          @click=""
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
  <div v-if="loggedIn">
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
  </div>
    <router-link to="/">
      <v-btn flat>Home</v-btn>
    </router-link>

    <router-link to="/dashboard">
      <v-btn flat>
        Dashboard
      </v-btn>
    </router-link>   
  </v-toolbar>
</div>
    
</template>
<script>
export default {
  created () {
    window.events.$on('loggedInStateChange', () => {
      console.log('got event')
      this.loggedIn = window.loggedIn
    })
  },
  data () {
    return {
      loggedIn: window.loggedIn,
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'settings',
          title: 'Settings'
        },
        {
          icon: 'dashboard',
          title: 'Dashboard'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>