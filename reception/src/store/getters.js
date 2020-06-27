const getters = {
  token: state => state.user.token,
  user_name: state => state.user.user_name,
  data_flag: state => state.user.data_flag,
  cart: state => state.cart.cart
}
export default getters
