import request from '@/utils/request'
const GroupName = 'product'
const ApiName = 'spus'

export default {
  save(spus) {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'post',
      data: spus
    })
  },
  updateById(id, spus) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}`,
      method: 'put',
      data: spus
    })
  },
  findById(id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}`,
      method: 'get'
    })
  },
  getSkus(id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}/getSkus`,
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
  search(spus) {
    return request({
      url: `/${GroupName}/${ApiName}/search`,
      method: 'post',
      data: spus
    })
  },
  searchPage(spus, page, size) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: spus
    })
  }
}
