<template>
  <div>
    <header class="p-3 mb-3 border-bottom" v-if="!$auth.loading">
      <div class="container">
        <div
          class="
            d-flex
            flex-wrap
            align-items-center
            justify-content-center justify-content-lg-start
          "
        >
          <router-link to="/" class="d-flex
              align-items-center
              mb-2 mb-lg-0
              text-dark text-decoration-none">
              <logo height="100"/>
          </router-link>
          <ul
            class="
              nav
              col-12 col-lg-auto
              me-lg-auto
              mb-2
              justify-content-center
              mb-md-0
            "
          >
            <li>
              <router-link to="/" class="nav-link px-2 link-dark">Home</router-link>
            </li>
            <li >
              <router-link to="/transaction" class="nav-link px-2 link-dark">Tranasction</router-link>
            </li>
            <li >
              <router-link to="/wallet" class="nav-link px-2 link-dark"> Wallet</router-link>
            </li>
            <li ><a href="#" class="nav-link px-2 link-dark">Report</a></li>
          </ul>

          <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              type="search"
              class="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div class="dropdown text-end">
            <a
              href="#"
              class="d-block link-dark text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <!-- <img
                src="https://github.com/mdo.png"
                alt="mdo"
                width="32"
                height="32"
                class="rounded-circle"
              /> -->
              Account
            </a>
            <ul
              class="dropdown-menu text-small"
              aria-labelledby="dropdownUser1"
              style=""
            >
              <li><a class="dropdown-item" href="#">My Profile</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#" @click="logout" v-if="$auth.isAuthenticated">Log out</a></li>
              <li><a class="dropdown-item" href="#" @click="login" v-if="!$auth.isAuthenticated">Log in</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <router-view class="container mt-2" />
  </div>
</template>

<script>
import Logo from '../components/Logo.vue'
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
      this.$router.push({ path: '/account/login' })
    }
  }
}
</script>

<style>
</style>
