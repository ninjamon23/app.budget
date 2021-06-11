<template>
  <div>
    <div class="px-4 py-2 my-2">
      <h1 class="display-5 fw-bold">My Wallets</h1>
    </div>
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-secondary" @click="create">Create</button>
      <button type="button" class="btn btn-secondary" @click="update">Update</button>
      <button type="button" class="btn btn-secondary" @click="remove">Delete</button>
    </div>
    <table class="table">
      <!-- <caption>My Wallets</caption> -->
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th class="text-end">Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(wallet,index) in listOfWallets" :key="index" @click="select(wallet)" :class="{ 'table-active': wallet.selected }">
          <td>{{ wallet.name }}</td>
          <td>{{ wallet.type.name }}</td>
          <td class="text-end">{{ wallet.balance }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      listOfWallets: [],
      selectedWallet: null
    }
  },
  methods: {
    ...mapActions(['setCurrentWalletComponent', 'setWalletToModify']),
    getWallets () {
      let wallets = localStorage.getItem('wallets')
      if (!wallets) {
        wallets = []
      } else {
        wallets = JSON.parse(wallets)
      }
      console.log('wallets>', wallets)
      wallets.forEach(el => {
        el.selected = false
      })
      this.listOfWallets = wallets
    },
    create () {
      // console.log('create new wallet.')
      // this.$emit('saved', 'CreateWallet')
      this.setWalletToModify(null)
      this.setCurrentWalletComponent('CreateWallet')
    },
    update () {
      // this.selectedWallet = wallet
      this.setWalletToModify(this.selectedWallet)
      this.setCurrentWalletComponent('CreateWallet')
    },
    remove () {
      if (!confirm('Are you sure you want to delete?')) {
        return
      }
      const wallets = localStorage.getItem('wallets')
      if (!wallets) {
        return
      }
      console.log('wallets<', wallets)
      let x = JSON.parse(wallets)
      setTimeout(() => {
        x = x.filter(el => el.name !== this.selectedWallet.name)
        console.log('wallets>', x)
        localStorage.setItem('wallets', JSON.stringify(x))
        this.getWallets()
      }, 2000)
    },
    select (wallet) {
      this.selectedWallet = wallet
      this.listOfWallets.forEach(el => {
        el.selected = false
      })
      const x = this.listOfWallets.find(el => el.name === wallet.name)
      x.selected = true
    }
  },
  mounted () {
    this.getWallets()
  },
  activated () {
    this.getWallets()
  }
}
</script>

<style>
</style>
