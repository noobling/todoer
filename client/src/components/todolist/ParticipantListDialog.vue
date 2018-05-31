<template>
  <v-dialog v-model="dialog" max-width="400" v-if="todoList">
    <v-card>
      <v-card-title class="title">
        Participants List
        <v-spacer></v-spacer> 
        <v-btn icon @click="dialog=false"><v-icon>close</v-icon></v-btn>
      </v-card-title>

      <v-list two-line v-if="!loading">
        <v-list-tile v-for="(participant, index) in participants" :key="index" @click="profile(participant)">
          <v-list-tile-avatar v-if="participant">
            <img :src="userAvatar(participant)">
          </v-list-tile-avatar>
          <v-list-tile-content v-if="participant">
            <v-list-tile-title v-if="participant._id === todoList.owner">{{ participant.name }} <v-icon>person</v-icon></v-list-tile-title>
            <v-list-tile-title v-else>{{ participant.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ participant.email }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <h1 class="text-xs-center pt-4 pb-4" v-if="loading">Loading...</h1>      
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
const utils = require('../../js/utils')

export default {
  created () {
    window.events.$on('ShowTodoListParticipants', todoList => {
      this.todoList = todoList
      this.fetchParticipants(todoList)
      this.dialog = true
    })
  },

  data () {
    return {
      participants: [],
      dialog: false,
      userAvatar: utils.userAvatar,
      owner: null,
      todoList: null,
      loading: false
    }
  },

  methods: {
    fetchParticipants: function (todoList) {
      this.participants = []
      this.loading = true
      todoList.participants.forEach(participant => {
        this.fetchUser(participant)
      })
    },

    fetchUser: function (userId) {
      axios.get(window.HOST + '/user/' + userId).then(({ data }) => {
        this.participants.push(data)
        this.loading = false
      })
    },

    profile: function (user) {
      this.$router.push('/profile/' + user._id)
    }
  }
}
</script>