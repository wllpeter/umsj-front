import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/api/role/findMany',
    method: 'get',
    params: params
  })
}

export function deleteRole(data) {
  return request({
    url: '/api/role/deleteRole',
    method: 'post',
    data: data
  })
}

export function updateRole(data) {
  return request({
    url: '/api/role/updateRole',
    method: 'post',
    data: data
  })
}

export function createRole(data) {
  return request({
    url: '/api/role/createRole',
    method: 'post',
    data: data
  })
}
