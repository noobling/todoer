<template>
  <v-layout row mt-4>
    <todo-item-dialog></todo-item-dialog>

    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list three-line>
          <v-subheader v-if="todoList.name">{{ todoList.name }}</v-subheader>
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
import TodoItemDialog from './TodoItemDialog'
import axios from 'axios'

let utils = require('../js/utils')

export default {
  components: { TodoItemDialog },

  props: ['todoList'],

  created () {
    this.fetchTodoListItems()
  },

  watch: {
    todoList: function (val) {
      this.fetchTodoListItems()
    }
  },

  data () {
    return {
      todoItems: [],
      userAvatar: utils.userAvatar,
      timeago: timeago
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
      window.events.$emit('ShowTodoItem', todoItem)
    },

    fetchTodoListItems () {
      axios.get(window.HOST + '/todolist/' + this.todoList._id + '/todoItems').then(({ data }) => {
        this.todoItems = []
        for (let i = 0; i < data.length; i++) {
          this.todoItems.push(data[i])
          data[i].participants.forEach(participant => {
            axios.get(window.HOST + '/user/' + participant).then(({ data }) => {
              // assuming only one participant for now
              this.todoItems[i].assignedUser = data
            })
          })
        }
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