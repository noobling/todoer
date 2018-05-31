<template>
  <v-content>
    <v-layout row mt-4>
      <v-flex xs10 sm6 offset-sm3 offset-xs1>
        <h1 class="display-1">Lets get back to work!</h1>
        <v-form ref="form" v-model="valid" lazy-validation class="mt-4">  
          <v-text-field
            v-model="email"
            :rules="[v => !!v || 'Email is required']"
            label="Email"
            required
          ></v-text-field>
          
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
            Log In
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        valid: false,
        visible: true,
        email: '',
        password: '',
        passwordRules: [
          v => (v && v.length >= 6) || 'Password must be at least 6 chracters'
        ]
      }
    },

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios(window.HOST + '/login', {
            method: 'post',
            data: {
              email: this.email,
              password: this.password
            },
            withCredentials: true
          }).then(({data}) => {
            window.events.$emit('Login', data)
            this.$router.push('/dashboard')
          }).catch((err) => {
            // eslint-disable-next-line
            flash(err.response.data, 'error')
          })
        }
      }
    }
  }
</script>