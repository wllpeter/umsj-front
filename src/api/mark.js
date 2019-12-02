import request from '@/utils/request'

export function saveMarkdown(data) {
    return request({
        url: '/mark/add',
        method: 'post',
        data: data
    })
}

export function articleDetail(params) {
    return request({
        url: '/mark/articleDetail',
        method: 'get',
        params: params
    })
}
