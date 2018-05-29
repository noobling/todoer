<template>
<v-menu offset-y v-if="items">
  <v-btn slot="activator" icon>
    <v-badge left>
      <span slot="badge" v-if="items.length > 0">{{items.length}}</span>
      <v-icon>notifications</v-icon>
    </v-badge>
  </v-btn>
  <v-list>
    <div v-if="items.length > 0">
      <v-list-tile v-for="(item, index) in items" :key="index" @click="view(item)">
        <v-list-tile-title>{{ item.message }}</v-list-tile-title>
      </v-list-tile>
    </div>
    
    <div v-else>
      <v-list-tile>
        <v-list-tile-title>All caught up! <v-icon>tag_faces</v-icon></v-list-tile-title>
      </v-list-tile>
    </div>
   
  </v-list>
</v-menu> 
</template>

<script>
import axios from 'axios'
import Pusher from 'pusher-js'

export default {
  props: ['user'],

  created () {
    this.fetchNotifications()

    Pusher.logToConsole = true

    this.pusher = new Pusher('779f9709b78f6c1b0f60', {
      cluster: 'ap1',
      encrypted: true
    })

    const channel = this.pusher.subscribe('user-' + this.user._id)
    channel.bind('new-notification', (data) => {
      // eslint-disable-next-line
      flash(data.message)
      this.fetchNotifications()
    })
  },

  data () {
    return {
      items: null,
      pusher: null
    }
  },

  methods: {
    fetchNotifications: function () {
      axios.get(window.HOST + '/notifications', { withCredentials: true })
        .then(({data}) => { this.items = data })
    },
    view: function (notification) {
      axios(window.HOST + '/notification/' + notification._id + '/read', {
        method: 'POST',
        withCredentials: true
      }).then(() => {
        this.fetchNotifications()
        this.$router.push(notification.route)
      })
    }
  }
}
</script>