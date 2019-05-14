import request from '@/utils/request'

export function fetchList(params) {
    return request({
      url: '/uds/publishList',
      method: 'get',
      params: params
    })
}

export function createPublish(data) {
  return request({
    url: '/uds/createPublish',
    method: 'post',
    data: data
  })
}
