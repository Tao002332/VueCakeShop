import request from '@/utils/request'
const GroupName = 'user'
const ApiName = 'admins'

export default {
  findAll() {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'get'
    })
  },
  findByUid(id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}`,
      method: 'get'
    })
  },
  save(user) {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'post',
      data: user
    })
  },
  updateByUid(id, user) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}`,
      method: 'put',
      data: user
    })
  },
  deleteByUid(id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}`,
      method: 'delete'
    })
  },
  unseal(id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}/unseal`,
      method: 'put'
    })
  },
  search(user) {
    return request({
      url: `/${GroupName}/${ApiName}/search`,
      method: 'post',
      data: user
    })
  },
  searchPage(user, page, size) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: user
    })
  }
}

export function login(data) {
  return request({
    url: `/${GroupName}/${ApiName}/login`,
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: `/${GroupName}/${ApiName}/getInfo`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: `/${GroupName}/${ApiName}/logout`,
    method: 'get'
  })
}
