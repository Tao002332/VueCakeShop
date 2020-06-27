import { login, getInfo, logout } from '@/api/user'
import { getUserToken, setUserToken, removeUserToken } from '@/utils/auth'

const state = {
  token: getUserToken().token,
  user_name: '',
  data_flag: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_NAME: (state, username) => {
    state.user_name = username
  },
  SET_DATA_FLAG: (state, dataFlag) => {
    state.data_flag = dataFlag
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { loginName, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ user_name: loginName.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setUserToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        if (!data) {
          reject(new Error('Verification failed, please Login again.'))
        }
        // eslint-disable-next-line camelcase
        const { user_name, data_flag } = data

        commit('SET_USER_NAME', user_name)
        commit('SET_DATA_FLAG', data_flag)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_DATA_FLAG', '')
        removeUserToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_DATA_FLAG', '')
      removeUserToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
