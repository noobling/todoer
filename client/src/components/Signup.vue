<template>
  <v-content>
    <v-layout row mt-4>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="display-1">Get Started</h1>
        <v-form class="mt-4" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
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
          
          <v-text-field
            :append-icon="visible ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (visible = !visible)"
            :rules="passwordRules"
            :type="visible ? 'password' : 'text'"
            label="Enter your password"
            hint="At least 6 characters"
            min="6"
            v-model="password"
            :counter="6"
            required
            @keyup.enter="submit"
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            @click="submit"
          >
            Sign Up
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    window.events.$emit('loggedInStateChange')
  },
  data () {
    return {
      valid: false,
      visible: true,
      name: '',
      nameRules: [v => !!v || 'Name is required'],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [v => (v && v.length >= 6) || 'Password must be at least 6 chracters'],
      skills: null,
      items: ['Frontend', 'Backend', 'Marketing', 'Designer', 'Leadership', 'Databases', 'SEO', 'Writer', 'C', 'Java', 'HTML', 'CSS', 'Python', 'Security', 'Photography', 'Cooking']
    }
  },

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios(window.HOST + '/register', {
          method: 'post',
          data: {
            name: this.name,
            email: this.email,
            skills: this.skills,
            password: this.password
          },
          withCredentials: true
        })
          .then(({data}) => {
            window.events.$emit('NewRegistration', data)
            this.$router.push('/dashboard')
          })
          .catch((err) => {
            // eslint-disable-next-line
            flash('Your email or name has already been taken', 'error')
            console.log(err.response.data)
          })
      }
    }
  }
}
</script>