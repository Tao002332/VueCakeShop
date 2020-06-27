/* eslint-disable camelcase */
const state = {
  cart: []
}

const mutations = {
  ADD_CART (state, {sku_id, num, price, product_title, product_img}) {
    const isHas = state.cart.some(item => {
      if (item.sku_id === sku_id) {
        item.num++
        return true
      } else return false
    })
    if (!isHas) {
      state.cart.push({sku_id: sku_id, num: num, price: price, product_title: product_title, product_img: product_img})
    }
  },
  UPDATE_CART (state, {sku_id, num}) {
    state.cart.some(item => {
      if (item.sku_id === sku_id) {
        if (item.num !== 1) {
          item.num--
        } else {
          if (confirm('是否移出购物车')) {
            state.cart.splice(state.cart.findIndex(item => item.sku_id === sku_id), 1)
          }
        }
      }
    })
  }
}

const actions = {
  addCart ({commit}, params) {
    commit('ADD_CART', params)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
