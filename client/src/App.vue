<template>
  <v-app dark id="inspire">
    <Navbar></Navbar>
    <router-view></router-view>
  </v-app>
</template>
   
<script>
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  },
  data () {
    return {
      title: 'Vuetify.js'
    }
  },
  name: 'App'
}
</script>
