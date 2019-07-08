import { reqAddress, reqFoodCategories, reqShopList } from '../api/'
import { RECEIVE_ADDRESS, RECEIVE_CATEGORIES, RECEIVE_SHOPS } from './mutation-types'


export default{
  async getAddress ({ commit, state }) {
    const { longitude, latitude } = state
    const result = await reqAddress( longitude, latitude )
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, address)
    }
  },
  async getFoodCategories ({ commit }, callback) {
    const result = await reqFoodCategories()
    if (result.code === 0) {
      const categories = result.data
      commit(RECEIVE_CATEGORIES, categories)
    }
    typeof callback === 'function' && callback()
  },
  async getShops ({ commit, state }) {
    const { longitude, latitude } = state
    const result = await reqShopList({longitude, latitude})
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  }
}