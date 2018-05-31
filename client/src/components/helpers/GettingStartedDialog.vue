<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="title">
        Getting Started
      </v-card-title>
      <v-card-text>
        <ol class="pl-2">
          <li>Join or create a todo list</li>
          <li>Invite your friends to start collaborating</li>
          <li>Create your first todo by clicking on the plus sign</li>
          <li>Assign someone to the todo or let our awesome algorithm do the hard work</li>
          <li>Complete your todo</li>
        </ol>
      </v-card-text>
      <v-card-actions>
        <v-btn to="/todolist/create">Create todo list</v-btn>
        <v-btn to="/todolist/join">Join todo list</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/**
 * For displaying a getting started message to user when they first use the app
 *
 * Right now the intention is to only use this once
 */
  export default {
    created () {
      if (!localStorage.visitedBefore) {
        this.dialog = true
        localStorage.visitedBefore = true
      }
    },

    data () {
      return {
        dialog: false
      }
    }
  }
</script>
