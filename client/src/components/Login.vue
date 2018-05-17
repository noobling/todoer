<template>
  <v-content>
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
            :append-icon="visible ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (visible = !visible)"
            :rules="[() => ('The email and password you entered don\'t match')]"
            :type="visible ? 'password' : 'text'"
            label="Enter your password"
            hint="At least 8 characters"
            min="8"
            v-model="password"
            error
        ></v-text-field>
        <v-btn
          :disabled="!valid"
          @click="submit"
        >
          Login
        </v-btn>
      </v-form>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    data () {
      return {
        visible: false
      }
    }
  }
</script>