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
        if (this.$store.state.ui.auth === this.$store.state.ui.lastAuth && this.$store.state.ui.url === this.$store.state.ui.lastUrl && this.$store.state.ui.connectError > 0 ) {
          return true
        } else if ((this.$store.state.ui.auth !== this.$store.state.ui.lastAuth || this.$store.state.ui.url !== this.$store.state.ui.lastUrl) && this.$store.state.ui.connects > 0) {
          return true
        } else if (this.$store.state.ui.connects > 0) {
          return true
        } else {
          return false
        }
      },
      alertType() {
        if (this.$store.state.ui.auth === this.$store.state.ui.lastAuth && this.$store.state.ui.url === this.$store.state.ui.lastUrl && this.$store.state.ui.connectError > 0 ) {
          return 'error'
        } else if ((this.$store.state.ui.auth !== this.$store.state.ui.lastAuth || this.$store.state.ui.url !== this.$store.state.ui.lastUrl) && this.$store.state.ui.connects > 0) {
          return 'info'
        } else {
          return 'success'
        }
      },
      alertText() {
        const err = 'Connection failed! Please check the site URL and/or login credentials.'
        const warn = 'New URL and/or credentials need to be validated...'
        const runworthy = 'Connected'
        if (this.$store.state.ui.auth === this.$store.state.ui.lastAuth && this.$store.state.ui.url === this.$store.state.ui.lastUrl && this.$store.state.ui.connectError > 0 ) {
          return err
        } else if ((this.$store.state.ui.auth !== this.$store.state.ui.lastAuth || this.$store.state.ui.url !== this.$store.state.ui.lastUrl) && this.$store.state.ui.connects > 0) {
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
          return atob(this.$store.state.ui.auth).substr(0,atob(this.$store.state.ui.auth).indexOf(':'))
        },
        set (value) {
          var pass = atob(this.$store.state.ui.auth).substr(atob(this.$store.state.ui.auth).indexOf(':')+1)
          var auth = btoa(value + ':' + pass)
          this.$store.commit('updateAuth', auth)
        }
      },
      password: {
        get () {
          return atob(this.$store.state.ui.auth).substr(atob(this.$store.state.ui.auth).indexOf(':')+1)
        },
        set (value) {
          var user = atob(this.$store.state.ui.auth).substr(0,atob(this.$store.state.ui.auth).indexOf(':'))
          var auth = btoa(user + ':' + value)
          this.$store.commit('updateAuth', auth)
        }
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

        // Projects
        axios.get(this.$store.state.ui.url + '/rest/api/latest/project?expand=description', 
          {
            'headers': { 
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + this.$store.state.ui.auth
            } 
          })
        .then(response => {
                            this.$store.commit('updateConnected',1)
                            this.$store.commit('updateConnectError',0)
                            this.$store.commit('updateApiError',null)
                            this.$store.commit('updateLastUrl')
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
                            this.$store.commit('updateLastUrl')
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

