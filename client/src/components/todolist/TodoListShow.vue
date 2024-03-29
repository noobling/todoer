<template>
  <v-layout row mt-4 v-if="todoList">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list three-line v-if="!loading">
          <v-subheader v-if="todoList.name" class="title">
            {{ todoList.name }} 
            <v-btn v-html="yoursOnly? 'Everyones': 'Yours'" @click="yoursOnly = !yoursOnly"></v-btn>
          </v-subheader>
          <template v-for="(item, index) in todoItems">
            <v-divider v-if="index != 0" :inset="true" :key="index"></v-divider>
            <v-list-tile 
              :key="item.name" 
              :class="item.name.includes(toSearch) ? 'tile': 'tile hide' "
              v-if="shouldShow(item)"
              avatar>
              <v-list-tile-avatar v-if="item.assignedUser">
                <img :src="userAvatar(item.assignedUser)">
              </v-list-tile-avatar>
              <v-list-tile-content @click="showTodoItem(item)" class="tile-text">
                <v-list-tile-title>{{ item.name }} <span :class="overDue(item.dueDate)? 'red': ''">{{ timeago().format(item.dueDate) }}</span></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile> 
          </template>
        </v-list>
        <h1 class="text-xs-center pt-4 pb-4" v-if="loading">Loading...</h1>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import timeago from 'timeago.js'
import axios from 'axios'

let utils = require('../../js/utils')

export default {
  props: ['payload'],

  created () {
    ['CompletedTodo', 'DeletedTodo', 'UpdatedTodo'].forEach(item => {
      window.events.$on(item, () => {
        this.fetchTodoListItems(this.flag)
      })
    })

    window.events.$on('NewSearch', toSearch => {
      this.toSearch = toSearch
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
      flag: 'normal',
      finishedLoading: false,
      toSearch: '',
      loading: false,
      yoursOnly: false
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
      this.loading = true
      axios.get(window.HOST + '/todolist/' + this.todoList._id + '/todoItems').then(({ data }) => {
        this.todoItems = []
        let completedCount = 0
        let todoCount = 0
        for (let i = 0; i < data.length; i++) {
          data[i].completed ? completedCount++ : todoCount++
        }

        if (this.flag === 'completed' && completedCount === 0) this.loading = false
        else if (this.flag === 'normal' && todoCount === 0) this.loading = false

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
          let preve = this.todoItems
          this.todoItems = []
          this.todoItems = preve
          this.loading = false
        })
      })
    },

    shouldShow (item) {
      if (this.yoursOnly) {
        if (item.assignedUser._id === window.user_id) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
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
.hide {
  display: none;
}
</style>