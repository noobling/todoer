<template>
<v-dialog v-model="dialog" max-width="400">
  <v-card>
    <v-card-title class="title">Edit todo list</v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>
        
        <v-text-field
          v-model="description"
          :rules="descriptionRules"
          label="Description"
          textarea=""
          required
        ></v-text-field>

        <v-select
          v-model="selectedNames"
          :items="names"
          label="Who do you want to share this todo list with?"
          chips
          tags
        ></v-select>

        <v-select
          v-model="skills"
          :items="skillsList"
          :rules="[v => v.length > 0 || 'Choose at least one skill']"
          label="Skills needed for project (enter separated)"
          chips
          tags
          required
        ></v-select>
        <v-btn color="secondary" @click="dialog=false">Cancel</v-btn>
        <v-btn
          :disabled="!valid"
          @click="submit"
          color="primary"
        >
          Update Todo List
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</v-dialog>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    this.fetchUsers()

    window.events.$on('ShowEditTodoList', (todoList) => {
      this.todoList = todoList
      this.getNamesFromIds(todoList.participants)
      this.selectedUsers = todoList.participants
      this.name = todoList.name
      this.description = todoList.description
      this.skills = todoList.skills
      this.dialog = true
    })
  },

  data () {
    return {
      todoList: null,
      users: null,
      selectedNames: null,
      selectedUsers: null,
      names: [],
      valid: false,
      visible: true,
      name: '',
      nameRules: [v => !!v || 'Name is required'],
      description: '',
      descriptionRules: [v => !!v || 'Description is required'],
      skillsList: [],
      skills: null,
      filename: '',
      dialog: false
    }
  },

  watch: {
    selectedNames: function (val) {
      this.selectedUsers = []
      val.forEach(selectedName => {
        this.users.forEach(user => {
          if (user.name === selectedName) {
            this.selectedUsers.push(user._id)

            this.addUserSkills(user)
          }
        })
      })
    }
  },

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios(window.HOST + '/todoList/' + this.todoList._id, {
          method: 'PUT',
          data: {
            name: this.name,
            description: this.description,
            skills: this.skills,
            participants: this.selectedUsers
          },
          withCredentials: true
        }).then(({data}) => {
          window.events.$emit('TodoListUpdated', data)
          this.dialog = false
          // eslint-disable-next-line
          flash('Todo List Update')
        }).catch(err => {
          // eslint-disable-next-line
          flash('Validation failed please try again, check developer console for more information.', 'error')
          console.log(err.response.data.message)
        })
      }
    },

    fetchUsers () {
      axios(window.HOST + '/users', {
        method: 'GET',
        withCredentials: true
      }).then(({data}) => {
        this.users = data
        this.users.forEach((user) => {
          if (user.name) {
            this.names.push(user.name)
          }
        })
      })
    },

    addUserSkills (user) {
      user.skills.forEach(userSkill => {
        console.log(userSkill)
        if (this.skillsList.indexOf(userSkill) === -1) this.skillsList.push(userSkill)
      })
    },

    getNamesFromIds (ids) {
      this.selectedNames = []
      ids.forEach(id => {
        let match = this.users.find(user => {
          return user._id === id
        })
        this.selectedNames.push(match.name)
      })
    }
  }
}
</script>

<style scoped>

</style>