<template>
  <div>
    <div class="px-4 py-5 my-5" v-if="currentWalletComponent === ''">
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <h3 v-if="wallets.length === 0">
          You don't have any wallet yet, create your first wallet info!
        </h3>
        <button
          type="button"
          class="btn btn-primary btn-lg px-4 gap-3"
          @click="currentWalletComponent = 'CreateWallet'"
        >
          Create New Wallet
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-10">
        <keep-alive>
          <component
            v-bind:is="currentWalletComponent"
            :wallet-types="walletTypes"
            @saved="saved"
          />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import CreateWallet from './CreateWallet.vue'
import ListOfWallet from './ListOfWallet.vue'
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
      ]
    }
  },
  methods: {
    saved (component) {
      this.currentWalletComponent = component
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
      this.currentWalletComponent = 'ListOfWallet'
    }
  }
}
</script>

<style>
</style>
