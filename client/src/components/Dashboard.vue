<template>
    <div>
      <v-content>
        <v-layout column>
          <v-flex xs12 sm6 v-if="todoLists && todoLists.length > 0">
            <v-card>
              <v-container fluid grid-list-md>
                <v-tabs>
                  <v-tab key="owner">
                    Todo lists you created
                  </v-tab>
                  <v-tab-item key="owner">
                    <v-layout row wrap>
                      <v-flex
                        v-for="todoList in ownerTodoLists"
                        :key="todoList.name"
                        xs12
                      >
                      <todo-list-brief :todoList="todoList"></todo-list-brief>
                      </v-flex>
                    </v-layout>
                  </v-tab-item>

                  <v-tab key="participating">
                    Todo lists you joined
                  </v-tab>
                  <v-tab-item key="participating">
                    <v-layout row wrap>
                      <v-flex
                        v-for="todoList in participantTodoLists"
                        :key="todoList.name"
                        xs12
                      >
                        <todo-list-brief :todoList="todoList"></todo-list-brief>
                      </v-flex>
                    </v-layout>
                  </v-tab-item>

                  <v-tab key="join">
                    Join a todo list
                  </v-tab>
                  <v-tab-item key="join">
                    <todo-list-join-child-component></todo-list-join-child-component>
                  </v-tab-item>
                </v-tabs>
              </v-container>
            </v-card>
          </v-flex>

          <div v-else>
            <getting-started-dialog></getting-started-dialog>
            <h1 class="headline text-sm-center mt-4">You are not part of any shared todo list...</h1>
          </div>
        </v-layout>
      </v-content>
    </div>
</template>

<script>
import axios from 'axios'
import GettingStartedDialog from './GettingStartedDialog'
import TodoListBrief from './TodoListBrief'
import TodoListJoinChildComponent from './TodoListJoinChildComponent'

export default {
  components: {GettingStartedDialog, TodoListBrief, TodoListJoinChildComponent},

  created () {
    this.fetchUserTodoLists()

    window.events.$on('DeletedTodoList', () => this.fetchUserTodoLists())
  },

  data () {
    return {
      ownerTodoLists: [],
      participantTodoLists: [],
      todoLists: null,
      userId: null
    }
  },

  methods: {
    fetchUserTodoLists () {
      axios.get(window.HOST + '/loggedInUser', {withCredentials: true}).then((result) => {
        this.userId = result.data._id
        axios(window.HOST + '/user/todoLists', {
          method: 'GET',
          withCredentials: true
        }).then(({data}) => {
          data.forEach(todoList => {
            if (todoList.owner === this.userId) {
              this.ownerTodoLists.push(todoList)
            } else {
              this.participantTodoLists.push(todoList)
            }
          })
          this.todoLists = this.ownerTodoLists.concat(this.participantTodoLists)
        })
      })
    }
  }
}
</script>


