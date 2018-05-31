<template>
    <div>
      <v-content>
        <v-layout column>
          <v-flex xs12 sm6>
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
                        v-if="ownerTodoLists && ownerTodoLists.length > 0"
                      >
                      <todo-list-brief :todoList="todoList"></todo-list-brief>
                      </v-flex>
                      <v-flex>
                        <h1 class="headline text-sm-center mt-4 mb-4">
                          <v-btn to="todolist/create">Create a todo list</v-btn>     
                        </h1>
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
                        v-if="participantTodoLists && participantTodoLists.length > 0"
                      >
                        <todo-list-brief :todoList="todoList"></todo-list-brief>
                      </v-flex>
                      <v-flex>
                        <h1 class="headline text-sm-center mt-4 mb-4">
                          <v-btn to="todolist/join">Join a todo list</v-btn>     
                        </h1>
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
          <getting-started-dialog></getting-started-dialog>
        </v-layout>
      </v-content>
    </div>
</template>

<script>
import axios from 'axios'
import GettingStartedDialog from '../helpers/GettingStartedDialog'
import TodoListBrief from '../todolist/TodoListBrief'
import TodoListJoinChildComponent from '../todolist/TodoListJoinChildComponent'

export default {
  components: {GettingStartedDialog, TodoListBrief, TodoListJoinChildComponent},

  created () {
    this.fetchUserTodoLists()
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
        window.events.$on('DeletedTodoList', () => this.$router.push('/profile/' + this.userId))
        axios(window.HOST + '/user/todoLists', {
          method: 'GET',
          withCredentials: true
        }).then(({data}) => {
          this.participantTodoLists = []
          this.ownerTodoLists = []
          this.todoLists = []
          data.forEach(todoList => {
            if (todoList.owner === this.userId) {
              todoList.hideDel = false
              this.ownerTodoLists.push(todoList)
            } else {
              todoList.hideDel = true
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


