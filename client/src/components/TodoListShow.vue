<template>
  <v-layout row mt-4 v-if="todoList">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list three-line>
          <v-subheader v-if="todoList.name" class="title">{{ todoList.name }}</v-subheader>
          <template v-for="(item, index) in todoItems">
            <v-divider v-if="index != 0" :inset="true" :key="index"></v-divider>
            <v-list-tile :key="item.name" class="tile" avatar>
              <v-list-tile-avatar @click="item.profileDialog = true">
                <img :src="userAvatar(item)">
              </v-list-tile-avatar>
              <v-list-tile-content @click="showTodoItem(item)" class="tile-text">
                <v-list-tile-title>{{ item.name }} <span :class="overDue(item.dueDate)? 'red': ''">{{ timeago().format(item.dueDate) }}</span></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile> 
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import timeago from 'timeago.js'
import axios from 'axios'

let utils = require('../js/utils')

export default {
  props: ['payload'],

  created () {
    ['CompletedTodo', 'DeletedTodo', 'UpdatedTodo'].forEach(item => {
      window.events.$on(item, () => {
        this.fetchTodoListItems(this.flag)
      })
    })
  },

  watch: {
    payload: function (val) {
      this.todoList = this.payload.todoList
      this.flag = this.payload.flag
      this.fetchTodoListItems(this.payload.flag)
    }
  },

  data () {
    return {
      todoItems: [],
      todoList: '',
      userAvatar: utils.userAvatar,
      timeago: timeago,
      flag: 'normal'
    }
  },

  methods: {
    overDue (time) {
      if (time) {
        return new Date(time) < new Date()
      } else {
        return false
      }
    },

    showTodoItem (todoItem) {
      window.events.$emit('ShowTodoItem', {todoItem, todoList: this.todoList})
    },

    fetchTodoListItems (flag) {
      axios.get(window.HOST + '/todolist/' + this.todoList._id + '/todoItems').then(({ data }) => {
        this.todoItems = []
        for (let i = 0; i < data.length; i++) {
          if (flag === 'completed') {
            if (data[i].completed) {
              this.todoItems.push(data[i])
              const indexToAdd = this.todoItems.length - 1
              this.addParticipantToLastItem(data, i, indexToAdd)
            }
          } else {
            if (!data[i].completed) {
              this.todoItems.push(data[i])
              const indexToAdd = this.todoItems.length - 1
              this.addParticipantToLastItem(data, i, indexToAdd)
            }
          }
        }
      })
    },

    addParticipantToLastItem (todoItems, todoItemIndex, indexToAdd) {
      todoItems[todoItemIndex].participants.forEach(participant => {
        axios.get(window.HOST + '/user/' + participant).then(({ data }) => {
          // assuming only one participant for now
          this.todoItems[indexToAdd].assignedUser = data
        })
      })
    }
  }
}
</script>

<style scoped>
.avatar {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.avatar:hover {
  cursor: pointer;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.tile {
  transition: all 0.3s;
}

.tile:hover {
  background: hsla(0, 0%, 100%, 0.12);
}

.tile-text:hover {
  cursor: pointer;
}
</style>