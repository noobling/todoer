<template>
  <v-content>
    <v-container>
        <h3 class="display-3">Create New Shared Todo List</h3>

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
          v-model="skills"
          :rules="[v => v.length > 0 || 'Choose at least one skill']"
          label="Skills needed for project (enter separated)"
          chips
          tags
          required
        ></v-select>
        
        <v-text-field prepend-icon="attach_file" single-line
                v-model="filename" label="Image"
                ref="fileTextField"
                @click.native="onFocus"></v-text-field>
        <input type="file" accept="image/*"
                ref="fileInput"
                @change="onFileChange">
        <v-btn
          :disabled="!valid"
          @click="submit"
        >
          Create
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
      name: '',
      nameRules: [v => !!v || 'Name is required'],
      description: '',
      descriptionRules: [v => !!v || 'Description is required'],
      skills: null,
      filename: ''
    }
  },

  methods: {
    getFormData (files) {
      const forms = []
      for (const file of files) {
        const form = new FormData()
        form.append('data', file, file.name)
        forms.push(form)
      }
      return forms
    },
    onFocus () {
      this.$refs.fileInput.click()
    },
    onFileChange ($event) {
      const files = $event.target.files || $event.dataTransfer.files
      const form = this.getFormData(files)
      if (files) {
        if (files.length > 0) {
          this.filename = [...files].map(file => file.name).join(', ')
        } else {
          this.filename = null
        }
      } else {
        this.filename = $event.target.value.split('\\').pop()
      }
      this.$emit('input', this.filename)
      this.$emit('formData', form)
    },
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios(window.HOST + '/todoList', {
          method: 'POST',
          data: {
            name: this.name,
            description: this.description,
            skills: this.skills
          },
          withCredentials: true
        }).then(({data}) => {
          window.events.$emit('TodoListCreated', data)
          this.$router.push('/todolist/' + data._id)
        }).catch(err => {
          // eslint-disable-next-line
          flash('Validation failed please try again, check developer console for more information.', 'error')
          console.log(err.response.data.message)
        })
      }
    }
  }
}
</script>

<style scoped>
input[type='file'] {
  position: absolute;
  left: -99999px;
}
</style>