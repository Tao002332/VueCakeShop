import request from '@/utils/request'
const GroupName = 'user'
const ApiName = 'users'

export default {
  findAll() {
    return request({
      url: `/${GroupName}/${ApiName}/`,
      method: 'get'
    })
  },
  findByUid(id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}`,
      method: 'get'
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
  forbid(id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}/forbid`,
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
