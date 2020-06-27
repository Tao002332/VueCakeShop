import request from '@/utils/request'
const GroupName = 'user'
const ApiName = 'users'

export function login (data) {
  return request({
    url: `/${GroupName}/${ApiName}/login`,
    method: 'post',
    data
  })
}

export function getInfo () {
  return request({
    url: `/${GroupName}/${ApiName}/getInfo`,
    method: 'get'
  })
}

export function logout () {
  return request({
    url: `/${GroupName}/${ApiName}/logout`,
    method: 'get'
  })
}
