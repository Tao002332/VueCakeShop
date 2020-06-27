import request from '@/utils/request'
const GroupName = 'property'
const ApiName = 'keys'

export default {
  findById (id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}`,
      method: 'get'
    })
  },
  findByCateId (id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}/findByCateId`,
      method: 'get'
    })
  }
}
