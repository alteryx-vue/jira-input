import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import axios from 'axios'
import {store} from './store.js'
import App from './App.vue'

Vue.use(Vuetify)
Vue.use(Vuelidate)

// GET latest release info for update check
axios.get(store.state.config.latestUrl)
.then(response => {
					const avail = response.data.name
					const current = store.state.config.appVersion
					store.state.config.updateAvail = (avail.length > 0 && avail !== current) ? true : false
					store.state.config.updatePrompt = store.state.config.updateAvail
					store.state.config.updateVersion = avail
				  }
)
.catch(response => { /* release call failed, just proceed */ })

// render app
const app = new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

window.Alteryx.Gui = window.Alteryx.Gui || {}

window.Alteryx.Gui.BeforeLoad = function (manager, AlteryxDataItems, json) {
  const handleEncryptedConfigField = (configFieldName) => {
    const encryptedDataItem = new AlteryxDataItems.SimpleString(configFieldName, { password: true })
    encryptedDataItem.fromJson(
      resolvedDecryptionValue => {
        store.state.ui[configFieldName] = resolvedDecryptionValue
      },
      rejectedDecryption => {},
      store.state.ui[configFieldName]
    )
    manager.addDataItem(encryptedDataItem)
  }

  store.state.ui = json.Configuration || store.state.ui
  handleEncryptedConfigField('password')
  handleEncryptedConfigField('username')
  handleEncryptedConfigField('auth')
  handleEncryptedConfigField('lastAuth')
}

window.Alteryx.Gui.GetConfiguration = (configObj) => {
  // fill in data items with latest values so encryption pass encrypts them
  window.Alteryx.Gui.Manager.getDataItem('password').setValue(store.state.ui.password)
  window.Alteryx.Gui.Manager.getDataItem('username').setValue(store.state.ui.username)
  window.Alteryx.Gui.Manager.getDataItem('auth').setValue(store.state.ui.auth)
  window.Alteryx.Gui.Manager.getDataItem('lastAuth').setValue(store.state.ui.lastAuth)

  window.Alteryx.Gui.Manager.toJson(
    resolvedJson => {
      // resolvedJson has encrypted elements in it
      // give Vuex store to the Alteryx Designer XML config
      window.Alteryx.JsEvent(JSON.stringify({
        Event: 'GetConfiguration',
        Configuration: {
          Configuration: { ...store.state.ui, ...resolvedJson.Configuration},
          Annotation: store.state.config.appTitle
        }
      }))
    },
    rejectedJson => {},
    false //macroMode - is this a macro backend tool? No.
  )
}
