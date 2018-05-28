<template>
 <v-container>
   <todo-item-messages :todoItem="todoItem"></todo-item-messages>
  
    <v-form v-model="valid" lazy-validation>
      <v-text-field
        v-model="message"
        label="Enter your message"
        :rules="[v=> !!v || 'Message is required']"
        required
      >
      </v-text-field>
  
      <v-btn
        :disabled="!valid"
        @click="submit"
      >
        Send Message
      </v-btn>
    </v-form>
 </v-container>
</template>

<script>
  import axios from 'axios'
  import TodoItemMessages from './TodoItemMessages'

  export default {
    props: ['todoItem'],

    components: { TodoItemMessages },
  
    data () {
      return {
        valid: false,
        message: ''
      }
    },

    methods: {
      submit: function () {
        axios(window.HOST + '/todoItem/' + this.todoItem._id + '/chat', {
          method: 'POST',
          withCredentials: true,
          data: {
            message: this.message
          }
        })
        .then(({data}) => {
          this.message = ' '
          window.events.$emit('AddedMessage')
        })
      }
    }
  }
</script>
