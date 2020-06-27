import request from '@/utils/request'
const GroupName = 'product'
const ApiName = 'cates'

export default {
  findAll() {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'get'
    })
  },
  save(cate) {
    return request({
      url: `/${GroupName}/${ApiName}`,
      method: 'post',
      data: cate
    })
  },
  updateById(id, cate) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}`,
      method: 'put',
      data: cate
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
  getKeys(id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}/getKeys`,
      method: 'get'
    })
  },
  getSpus(id) {
    return request({
      url: `/${GroupName}/${ApiName}/${id}/getSpus`,
      method: 'get'
    })
  },
  search(cate) {
    return request({
      url: `/${GroupName}/${ApiName}/search`,
      method: 'post',
      data: cate
    })
  },
  searchPage(cate, page, size) {
    return request({
      url: `/${GroupName}/${ApiName}/search/${page}/${size}`,
      method: 'post',
      data: cate
    })
  }
}
