<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-btn flat slot="activator" color="red">Delete</v-btn>
    <v-card>
      <v-card-title class="headline">Are you sure you want to delete {{ todoList.name }}?</v-card-title>
      <v-card-text>Warning you cannot undo this action!</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" flat @click.native="deleteTodoList">Yes I am sure, delete</v-btn>                              
        <v-btn color="green" flat @click.native="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'

export default {
  props: ['todoList'],

  data () {
    return {
      dialog: false
    }
  },

  methods: {
    deleteTodoList: function () {
      axios(window.HOST + '/todolist/' + this.todoList._id, {
        method: 'DELETE',
        withCredentials: true
      }).then(() => {
        window.events.$emit('DeletedTodoList')
        this.dialog = false
      })
    }
  }
}
</script>