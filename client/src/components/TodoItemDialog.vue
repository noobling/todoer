<template>
  <v-dialog v-model="dialog" max-width="440">
    <v-card v-if="item">
      <v-card-title class="title">
        {{ item.name }}
        <v-spacer></v-spacer>
        <v-btn flat @click="dialog=false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <ul class="todoItem">
          <li>
            <div class="title">Todo Description</div>
            <p class="body-1">{{ item.description }}</p>
          </li>
          <li>
            <div class="title">Assigned To</div>
            <p class="body-1">{{ item.assignedUser.name }}</p>
          </li>
          <li>
            <div class="title">Due</div>
            <p class="body-1">{{ timeago().format(item.dueDate) }}</p>
          </li>
        </ul>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>        
        <v-btn color="red">Delete <v-icon>delete</v-icon></v-btn>
        <v-btn color="green" @click="complete">Complete <v-icon>done</v-icon></v-btn>        
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import timeago from 'timeago.js'
  import axios from 'axios'

  export default {
    created () {
      window.events.$on('ShowTodoItem', todoItem => {
        this.item = todoItem
        this.dialog = true
      })
    },

    data () {
      return {
        item: null,
        dialog: false,
        timeago
      }
    },

    methods: {
      complete: function () {
        axios.post(window.HOST + '/todoItem/' + this.item._id + '/complete')
          .then(() => {
            window.events.$emit('CompletedTodo')
            this.dialog = false
          })
      }
    }
  }
</script>

<style scoped>
  .todoItem li {
    list-style: none;
  }
</style>
