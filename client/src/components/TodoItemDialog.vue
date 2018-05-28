<template>
  <v-dialog v-model="dialog" max-width="440">
    <v-card v-if="item && !editing">
      <v-card-title class="title">
        {{ item.name }}
        <v-btn icon @click="editing=true">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog=false">
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
        <v-btn color="red" @click="deleteTodo">Delete <v-icon>delete</v-icon></v-btn>
        <v-btn :color="item.completed? 'orange': 'green'" @click="complete" v-html="item.completed? 'Uncomplete': 'Complete'" width="100px"></v-btn>        
      </v-card-actions>
    </v-card>

    <v-card v-else>
      <v-card-text>
        <todo-item-create-show :item="item" v-if="item"></todo-item-create-show>
        <v-btn @click="editing=false" color="primary">Cancel</v-btn>        
        
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import timeago from 'timeago.js'
  import axios from 'axios'
  import TodoItemCreateShow from './TodoItemCreateShow'

  export default {
    components: { TodoItemCreateShow },

    created () {
      window.events.$on('ShowTodoItem', payload => {
        this.item = payload.todoItem
        this.todoList = payload.todoList
        this.dialog = true
      })

      window.events.$on('UpdatedTodo', () => {
        this.dialog = false
      })
    },

    data () {
      return {
        item: null,
        todoList: null,
        dialog: false,
        timeago,
        editing: false
      }
    },

    watch: {
      dialog: function (val) {
        if (val === false) {
          this.editing = false
        }
      }
    },

    methods: {
      complete: function () {
        const endpoint = this.item.completed ? '/uncomplete' : '/complete'
        axios.post(window.HOST + '/todoItem/' + this.item._id + endpoint)
          .then(() => {
            window.events.$emit('CompletedTodo')
            this.dialog = false
            const status = this.item.completed ? 'Uncompleted' : 'Completed'
            // eslint-disable-next-line
            flash(status + ' Todo')
          })
      },

      deleteTodo: function () {
        axios.delete(window.HOST + '/todoItem/' + this.todoList._id + '/' + this.item._id)
          .then(() => {
            window.events.$emit('DeletedTodo')
            this.dialog = false
            // eslint-disable-next-line
            flash('Deleted Todo', 'warning')
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
