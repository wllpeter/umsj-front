import request from '@/utils/request'

export function fetchList(params) {
    return request({
      url: '/uds/publishList',
      method: 'get',
      params: params
    })
  }
