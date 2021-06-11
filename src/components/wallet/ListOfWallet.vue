<template>
  <div>
    <div class="px-4 py-2 my-2">
      <h1 class="display-5 fw-bold">My Wallets</h1>
    </div>
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-secondary" @click="create">Create</button>
      <button type="button" class="btn btn-secondary">Update</button>
      <button type="button" class="btn btn-secondary">Delete</button>
    </div>
    <table class="table">
      <!-- <caption>My Wallets</caption> -->
      <thead>
        <tr>
          <!-- <th></th> -->
          <th>Name</th>
          <th>Type</th>
          <th class="text-end">Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="wallet in listOfWallets" :key="wallet.id" @click="wallet.selected = !wallet.selected" :class="{ 'table-active': wallet.selected }">
          <!-- <td>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
              />
              <label class="form-check-label">
              </label>
            </div>
          </td> -->
          <td>{{ wallet.name }}</td>
          <td>{{ wallet.type.name }}</td>
          <td class="text-end">{{ wallet.balance }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      listOfWallets: []
    }
  },
  methods: {
    getWallets () {
      let wallets = localStorage.getItem('wallets')
      if (!wallets) {
        wallets = []
      } else {
        wallets = JSON.parse(wallets)
      }
      this.listOfWallets = wallets
    },
    create () {
      console.log('create new wallet.')
      this.$emit('saved', 'CreateWallet')
    },
    update () {

    },
    delete () {

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
