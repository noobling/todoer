<template>
    <div>
      <v-content>
        <v-layout column>

          <v-flex xs12 sm6 mt-5 v-if="todoLists && todoLists.length > 0">
            <v-card>
              <v-container fluid grid-list-md>
                <v-layout row wrap>
                  <v-flex
                    v-for="todoList in todoLists"
                    :key="todoList.name"
                    xs12
                  >
                    <v-card>
                    <v-card-media
                        :src="todoList.src ? todoList.src: randomTodoListImg()"
                        height="200px"
                      >
                        <v-container fill-height fluid>
                          <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                              <span class="headline white--text" v-text="todoList.name"></span>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card-media>
                      <v-card-title>
                        <div>
                          <span>{{ todoList.description }}</span>
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn flat color="orange" :to="'/todolist/'+todoList._id">View</v-btn>
                        <delete-dialog :todoList="todoList"></delete-dialog>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
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
import DeleteDialog from './DeleteDialog'
import GettingStartedDialog from './GettingStartedDialog'

export default {
  components: {DeleteDialog, GettingStartedDialog},

  created () {
    this.fetchUserTodoLists()

    window.events.$on('DeletedTodoList', () => this.fetchUserTodoLists())
  },

  data () {
    return {
      todoLists: null
    }
  },

  methods: {
    fetchUserTodoLists () {
      axios(window.HOST + '/user/todoLists', {
        method: 'GET',
        withCredentials: true
      }).then(({data}) => { this.todoLists = data })
    },
    getRandomInt: function (max) {
      return Math.floor(Math.random() * Math.floor(max))
    },
    randomTodoListImg: function () {
      return require('@/assets/todolist-' + this.getRandomInt(4) + '.jpg')
    }
  }
}
</script>


