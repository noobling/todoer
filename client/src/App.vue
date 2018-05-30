<template>
  <v-app :dark="darkTheme">
    <Navbar></Navbar>
    <router-view></router-view>
    <Flash></Flash>
    <v-footer class="blue darken-2 footer">
      <v-layout row wrap align-center>
          <v-spacer></v-spacer>        
          <div class="white--text mr-3">
            Made with
            <v-icon class="red--text">favorite</v-icon>
            by <a href="https://github.com/noobling" target="_blank" class="link">David</a>
            and Thai
          </div>
      </v-layout>
    </v-footer>
  </v-app>
</template>
   
<script>
import Navbar from '@/components/Navbar'
import Flash from '@/components/Flash'

export default {
  components: {
    Navbar,
    Flash
  },

  created () {
    window.events.$on('ThemeChange', darkTheme => {
      this.darkTheme = darkTheme
    })
  },

  data () {
    return {
      title: 'Todoer',
      darkTheme: true
    }
  },
  name: 'App'
}
</script>

<style scoped>
  .link {
    text-decoration: 1px dotted white;
    color: white;
    transition: all 1000ms
  }
  .link:hover {
    text-decoration: none
  }
  .footer {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
</style>
