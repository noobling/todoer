<template>
  <div>
    <v-alert
      v-model="alert"
      :type="type"
      transition="scale-transition"
      dismissible
      class="flash"
    >
      {{ message }}
    </v-alert>
  </div>
</template>

<script>
export default {
  data () {
    return {
      alert: false,
      type: 'success',
      message: ''
    }
  },

  created () {
    window.events.$on('Flash', data => {
      this.message = data.message
      this.type = data.type
      this.alert = true
      setTimeout(() => {
        this.alert = false
      }, 3000)
    })
  }
}
</script>

<style scoped>
  .flash {
    position: fixed;
    right: 25px;
    bottom: 25px;
    z-index: 999;
  }
</style>

