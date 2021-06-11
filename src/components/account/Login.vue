<template>
  <div class="row justify-content-center">
    <div class="col-sm-6" v-if="!$auth.loading">
      <div class="">
        <logo height="200px" />
        <div class="card-body">
          <h5 class="card-title">Welcome to Budget Maker App!</h5>
          <p class="card-text">
            Simple, easy, and personalize budgeting app!
          </p>
          <div class="d-grid gap-2">
            <button class="btn btn-primary" type="button" v-if="!$auth.isAuthenticated"
            @click="login">Log in</button>
            <button class="btn btn-primary" type="button" v-if="$auth.isAuthenticated"
            @click="logout">Log out</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '../Logo.vue'
export default {
  components: {
    Logo
  },
  methods: {
    // Log the user in
    login () {
      this.$auth.loginWithRedirect()
    },
    // Log the user out
    logout () {
      this.$auth.logout({
        returnTo: window.location.origin
      })
    }
  }
}
</script>

<style>
</style>
