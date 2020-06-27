import Cookies from 'js-cookie'

const TokenKey = 'userTokenKey'

export function getUserToken () {
  return {
    token: Cookies.get(TokenKey)
  }
}

export function setUserToken (token) {
  Cookies.set(TokenKey, token)
}

export function removeUserToken () {
  Cookies.remove(TokenKey)
}
