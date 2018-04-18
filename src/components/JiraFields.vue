<template>

  <div>

    <v-alert outline type="error" :value="showAlert" class="mb-3 mt-3">
      {{ alertText }}
    </v-alert>

  </div>

</template>

<script>
  export default {
    name: 'JiraFields',
    computed: {
      page() {
        return this.$store.state.ui.page
      },
      showAlert() {
        if (this.$store.state.ui.connected == 0 || this.$store.state.ui.connectError > 0) {
          return true
        } else if (this.auth !== this.$store.state.ui.lastAuth) {
          return true
        } else {
          return false
        }
      },
      alertText () {
        if (this.$store.state.ui.connected == 0 || this.$store.state.ui.connectError > 0) {
          return 'Whoops!  Not connected to a Jira instance...'
        } else if (this.auth !== this.$store.state.ui.lastAuth) {
          return 'Connection details have changed without being verified...'
        } else {
          return 'Good to go!'
        }
      },
      auth() {
        return this.$store.state.ui.url + this.$store.state.ui.username + this.$store.state.ui.password
      }
    }
  }
</script>

