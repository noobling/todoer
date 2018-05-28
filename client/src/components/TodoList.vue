<template>
  <v-content>
    <v-tabs>
      <v-tab key="todoListKey">
        Ongoing Todos
      </v-tab>
      <v-tab-item key="todoListKey">
        <todo-list-tool-bar :todoList="todoList"></todo-list-tool-bar>
        <todo-list-show :payload="{todoList, flag: 'normal'}"></todo-list-show>
      </v-tab-item>

      <v-tab key="todoListCompleted">
        Completed Todos
      </v-tab>
      <v-tab-item key="todoListCompleted">
        <todo-list-tool-bar :todoList="todoList"></todo-list-tool-bar>
        <todo-list-show :payload="{todoList, flag: 'completed'}"></todo-list-show>          
      </v-tab-item>
    </v-tabs>

    <todo-item-dialog></todo-item-dialog>
    <todo-list-edit-dialog></todo-list-edit-dialog>   
</v-content>
  
</template>
<script>
import axios from 'axios'
import TodoListShow from './TodoListShow'
import TodoItemDialog from './TodoItemDialog'
import TodoListToolBar from './TodoListToolBar'
import TodoListEditDialog from './TodoListEditDialog'

export default {
  components: {
    TodoListShow,
    TodoItemDialog,
    TodoListToolBar,
    TodoListEditDialog
  },

  created () {
    this.fetchTodoList()
    window.events.$on('JoinedTodoList', () => {
      // eslint-disable-next-line
      flash('Joined Todo List')
    })

    window.events.$on('TodoListUpdated', () => {
      this.fetchTodoList()
    })
  },

  watch: {
    $route (to, from) {
      this.todoListId = to.params.todoListId
      this.fetchTodoList()
    }
  },

  data () {
    return {
      todoList: '',
      todoListId: this.$route.params.todoListId
    }
  },

  methods: {
    fetchTodoList () {
      axios(window.HOST + '/todolist/' + this.todoListId, {
        method: 'GET',
        withCredentials: true
      })
        .then(({ data }) => {
          this.todoList = data
        })
        .catch(err => {
          // eslint-disable-next-line
          flash('Failed to fetch todolist check developer console for more information', 'error')
          console.log(err.response.data)
        })
    }
  }
}
</script>


