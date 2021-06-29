import * as Realm from 'realm-web'
import Vue from 'vue'

let realmApp
export let pluginInstance

export class VueMongoDbRealmPlugin {
  constructor () {
    this.currentUser = null
  }

  install (vue, options) {
    this.initialize(options)
    pluginInstance = this
    vue.prototype.$realmApp = Vue.observable(pluginInstance)
  }

  initialize (options) {
    const config = { id: options.id }
    realmApp = new Realm.App(config)
  }

  async loginAnonymous () {
    // Create an anonymous credential
    const credentials = Realm.Credentials.anonymous()
    try {
      // Authenticate the user
      const user = await realmApp.logIn(credentials)
      this.currentUser = realmApp.currentUser
      return user
    } catch (err) {
      console.error('Failed to log in', err)
    }
  }

  async loginEmailPassword (email, password) {
    // Create an anonymous credential
    const credentials = Realm.Credentials.emailPassword(email, password)
    this.currentUser = realmApp.currentUser
    try {
      // Authenticate the user
      const user = await realmApp.logIn(credentials)
      return user
    } catch (err) {
      console.error('Failed to log in', err)
    }
  }

  async logOut () {
    await realmApp.currentUser.logOut()
  }
}
