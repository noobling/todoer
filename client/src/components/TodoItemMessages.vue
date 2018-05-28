<template>
<v-list v-if="messages" three-line>
  <template v-for="(message, index) in messages">
      <v-list-tile :key="index" avatar v-if="message.user">
        <v-list-tile-avatar>
          <v-btn icon @click="deleteMessage(message)" v-if="message.user._id === loggedInUser._id"><v-icon>close</v-icon></v-btn>      
          <img :src="userAvatar(message.user)" v-else>
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
  </template>
</v-list>
</template>

<script>
  import axios from 'axios'
  let utils = require('../js/utils')

  export default {
    props: ['todoItem'],

    created () {
      this.fetchMessages()
      this.fetchLoggedInUser()
      window.events.$on('AddedMessage', () => {
        this.fetchMessages()
      })
    },

    data () {
      return {
        messages: null,
        userAvatar: utils.userAvatar,
        loggedInUser: null
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
      },

      fetchLoggedInUser () {
        axios.get(window.HOST + '/loggedInUser', {withCredentials: true})
          .then(({data}) => { this.loggedInUser = data })
      },

      deleteMessage (message) {
        axios.delete(window.HOST + '/message/' + message._id)
          .then(() => {
            this.fetchMessages()
            // eslint-disable-next-line
            flash('Delete Message')
          })
      }
    }
  }
</script>