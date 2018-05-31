<template>
  <v-form ref="form" v-model="valid" lazy-validation v-if="item">
    <v-text-field
      v-model="name"
      :rules="[v => !!v || 'Name is required']"
      label="Todo name"
      required
    ></v-text-field>
    
    <v-text-field
      v-model="description"
      :rules="[v => !!v || 'Description is required']"
      label="Description"
      textarea=""
      required
    ></v-text-field>

    <v-select
      v-model="selectedNames"
      :items="names"
      label="Who do you want this todo to be assigned to?"
      autocomplete
    ></v-select>
  
    <v-select
      v-model="skills"
      :items="skillsList"
      :rules="[v => v.length > 0 || 'Choose at least one skill']"
      label="Skills needed for Todo (enter separated)"
      chips
      tags
      required
    ></v-select>
    
    <p class="title mt-3">Due Date</p>
    <v-date-picker v-model="dueDate" :landscape="true" full-width></v-date-picker>

    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      Update Todo
    </v-btn>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
  props: ['item'],

  created () {
    this.fetchTodoListUsers()
  },

  data () {
    return {
      valid: true,
      users: null,
      names: [],
      selectedNames: this.item.assignedUser.name,
      selectedUsers: [this.item.assignedUser._id],
      dueDate: this.getDate(this.item.dueDate),
      skills: this.item.skills,
      skillsList: [],
      todoListId: this.$route.params.todoListId,
      description: this.item.description,
      name: this.item.name
    }
  },

  watch: {
    selectedNames: function (val) {
      this.selectedUsers = []
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].name === val) this.selectedUsers.push(this.users[i]._id)
      }
    }
  },

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios(window.HOST + '/todoItem/' + this.item._id, {
          method: 'PUT',
          data: {
            name: this.name,
            description: this.description,
            skills: this.skills,
            participants: this.selectedUsers,
            dueDate: this.dueDate,
            todoList: this.todoList
          },
          withCredentials: true
        })
          .then(({ data }) => {
            window.events.$emit('UpdatedTodo')
            // eslint-disable-next-line
            flash('Updated Todo')
          })
          .catch(err => {
            // eslint-disable-next-line
            flash('Failed to crete todo', 'error')
            console.log(err.response.data.message)
          })
      }
    },

    fetchTodoListUsers () {
      axios(window.HOST + '/todolist/' + this.item.todoList + '/users', {
        method: 'GET',
        withCredentials: true
      })
        .then(({ data }) => {
          this.users = data
          this.users.forEach(user => {
            if (user.name) this.names.push(user.name)
            this.addUserSkills(user)
          })
        })
        .catch(() => {
          // eslint-disable-next-line
          flash('Failed to fetch users for todo list', 'error')
        })
    },

    addUserSkills (user) {
      user.skills.forEach(userSkill => {
        if (this.skillsList.indexOf(userSkill) === -1) this.skillsList.push(userSkill)
      })
    },

    getDate (dateTime) {
      const d = new Date(dateTime)
      let month = d.getMonth() + 1
      month = month.toString().length < 2 ? '0' + month : month
      let day = d.getDate()
      day = day.toString().length < 2 ? '0' + day : day
      return d.getFullYear() + '-' + month + '-' + day
    }
  }
}
</script>
