<template>

  <div class="mt-3">

    <v-alert outline :type="alertType" :value="showAlert" class="mb-3">
      {{ alertText }}
    </v-alert>

    <form>
      <v-text-field
        label="Site URL"
        v-model="url"
        :error-messages="urlErrors">
      </v-text-field>
      <v-text-field
        label="Username or Email"
        v-model="username"
        :error-messages="usernameErrors">
      </v-text-field>
      <v-text-field
        type="password"
        label="Password"
        v-model="password"
        :error-messages="passwordErrors">
      </v-text-field>
      <v-btn
        color="primary"
        @click="connect"
        :loading="loading">
        connect
      </v-btn>
    </form>

  </div>

</template>

<script>

  import { required } from 'vuelidate/lib/validators';
  import axios from 'axios';

  export default {
  	name: 'JiraConnection',
    validations: {
      url: { required },
      username: { required },
      password: { required }
    },
    data () {
      return {
        loading: false,
      }
    },
    computed: {
      showAlert() {
        if (this.auth === this.$store.state.ui.lastAuth && this.$store.state.ui.connectError > 0 ) {
          return true
        } else if (this.auth !== this.$store.state.ui.lastAuth && this.$store.state.ui.connects > 0) {
          return true
        } else if (this.$store.state.ui.connects > 0) {
          return true
        } else {
          return false
        }
      },
      alertType() {
        if (this.auth === this.$store.state.ui.lastAuth && this.$store.state.ui.connectError > 0 ) {
          return 'error'
        } else if (this.auth !== this.$store.state.ui.lastAuth && this.$store.state.ui.connects > 0) {
          return 'info'
        } else {
          return 'success'
        }
      },
      alertText() {
        const err = 'Connection failed! Please check the site URL and/or login credentials.'
        const warn = 'New URL and/or credentials need to be validated...'
        const runworthy = 'Connected'
        if (this.auth === this.$store.state.ui.lastAuth && this.$store.state.ui.connectError > 0 ) {
          return err
        } else if (this.auth !== this.$store.state.ui.lastAuth && this.$store.state.ui.connects > 0) {
          return warn
        } else {
          return runworthy
        }
      },
      page() {
        return this.$store.state.ui.page
      },
      pages() {
        return this.$store.state.config.pages
      },
      url: {
        get () {
          return this.$store.state.ui.url
        },
        set (value) {
          this.$store.commit('updateUrl', value)
        }
      },
      username: {
        get () {
          return this.$store.state.ui.username
        },
        set (value) {
          this.$store.commit('updateUsername', value)
        }
      },
      password: {
        get () {
          return this.$store.state.ui.password
        },
        set (value) {
          this.$store.commit('updatePassword', value)
        }
      },
      auth() {
        return this.$store.state.ui.url + this.$store.state.ui.username + this.$store.state.ui.password
      },
      urlErrors () {
        const errors = []
        if (!this.$v.url.$dirty) return errors
        !this.$v.url.required && errors.push('Site URL is required.')
        return errors
      },
      usernameErrors () {
        const errors = []
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.required && errors.push('Username or Email is required.')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      }
    },
    methods: {
      connect () {
        this.$v.$touch()
        this.loading = true

        let basicAuth = 'Basic ' + btoa(this.$store.state.ui.username + ':' + this.$store.state.ui.password)

        // Projects
        axios.get(this.$store.state.ui.url + '/rest/api/latest/project?expand=description',
          {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': basicAuth
            }
          })
        .then(response => {
                            this.$store.commit('updateConnected',1)
                            this.$store.commit('updateConnectError',0)
                            this.$store.commit('updateApiError',null)
                            this.$store.commit('updateLastAuth')
                            this.$store.commit('updateConnects')
                            this.$store.commit('updateProjects',response.data)
                            this.loading = false
                            this.$store.state.ui.page = this.$store.state.config.afterConnect
                           }
        )
        .catch(response => {
                            this.$store.commit('updateConnected',0)
                            this.$store.commit('updateConnectError',1)
                            this.$store.commit('updateApiError',response.message)
                            this.$store.commit('updateLastAuth')
                            this.$store.commit('updateConnects')
                            this.$store.commit('updateProjects',[])
                            this.loading = false
                            }
        )
      }
    }
  }
</script>
