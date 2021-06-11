import * as types from './mutation-types.js'

export const setCurrentWalletComponent = (store, payload) => {
  store.commit(types.WALLET_COMPONENT, payload)
}

export const setWalletToModify = (store, payload) => {
  store.commit(types.WALLET_MODIFY, payload)
}
