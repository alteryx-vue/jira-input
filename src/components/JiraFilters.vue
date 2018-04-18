<template>

  <div>

    <v-alert outline type="error" :value="showAlert" class="mb-3 mt-3">
      {{ alertText }}
    </v-alert>

    <div v-if="!showAlert" class="mt-2">

          <v-btn-toggle v-model="filterMethod" mandatory class="mb-3" style="width: 100%">
            <v-btn flat value="basic" block>
              <span>Basic</span>
              <v-icon>fa-filter</v-icon>
            </v-btn>
            <v-btn flat value="saved" block>
              <span>Saved</span>
              <v-icon>fa-star</v-icon>
            </v-btn>
            <v-btn flat value="jql" block>
              <span>JQL</span>
              <v-icon>edit</v-icon>
            </v-btn>
          </v-btn-toggle>

      <basic-filter v-if="filterMethod == 'basic'"></basic-filter>
      <saved-filter v-if="filterMethod == 'saved'"></saved-filter>
      <jql-filter v-if="filterMethod == 'jql'"></jql-filter>

    </div>

  </div>

</template>

<script>

  import BasicFilter from './filters/BasicFilter.vue';
  import SavedFilter from './filters/SavedFilter.vue';
  import JqlFilter from './filters/JqlFilter.vue';

  export default {
  	name: 'JiraFilters',
    components: {
        BasicFilter,
        SavedFilter,
        JqlFilter
    },
    data() {
      return {
        filterMethod: this.$store.state.ui.filterMethod
      }
    },
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

