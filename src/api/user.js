import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/user/info',
    method: 'get',
    params: {}
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}

export function fetchList(params) {
  return request({
    url: '/api/user/findMany',
    method: 'get',
    params: params
  })
}

export function getRoleList() {
  return request({
    url: '/api/role/findAll',
    method: 'get'
  })
}

export function updateUser(data) {
  return request({
    url: '/api/user/updateUser',
    method: 'post',
    data: data
  })
}

