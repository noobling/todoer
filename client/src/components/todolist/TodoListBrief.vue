<template>
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
      <delete-dialog :todoList="todoList" v-if="!todoList.hideDel"></delete-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import DeleteDialog from './DeleteDialog'

export default {
  props: ['todoList'],

  components: {DeleteDialog},

  methods: {
    getRandomInt: function (max) {
      return Math.floor(Math.random() * Math.floor(max))
    },
    randomTodoListImg: function () {
      return require('@/assets/todolist-' + this.getRandomInt(5) + '.jpg')
    }
  }
}
</script>
