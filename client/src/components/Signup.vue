<template>
  <v-content>
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="username"
          :rules="nameRules"
          label="Username"
          required
        ></v-text-field>
        
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        
        <v-select
          v-model="skill"
          :items="items"
          :rules="[v => !!v || 'Item is required']"
          label="Skill"
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
        ></v-text-field>
        <v-btn
          :disabled="!valid"
          @click="submit"
        >
          Sign Up
        </v-btn>
      </v-form>
    </v-container>
  </v-content>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    window.loggedIn = true
    window.events.$emit('loggedInStateChange')
  },
  data () {
    return {
      valid: false,
      visible: true,
      username: '',
      nameRules: [v => !!v || 'Name is required'],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [v => (v && v.length >= 6) || 'Password must be at least 6 chracters'],
      skill: null,
      items: ['Frontend', 'Backend', 'Marketing', 'Designer']
    }
  },

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post(window.HOST + '/register', {
          username: this.username,
          email: this.email,
          skill: this.skill,
          password: this.password
        }, {
          withCredentials: true
        })
      }
    }
  }
}
</script>