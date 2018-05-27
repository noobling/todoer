<template>
  <v-content>
    <v-layout mt-5>
      <v-flex xs12 sm6 offset-sm3>
        <v-toolbar
          xs12 sm6 offset-sm3
          dense
        >
        <v-text-field prepend-icon="search" hide-details single-line placeholder="Search Todos"></v-text-field>
        <v-btn :to="'/todolist/'+todoList._id+'/todoItem/create'" icon>
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>people</v-icon>
        </v-btn>
      </v-toolbar>
      </v-flex>
    </v-layout>
    <v-tabs>
      <v-tab key="todoListKey">
        Ongoing Todos
      </v-tab>
      <v-tab-item key="todoListKey">
          <todo-list-show :todoList="todoList"></todo-list-show>
      </v-tab-item>

      <v-tab key="todoListCompleted">
        Completed Todos
      </v-tab>
      <v-tab-item key="todoListCompleted">
          <todo-list-show :todoList="todoList"></todo-list-show>          
      </v-tab-item>
    </v-tabs>

</v-content>
  
</template>
<script>
import axios from 'axios'
import TodoListShow from './TodoListShow'

export default {
  components: {
    TodoListShow
  },

  created () {
    this.fetchTodoList()
    window.events.$on('JoinedTodoList', () => {
      // eslint-disable-next-line
      flash('Joined Todo List')
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


