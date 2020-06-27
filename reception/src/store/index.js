import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import cart from './modules/cart'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    cart
  },
  getters,
  plugins: [createPersistedState(
    { storage: window.sessionStorage }
  )]
})

export default store
