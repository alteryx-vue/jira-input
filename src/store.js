import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		config: {
			appTitle: 'Jira Input',
			appVersion: 'v0.0.0',
			latestUrl: 'https://api.github.com/repos/alteryx-vue/jira-input/releases/latest',
			updateAvail: false,
			updatePrompt: false,
			moreInfo: false,
			updateVersion: 'v?',
			updateUrl: 'https://github.com/alteryx-vue/installers/raw/master/jira-input.yxi',
			icon: 'icon.png',
			pages: [
			  { id: 0, name: 'connection', icon: 'power_settings_new' },
			  { id: 1, name: 'projects', icon: 'folder_open' },
			  { id: 2, name: 'filters', icon: 'filter_list' },
			  { id: 3, name: 'fields', icon: 'check_box' }
			],
			afterConnect: 'projects'
		},
		ui: {
			projects: [],
			selections: [],
			filterMethod: 'basic',
			page: 'connection',
			url: 'https://alteryx-vue.atlassian.net',
			lastUrl: '',
			auth: '',
			lastAuth: '',
			connected: 0,
			connects: 0,
			connectError: 0,
			apiError: '',
			stopCheck: false
		}
	},
	mutations: {
	  dismissUpdate (state) {
	  	state.config.updatePrompt = false
	  },
	  updateMoreInfo (state, v) {
	  	state.config.moreInfo = v
	  },
	  updatePage (state, v) {
	  	state.ui.page = v
	  },
	  updateProjects (state, v) {
	  	state.ui.projects = v
	  },
	  updateSelections (state, v) {
	  	state.ui.selections = v
	  },
	  updateUrl (state, v) {
	    state.ui.url = v
	  },
	  updateLastUrl (state, v) {
	    state.ui.lastUrl = state.ui.url
	  },
	  updateUsername (state, v) {
	    state.ui.username = v
	  },
	  updatePassword (state, v) {
	    state.ui.password = v
	  },
	  updateAuth (state, v) {
	    state.ui.auth = v
	  },
	  updateLastAuth (state) {
	  	state.ui.lastAuth = state.ui.auth
	  },
	  updateConnected (state, v) {
	    state.ui.connected = v
	  },
	  updateConnectError (state, v) {
	  	state.ui.connectError = v
	  },
	  updateConnects (state) {
	  	state.ui.connects ++
	  },
	  updateApiError (state, v) {
	  	state.ui.apiError = v
	  },
	}
})