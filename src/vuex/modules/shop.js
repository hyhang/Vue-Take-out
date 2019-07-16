import Vue from 'vue'
import { reqGoods, reqInfo, reqRatings } from '../../api/'
import { 
  RECEIVE_INFO, 
  RECEIVE_RATINGS, 
  RECEIVE_GOODS,
  ADD_COUNT,
  REDUCE_COUNT
} from '../mutation-types'
const state = {
  goods: [],
  info: {},
  ratings: [],
  cardFoods: []
}

const mutations = {
  [RECEIVE_INFO](state, info){
    state.info = info
  },
  [RECEIVE_RATINGS](state, ratings){
    state.ratings = ratings
  },
  [RECEIVE_GOODS](state, goods){
    state.goods = goods
  },
  [ADD_COUNT](state, food){
    if (!food.hasOwnProperty('count')) {
      Vue.set(food, 'count', 1)
      state.cardFoods.push(food)
    } else {
      food.count++
    }
  },
  [REDUCE_COUNT](state, food){
    if (food.count > 0) {
      food.count--
      if (food.count === 0) {
        delete food.count
        state.cardFoods.splice(state.cardFoods.indexOf(food), 1)
      }
    }
  }
}

const actions = {
  async getShopInfo({commit}, cb) {
    const result = await reqInfo()
    if(result.code===0) {
      const info = result.data
      commit(RECEIVE_INFO, info)
      cb && cb()
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({commit}, cb) {
    const result = await reqRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, ratings)
      cb && cb()
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit}, cb) {
    const result = await reqGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, goods)
      cb && cb()
    }
  },

  updateCount({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(ADD_COUNT, food)
    } else {
      commit(REDUCE_COUNT, food)
    }
  }
}

const getters = {
  totalCount() {
    return state.cardFoods.reduce((pre, food) => pre + food.count,0)
  },

  totalPrice() {
    return state.cardFoods.reduce((pre, food) => pre + food.count * food.price, 0)
  }
}

export default{
  state,
  mutations,
  actions,
  getters
}