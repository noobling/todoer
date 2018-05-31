<template>
<v-dialog v-model="dialog" max-width="400px">
  <v-card>
    <v-card-title class="title">
      Edit Your Profile
      <v-spacer></v-spacer>
      <v-btn icon @click="dialog=false"><v-icon>close</v-icon></v-btn>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
    
          <v-text-field
          v-model="name"
          :rules="nameRules"
          label="name"
          required
        ></v-text-field>
        
        <v-select
          v-model="skills"
          :items="items"
          :rules="[v => v.length > 0 || 'You need to have at least one skill']"
          label="Skills"
          chips
          tags
          required
        ></v-select>
        <v-btn
          :disabled="!valid"
          @click="submit"
        >
          Update Profile
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
    window.events.$on('ShowProfileEdit', user => {
      this.name = user.name
      this.email = user.email
      this.skills = user.skills
      this.dialog = true
    })
  },
  data () {
    return {
      valid: false,
      name: '',
      nameRules: [v => !!v || 'Name is required'],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      skills: null,
      items: ['Frontend', 'Backend', 'Marketing', 'Designer'],
      dialog: false
    }
  },

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios(window.HOST + '/user', {
          method: 'PUT',
          data: {
            name: this.name,
            email: this.email,
            skills: this.skills
          },
          withCredentials: true
        })
          .then(({data}) => {
            window.events.$emit('UpdatedProfile')
            this.dialog = false
            // eslint-disable-next-line
            flash('Update Profile')
          })
          .catch((err) => {
            // eslint-disable-next-line
            flash('Something went wrong :/ check developer console for more information', 'error')
            console.log(err.response.data)
          })
      }
    }
  }
}
</script>