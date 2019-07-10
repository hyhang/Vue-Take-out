import { reqAutoLogin } from '../../api/'
import { 
  RECEIVE_USER, 
  RESET_USER,
  RECEIVE_TOKEN,
  RESET_TOKEN
 } from '../mutation-types'

const state = {
  user: {},
  token: localStorage.getItem('token')
}

const mutations = {
  [RECEIVE_USER](state, user){
    state.user = user
  },
  [RESET_USER](state){
    state.user = {}
  },
  [RECEIVE_TOKEN](state, token){
    state.token = token
  },
  [RESET_TOKEN](state){
    state.token = ''
  }
}

const actions = {
  recordUser ({ commit }, user ) {
    commit(RECEIVE_TOKEN, user.token)
    localStorage.setItem('token', user.token)
    delete user.token
    commit(RECEIVE_USER, user)
  },
  logout({commit}) {
    commit(RESET_USER)
    commit(RESET_TOKEN)
    localStorage.removeItem('token')
  },
  async autoLogin({commit, state}) {
    const token = state.token
    if (token) {
      const result = await reqAutoLogin()
      if (result.code === 0) {
        const user = result.data
        commit(RECEIVE_USER, user)
      }
    }
  }
}

const getters = {

}

export default{
  state,
  mutations,
  actions,
  getters
}