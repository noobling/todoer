<template>
  <v-app dark id="inspire">
    <Navbar></Navbar>
    <router-view></router-view>
    <profile-dialog></profile-dialog>
    <Flash></Flash>
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
  data () {
    return {
      title: 'Vuetify.js'
    }
  },
  name: 'App'
}
</script>
