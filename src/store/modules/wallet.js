import * as types from '../mutation-types.js'

const state = {
  currentComponent: '',
  modifyWallet: null
}

const mutations = {
  [types.WALLET_COMPONENT] (state, payload) {
    state.currentComponent = payload
  },
  [types.WALLET_MODIFY] (state, payload) {
    state.modifyWallet = payload
  }
}

export default {
  state,
  mutations
}
