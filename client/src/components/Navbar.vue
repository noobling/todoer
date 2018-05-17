<template>
<div>
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
  <v-toolbar
    app
    :clipped-left="clipped"
  >
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
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
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'settings',
        title: 'Settings'
      }, {
        icon: 'dashboard',
        title: 'Dashboard'
      }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  name: 'Dashboard'
}
</script>