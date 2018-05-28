<template>
  <v-dialog v-model="dialog" max-width="400" v-if="todoList">
    <v-card>
      <v-card-title class="title">
        Participants List
        <v-spacer></v-spacer> 
        <v-btn icon @click="dialog=false"><v-icon>close</v-icon></v-btn>
      </v-card-title>

      <v-list three-line>
        <v-list-tile v-for="(participant, index) in participants" :key="index">
          <v-list-tile-avatar>
            <img :src="userAvatar(participant)">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-if="participant._id === todoList.owner">{{ participant.name }} <v-icon>person</v-icon></v-list-tile-title>
            <v-list-tile-title v-else>{{ participant.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ participant.email }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
const utils = require('../js/utils')

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
      todoList: null
    }
  },

  methods: {
    fetchParticipants: function (todoList) {
      this.participants = []
      todoList.participants.forEach(participant => {
        this.fetchUser(participant)
      })

      this.fetchUser(todoList.owner)
    },

    fetchUser: function (userId) {
      axios.get(window.HOST + '/user/' + userId).then(({ data }) => this.participants.push(data))
    }
  }
}
</script>