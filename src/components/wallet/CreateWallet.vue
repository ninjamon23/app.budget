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
// import { mapActions, mapGetters } from 'vuex'
import { ref, computed, onMounted, onActivated } from '@vue/composition-api'
export default {

  props: ['walletTypes', 'id'],
  setup (props, { root }) {
    console.log('root>', root)
    const store = root.$store
    const form = ref({
      id: 0,
      name: '',
      type: null,
      balance: 0,
      selected: false
    })

    const saveWallet = async () => {
      let wallets = localStorage.getItem('wallets')
      if (!wallets) {
        wallets = []
      } else {
        wallets = JSON.parse(wallets)
      }
      if (getWalletToModify) {
        wallets = wallets.filter(el => el.name !== getWalletToModify.name)
      }
      wallets.push(form.value)
      localStorage.setItem('wallets', JSON.stringify(wallets))
      // this.$emit('saved', 'ListOfWallet')
      store.dispatch('setWalletToModify', null)
      store.dispatch('setCurrentWalletComponent', 'ListOfWallet')
    }

    const cancel = async () => {
      store.dispatch('setWalletToModify', null)
      store.dispatch('setCurrentWalletComponent', 'ListOfWallet')
    }

    const getWalletToModify = computed(() => {
      return store.getters.getWalletToModify
    })

    onMounted(() => {
      console.log('mounted in the composition api!')
      if (getWalletToModify) {
        form.value = JSON.parse(JSON.stringify(getWalletToModify))
      }
    })

    onActivated(() => {
      console.log('onActivated in the composition api!')
      if (getWalletToModify) {
        form.value = JSON.parse(JSON.stringify(getWalletToModify))
      }
    })

    return { form, saveWallet, cancel, getWalletToModify }
  }
}
</script>

<style>
</style>
