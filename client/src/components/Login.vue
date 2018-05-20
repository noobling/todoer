<template>
  <v-content>
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>  
        <v-text-field
          v-model="username"
          :rules="[v => !!v || 'Username is required']"
          label="username"
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
        ></v-text-field>
        <v-btn
          :disabled="!valid"
          @click="submit"
        >
          Log In
        </v-btn>
      </v-form>
    </v-container>
  </v-content>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        valid: false,
        visible: true,
        username: '',
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
          axios.post(window.HOST + '/login', {
            username: this.username,
            password: this.password
          })
        }
      }
    }
  }
</script>