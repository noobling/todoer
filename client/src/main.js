// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.prototype.loggedIn = false

// The global event bus where we pass data between components
window.events = new Vue()

window.HOST = 'http://localhost:3000/api' // For dev
// window.HOST = '/api' // For production

window.axios = require('axios')

window.axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true

window.flash = (message, type = 'success') => {
  window.events.$emit('Flash', {message, type})
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
