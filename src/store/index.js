import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

// module registration
import wallet from './modules/wallet'
Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    wallet
  },
  strict: true
})
