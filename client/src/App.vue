<template>
  <v-app :dark="darkTheme">
    <Navbar></Navbar>
    <transition name="bounce">
      <router-view></router-view>    
    </transition>
    <Flash></Flash>
    <v-footer class="blue darken-2 footer">
      <v-layout row wrap align-center>
          <v-spacer></v-spacer>        
          <div class="white--text mr-3">
            Made with
            <v-icon class="red--text">favorite</v-icon>
            by <a href="https://github.com/noobling" target="_blank" class="user-link" style="color: white;">David</a>
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

<style>
  .user-link {
    text-decoration: 1px dotted white;
    color: white !important;
    transition: all 1000ms
  }
  .user-link:hover {
    text-decoration: none
  }
  .footer {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
  .bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.spacer {
  height: 50px;
}
</style>
