<template>
<v-content>
  <v-layout row>
    <v-flex x12 sm6 offset-sm3>
      <v-card v-if="user">
        <v-card-media :src="backgroundImg(user)" height="300px">
        <v-layout column class="media">
          <v-card-title>
            <v-btn icon dark @click="$router.go(-1)">
              <v-icon>chevron_left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon class="mr-3" v-if=" loggedInUser && (loggedInUser._id === user._id)" @click="edit">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-title class="white--text pl-5 pt-5">
          <div class="display-1 pl-5 pt-5">{{ user.name }}</div>
          </v-card-title>
        </v-layout>
        </v-card-media>
        <v-list three-line>
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
          <v-list-tile :to="'/todolist/' + todoList._id" v-for="todoList in todoLists" :key="todoList.description">
            <v-list-tile-action>
              <v-icon color="indigo" v-if="todoList.owner === user._id">person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ todoList.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ todoList.description }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>        
        </v-list>
      </v-card>
      <div class="spacer"></div>
    </v-flex>
  </v-layout>

  <profile-edit-dialog></profile-edit-dialog>
</v-content>
</template>

<script>
import axios from 'axios'
import ProfileEditDialog from './ProfileEditDialog'
const utils = require('../../js/utils')

export default {
  components: {ProfileEditDialog},

  created () {
    this.fetchData()
    this.fetchLoggedInUser()
    window.events.$on('UpdatedProfile', () => {
      this.fetchData()
    })
  },

  data () {
    return {
      user: null,
      dialog: false,
      todoLists: null,
      backgroundImg: utils.backgroundImg,
      loggedInUser: null
    }
  },

  methods: {
    fetchData: function () {
      axios.get(window.HOST + '/user/' + this.$route.params.userId).then(({data}) => {
        this.user = data
        this.fetchUserTodoLists()
      })
    },

    fetchUserTodoLists: function () {
      axios.get(window.HOST + '/user/' + this.user._id + '/todoLists', {withCredentials: true})
        .then(({data}) => { this.todoLists = data })
    },

    fetchLoggedInUser: function () {
      axios.get(window.HOST + '/loggedInUser', {withCredentials: true})
        .then(({data}) => { this.loggedInUser = data })
    },

    edit: function () {
      window.events.$emit('ShowProfileEdit', this.user)
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