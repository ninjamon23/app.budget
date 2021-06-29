import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../components/Home.vue')
      },
      {
        path: 'wallet',
        name: 'Wallet',
        component: () => import('../components/wallet/Wallet.vue')
      },
      {
        path: 'transaction',
        name: 'Transaction',
        component: () => import('../components/transaction/Transaction.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../layouts/LoginLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../components/account/Login.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
