<template>
  <div>
      <component
          v-bind:is="currentComponent"
        />
  </div>
</template>

<script>
import NewTransaction from './NewTransaction.vue'
import NewGrocery from './NewGrocery.vue'
export default {
  components: {
    NewGrocery,
    NewTransaction
  },
  data () {
    return {
      transactions: [],
      currentComponent: 'NewGrocery'
    }
  },
  async mounted () {
    // await this.$realmApp.loginEmailPassword('jordan.capoquian@gmail.com', 'P@$$w0rd')
    // console.log('this.$realmApp', this.$realmApp.currentUser)
    // // const mongodb = this.$realmApp.currentUser.mongoClient('mongodb+srv://ninjamon:ninjadev@cluster0.m6rke.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    // const mongodb = this.$realmApp.currentUser.mongoClient('kuripot-realm-service')
    // // mongodb://<USERNAME>:<PASSWORD>@realm.mongodb.com:27020/?authMechanism=PLAIN&authSource=%24external&ssl=true&appName=kuripotapp-aygwr:<SERVICE_NAME>:local-userpass
    // const collection = mongodb.db('kuripot').collection('transactions')
    // console.log('collection>', await collection.find())
    // this.transactions = await collection.find()
  }
}
</script>

<style>

</style>
