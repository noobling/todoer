<template>
  <div>
    <v-content>
      <v-layout column>
        <v-flex xs12>
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
                      <v-btn flat color="green" @click="join(todoList)">Join</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    this.fetchTodoLists()
  },

  data () {
    return {
      todoLists: null
    }
  },

  methods: {
    fetchTodoLists () {
      axios(window.HOST + '/todoLists', {
        method: 'GET',
        withCredentials: true
      }).then(({ data }) => {
        axios.get(window.HOST + '/loggedInUser', { withCredentials: true }).then(result => {
          const userId = result.data._id
          this.todoLists = data.filter(todoList => {
            return (todoList.owner !== userId && !todoList.participants.includes(userId))
          })
        })
      })
    },
    getRandomInt: function (max) {
      return Math.floor(Math.random() * Math.floor(max))
    },
    randomTodoListImg: function () {
      return require('@/assets/todolist-' + this.getRandomInt(4) + '.jpg')
    },
    join: function (todoList) {
      axios(window.HOST + '/todoList/' + todoList._id + '/join', {
        method: 'POST',
        withCredentials: true
      }).then(({ data }) => {
        window.events.$emit('JoinedTodoList')
        this.$router.push('/todoList/' + todoList._id)
      })
    }
  }
}
</script>


