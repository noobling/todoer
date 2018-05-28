<template>
<v-list v-if="messages">
  <v-list-tile v-for="(message, index) in messages" :key="index" v-if="message.user">
    <v-list-tile-avatar>
      <img :src="userAvatar(message.user)">
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>
        {{ message.user.name }}
      </v-list-tile-title>
      <v-list-tile-sub-title>
        {{ message.message }}
      </v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</v-list>
</template>

<script>
  import axios from 'axios'
  let utils = require('../js/utils')

  export default {
    props: ['todoItem'],

    created () {
      this.fetchMessages()
      window.events.$on('AddedMessage', () => {
        this.fetchMessages()
      })
    },

    data () {
      return {
        messages: null,
        userAvatar: utils.userAvatar
      }
    },

    watch: {
      todoItem: function () {
        this.fetchMessages()
      }
    },

    methods: {
      fetchMessages: function () {
        axios.get(window.HOST + '/todoItem/' + this.todoItem._id + '/messages')
          .then(({data}) => {
            this.messages = data
            for (let i = 0; i < data.length; i++) {
              this.fetchUser(data[i], i)
            }
          })
      },

      fetchUser (message, index) {
        axios.get(window.HOST + '/user/' + message.user)
          .then(({data}) => { this.messages[index].user = data })
      }
    }
  }
</script>