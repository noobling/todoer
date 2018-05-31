<template>
<v-layout mt-5>
  <v-flex xs12 sm6 offset-sm3>
    <v-toolbar
      xs12 sm6 offset-sm3
      dense
    >
    <v-text-field 
      prepend-icon="search" 
      hide-details 
      single-line 
      placeholder="Search Todos"
      v-model="toSearch"
    >
    </v-text-field>
    <v-btn :to="'/todolist/'+todoList._id+'/todoItem/create'" icon v-if="isParticipating"> 
      <v-icon>add</v-icon>
    </v-btn>
    <v-btn icon @click="edit" v-if="isParticipating">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-btn icon @click="participants">
      <v-icon>people</v-icon>
    </v-btn>
  </v-toolbar>
  </v-flex>
</v-layout>
</template>

<script>
  export default {
    props: ['todoList'],

    watch: {
      toSearch: function (val) {
        window.events.$emit('NewSearch', val)
      }
    },

    data () {
      return {
        toSearch: ''
      }
    },

    computed: {
      isParticipating: function () {
        return this.todoList && this.todoList.participants.includes(window.user_id)
      }
    },

    methods: {
      edit: function () {
        window.events.$emit('ShowEditTodoList', this.todoList)
      },

      participants: function () {
        window.events.$emit('ShowTodoListParticipants', this.todoList)
      }
    }
  }
</script>