import request from '@/utils/request'
const GroupName = 'order'
const ApiName = 'orders'

export default {
  findAll() {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'get'
    })
  },
  findById(id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}`,
      method: 'get'
    })
  },
  deleteById(id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}`,
      method: 'delete'
    })
  },
  search(order) {
    return request({
      url: `/${GroupName}/${ApiName}/search`,
      method: 'post',
      data: order
    })
  },
  searchPage(order, page, size) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: order
    })
  }
}
