import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import user from './modules/user'
import shop from './modules/shop'
import home from './modules/home'

Vue.use(Vuex)
export default new Vuex.Store({
  mutations,
  actions,
  getters,
  modules: {
    user,
    shop,
    home
  }
})