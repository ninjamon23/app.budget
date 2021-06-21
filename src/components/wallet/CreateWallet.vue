<template>
  <div class="mt-5">
    <h1>Wallet Form</h1>
    <form @submit.prevent="saveWallet">
      <div class="form-floating mb-3 needs-validation">
        <input
          type="text"
          class="form-control"
          v-model="form.name"
          required
        />
        <label for="floatingInput">Name of wallet</label>
      </div>
      <div class="form-floating mb-3">
        <select v-model="form.type" class="form-select" required>
            <option v-for="walletType in walletTypes" :key="walletType.id" :value="walletType">
                {{ walletType.name }}
            </option>
        </select>
        <label for="floatingInput">Type of wallet</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="number"
          class="form-control"
          v-model="form.balance"
          required
          step="0.01"
        />
        <label for="floatingInput">Wallet Balance</label>
      </div>
      <hr>
      <button type="submit" class="btn btn-primary me-1">
          Submit
      </button>
      <button type="reset" class="btn btn-primary" @click="cancel">
          Cancel
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: ['walletTypes', 'id'],
  data () {
    return {
      form: {
        id: 0,
        name: '',
        type: null,
        balance: 0,
        selected: false
      }
    }
  },
  computed: {
    ...mapGetters(['getWalletToModify'])
  },
  methods: {
    ...mapActions(['setCurrentWalletComponent', 'setWalletToModify']),
    saveWallet () {
      let wallets = localStorage.getItem('wallets')
      if (!wallets) {
        wallets = []
      } else {
        wallets = JSON.parse(wallets)
      }
      if (this.getWalletToModify) {
        wallets = wallets.filter(el => el.name !== this.getWalletToModify.name)
      }
      wallets.push(this.form)
      localStorage.setItem('wallets', JSON.stringify(wallets))
      // this.$emit('saved', 'ListOfWallet')
      this.setWalletToModify(null)
      this.setCurrentWalletComponent('ListOfWallet')
    },
    cancel () {
      // this.$emit('saved', 'ListOfWallet')
      this.setWalletToModify(null)
      this.setCurrentWalletComponent('ListOfWallet')
    }
  },
  mounted () {
    if (this.getWalletToModify) {
      this.form = JSON.parse(JSON.stringify(this.getWalletToModify))
    }
  },
  activated () {
    // if (!this.id) {
    //   this.form = {
    //     id: 0,
    //     name: '',
    //     type: null,
    //     balance: 0,
    //     selected: false
    //   }
    // } else {
    //   let wallets = localStorage.getItem('wallets')
    //   if (!wallets) {
    //     wallets = []
    //   } else {
    //     wallets = JSON.parse(wallets)
    //   }

    //   this.form = wallets.find(el => el.id === this.id)
    // }
    console.log('activated>')
    if (this.getWalletToModify) {
      this.form = JSON.parse(JSON.stringify(this.getWalletToModify))
    }
  }
}
</script>

<style>
</style>
