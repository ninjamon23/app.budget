<template>
  <div>
    <div class="row">
      <div class="col-lg-10">
        <div class="px-4 py-5 my-5" v-if="getWalletCurrentComponent === ''">
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <h3 v-if="wallets.length === 0">
              You don't have any wallet yet, create your first wallet info!
            </h3>
            <button
              type="button"
              class="btn btn-primary btn-lg px-4 gap-3"
              @click="createWallet"
            >
              Create New Wallet
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-10">
        <component
          v-bind:is="getWalletCurrentComponent"
          :wallet-types="walletTypes"
          @saved="saved"
        />
      </div>
    </div>
  </div>
</template>

<script>

import CreateWallet from './CreateWallet.vue'
import ListOfWallet from './ListOfWallet.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    CreateWallet,
    ListOfWallet
  },
  data () {
    return {
      currentWalletComponent: '',
      wallets: [],
      walletTypes: [
        { id: 1, name: 'Bank Account' },
        { id: 2, name: 'Cash on Hand' },
        { id: 3, name: 'Virtual Cash' }
      ],
      currency: {
        name: 'Philippine Peso',
        symbol: '₱'
      }
    }
  },
  computed: {
    ...mapGetters(['getWalletCurrentComponent'])
  },
  methods: {
    ...mapActions(['setCurrentWalletComponent', 'setWalletToModify']),
    saved (component) {
      this.currentWalletComponent = component
    },
    createWallet () {
      this.setWalletToModify(null)
      this.setCurrentWalletComponent('CreateWallet')
    },
    getWallets () {
      let wallets = localStorage.getItem('wallets')
      if (!wallets) {
        wallets = []
      } else {
        wallets = JSON.parse(wallets)
      }
      return wallets
    }
  },
  mounted () {
    if (this.getWallets().length > 0) {
      // this.currentWalletComponent = 'ListOfWallet'
      this.setCurrentWalletComponent('ListOfWallet')
    }
  }
}
</script>

<style>
</style>
