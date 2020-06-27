import request from '@/utils/request'
const GroupName = 'property'
const ApiName = 'keys'

export default {
  save(key) {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'post',
      data: key
    })
  },
  updateById(id, key) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}`,
      method: 'put',
      data: key
    })
  },
  findById(id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}`,
      method: 'get'
    })
  },
  putOn(id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}/putOn`,
      method: 'put'
    })
  },
  deleteById(id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}`,
      method: 'delete'
    })
  },
  findByCateId(cateId) {
    return request({
      url: `/${GroupName}/${ApiName}/${cateId}/findByCateId`,
      method: 'get'
    })
  }
}
