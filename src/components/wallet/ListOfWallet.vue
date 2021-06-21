<template>
  <div>
    <h1 class="h1 mt-5">My Wallets</h1>
    <div class="row mt-3">
      <div class="col-md-10">
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-primary" @click="create">
            <span>
              <i class="fas fa-plus-circle"></i>
              Create
            </span>
          </button>
          <button type="button" class="btn btn-primary" @click="update">
            <span>
              <i class="fas fa-edit"></i>
              Update
            </span>
          </button>
          <button type="button" class="btn btn-primary" @click="remove">
            <span>
              <i class="far fa-trash-alt"></i>
              Delete
            </span>
          </button>
          <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ currentDisplay }} View
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li
              v-for="display in displayTypes"
              :key="display"
              @click="setDisplay(display)"
            >
              <a class="dropdown-item" href="javascript:void(0)">{{
                display
              }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row mt-5" v-if="currentDisplay === 'Table'">
      <div class="col-lg-12">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th class="text-end">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(wallet, index) in listOfWallets"
                :key="index"
                @click="select(wallet)"
                :class="{ 'table-active': wallet.selected }"
              >
                <td>{{ wallet.name }}</td>
                <td>{{ wallet.type.name }}</td>
                <td class="text-end">{{ formatMoney(wallet.balance) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row mt-5" v-if="currentDisplay === 'Card'">
      <div
        class="col-md-auto mt-3"
        v-for="(wallet, index) in listOfWallets"
        :key="index"
      >
        <div class="card shadow bg-rounded" :class="{ 'border-dark': wallet.selected }">
          <div class="card-header" @click="select(wallet)">{{ wallet.type.name }}</div>
          <div class="card-body">
            <h5 class="card-title">{{ wallet.name }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              Account #: ******-*******-1234
            </h6>
            <p class="card-text">Current Balance : {{ formatMoney(wallet.balance) }}</p>
            <!-- <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import accounting from 'accounting-js'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      listOfWallets: [],
      selectedWallet: null,
      currentDisplay: 'Card',
      currency: {
        name: 'Philippine Peso',
        symbol: '₱'
      }
    }
  },
  computed: {
    displayTypes () {
      return ['Table', 'Card']
    }
  },
  methods: {
    ...mapActions(['setCurrentWalletComponent', 'setWalletToModify']),
    formatMoney (val) {
      const money = accounting.formatMoney(parseFloat(val), { symbol: this.currency.symbol, format: '%s %v' })
      return money
    },
    setDisplay (display) {
      this.currentDisplay = display
    },
    getWallets () {
      let wallets = localStorage.getItem('wallets')
      if (!wallets) {
        wallets = []
      } else {
        wallets = JSON.parse(wallets)
      }
      wallets.forEach((el) => {
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
      let x = JSON.parse(wallets)
      setTimeout(() => {
        x = x.filter((el) => el.name !== this.selectedWallet.name)
        localStorage.setItem('wallets', JSON.stringify(x))
        this.getWallets()
      }, 2000)
    },
    select (wallet) {
      this.selectedWallet = wallet
      this.listOfWallets.forEach((el) => {
        el.selected = false
      })
      const x = this.listOfWallets.find((el) => el.name === wallet.name)
      x.selected = true
    }
  },
  mounted () {
    this.getWallets()
    // console.log('this.currency.symbol', this.currency)
  },
  activated () {
    this.getWallets()
    // console.log('this.currency.symbol', this.currency)
  }
}
</script>

<style>
</style>
