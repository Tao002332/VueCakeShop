import request from '@/utils/request'
const GroupName = 'order'
const ApiName = 'orders'

export default {
  save (order) {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'post',
      data: order
    })
  },
  findOrderByOrderNoAndPhone (condition) {
    return request({
      url: `/${GroupName}/${ApiName}/findOrderByOrderNoAndPhone`,
      method: 'post',
      data: condition
    })
  }
}
