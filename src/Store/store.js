import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    login_show: false,
    cover_show: false
  },
  mutations: {
    showLogin () {
      this.state.login_show = true
      this.state.cover_show = true
    },
    hideLogin () {
      this.state.login_show = false
      this.state.cover_show = false
    }
  }
})
