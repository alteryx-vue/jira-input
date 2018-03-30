<template>

    <v-app style="background: white">

      <jira-toolbar app></jira-toolbar>
        <v-content>
          <v-container class="pt-1">

            <jira-nav></jira-nav>

            <v-divider></v-divider>

            <jira-connection v-if="page == 'connection'"></jira-connection>
            <jira-projects v-if="page == 'projects'"></jira-projects>
            <jira-filters v-if="page == 'filters'"></jira-filters>
            <jira-fields v-if="page == 'fields'"></jira-fields>

            <jira-update></jira-update>

          </v-container>
        </v-content>

    </v-app>

</template>

<script>

  import JiraToolbar from './components/JiraToolbar.vue';
  import JiraNav from './components/JiraNav.vue';
  import JiraConnection from './components/JiraConnection.vue';
  import JiraProjects from './components/JiraProjects.vue';
  import JiraFilters from './components/JiraFilters.vue';
  import JiraFields from './components/JiraFields.vue';
  import JiraUpdate from './components/JiraUpdate.vue';

  export default {
    components: {
        JiraToolbar,
        JiraNav,
        JiraConnection,
        JiraProjects,
        JiraFilters,
        JiraFields,
        JiraUpdate
    },
    computed: {
      page() {
        return this.$store.state.ui.page
      }
    }
  }

</script>
