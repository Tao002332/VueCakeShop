import request from '@/utils/request'
const GroupName = 'product'
const ApiName = 'cates'

export default {
  findAll () {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'get'
    })
  },
  getKeys (id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}/getKeys`,
      method: 'get'
    })
  }
}
