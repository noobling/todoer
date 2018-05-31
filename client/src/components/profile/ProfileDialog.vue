<template>
  <v-dialog v-model="dialog" v-if="user">
    <v-layout row>
      <v-card>
        <v-card-media :src="userAvatar(user)" height="300px">
        <v-layout column class="media">
          <v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon class="mr-3" dark>
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn icon dark>
            <v-icon>more_vert</v-icon>
          </v-btn>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-title class="white--text pl-5 pt-5">
          <div class="display-1 pl-5 pt-5">{{ user.name }}</div>
          </v-card-title>
        </v-layout>
        </v-card-media>
        <v-list two-line>
          <v-list-tile @click="">
            <v-list-tile-action>
            <v-icon color="indigo">mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
            <v-list-tile-title>{{ user.email }}</v-list-tile-title>
            <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-subheader>Public Shared Todo Lists</v-subheader>   
          <v-list-tile @click="" v-for="todoList in todoLists" :key="todoList.description">
            <v-list-tile-action>
              <v-icon color="indigo">person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ todoList.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ todoList.description }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>        
        </v-list>
      </v-card>
    </v-layout>
  </v-dialog>
</template>

<script>
import axios from 'axios'
const utils = require('../js/utils')

export default {
  created () {
    window.events.$on('ShowProfile', user => {
      this.user = user
      this.dialog = true
    })
  },

  data () {
    return {
      user: null,
      dialog: false,
      todoLists: null,
      userAvatar: utils.userAvatar
    }
  },

  methods: {
    fetchUserTodoLists: function () {
      axios.get(window.HOST + '/user/' + this.user._id + '/todoLists', {withCredentials: true})
        .then(({data}) => { this.todoLists = data })
    }
  }
}
</script>

<style>
  .media {
      height: 100%;
      margin: 0
  }
</style>