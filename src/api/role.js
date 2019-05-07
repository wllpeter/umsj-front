import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/api/role/findMany',
    method: 'get',
    params: params
  })
}
