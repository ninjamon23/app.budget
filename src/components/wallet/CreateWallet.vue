<template>
  <div class="mt-5">
    <h1>Wallet Form</h1>
    <form @submit.prevent="saveWallet">
      <div class="form-floating mb-3">
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
export default {
  props: ['walletTypes'],
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
  methods: {
    saveWallet () {
      let wallets = localStorage.getItem('wallets')
      if (!wallets) {
        wallets = []
      } else {
        wallets = JSON.parse(wallets)
      }
      wallets.push(this.form)
      localStorage.setItem('wallets', JSON.stringify(wallets))
      this.$emit('saved', 'ListOfWallet')
    },
    cancel () {
      this.$emit('saved', 'ListOfWallet')
    }
  },
  activated () {
    this.form = {
      id: 0,
      name: '',
      type: null,
      balance: 0,
      selected: false
    }
  }
}
</script>

<style>
</style>
