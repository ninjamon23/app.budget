import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import VueCompositionAPI from '@vue/composition-api'
import { VueMongoDbRealmPlugin } from './mongo-realm/mongo-realm.js'

// Import the Auth0 configuration
import { domain, clientId } from './auth_config.json'

// Import the plugin here
import { Auth0Plugin } from './auth-wrapper/auth0.js'

Vue.config.productionTip = false

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

Vue.use(VueCompositionAPI)
Vue.use(new VueMongoDbRealmPlugin(), {
  id: 'kuripotapp-aygwr'
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
