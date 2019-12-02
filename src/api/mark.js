import request from '@/utils/request'

export function saveMarkdown(data) {
    return request({
        url: '/mark/add',
        method: 'post',
        data: data
    })
}
