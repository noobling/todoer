<template>
  <v-content>
    
    <v-layout row mt-4>
      <v-flex xs12 sm6 offset-sm3>
        <h3 class="display-1" v-if="todoList" >Create New Todo for {{ todoList.name }}</h3>
        <v-btn icon dark @click="$router.go(-1)">
          <v-icon>chevron_left</v-icon>
        </v-btn>
        <v-form ref="form" v-model="valid" lazy-validation>
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
  
          <v-checkbox
            v-model="autoAssign"
            label="Auto Assign User"
            type="checkbox"
          ></v-checkbox>
  
          <div v-if="!autoAssign">
            <v-select
              v-model="selectedNames"
              :items="names"
              label="Who do you want this todo to be assigned to?"
              autocomplete
            ></v-select>
          </div>
          
  
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
            Create Todo
          </v-btn>

          <div class="spacer"></div>
        </v-form>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    this.fetchTodoList()
    this.fetchTodoListUsers()
  },

  data () {
    return {
      valid: false,
      todoList: null,
      users: null,
      autoAssign: true,
      names: [],
      selectedNames: [],
      selectedUsers: [],
      dueDate: null,
      skills: null,
      skillsList: [],
      todoListId: this.$route.params.todoListId,
      description: null,
      name: null
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
        if (!this.dueDate) {
          // eslint-disable-next-line
          flash('Pleae enter a due date', 'error')
        } else {
          axios(window.HOST + '/todoList/' + this.todoListId + '/todoItem/create', {
            method: 'POST',
            data: {
              name: this.name,
              description: this.description,
              skills: this.skills,
              participants: this.selectedUsers,
              dueDate: this.dueDate,
              autoAssign: this.autoAssign
            },
            withCredentials: true
          })
            .then(({ data }) => {
              this.$router.push('/todolist/' + this.todoListId)
            })
            .catch(err => {
              // eslint-disable-next-line
              flash('Failed to crete todo', 'error')
              console.log(err.response.data.message)
            })
        }
      }
    },

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
    },

    fetchTodoListUsers () {
      axios(window.HOST + '/todolist/' + this.todoListId + '/users', {
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
    }
  }
}
</script>
