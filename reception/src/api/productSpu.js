import request from '@/utils/request'
const GroupName = 'product'
const ApiName = 'spus'

export default {
  getSkus (id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}/getSkus`,
      method: 'get'
    })
  },
  searchPage (spu, page, size) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: spu
    })
  }
}
