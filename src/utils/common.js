export const defaultRouteTree = [
    {
        lable: '控制面板',
        code: 'dashboard',
        isActive: false,
        children: []
    },
    {
        lable: '权限管理',
        code: 'privilege',
        isActive: false,
        children: [
            {
                lable: '用户管理',
                code: 'usersManage',
                isActive: false
            },
            {
                lable: '角色配置',
                code: 'rolesManage',
                isActive: false
            }
        ]
    },
    {
        lable: 'UDS',
        code: 'uds',
        isActive: false,
        children: [
            {
                lable: '发布单管理',
                code: 'udsPublish',
                isActive: false
            },
            {
                lable: '新建发布单',
                code: 'udsPublishCreate',
                isActive: false
            }
        ]
    }
]

export const defaultActions = [
    {
        code: 'SYS_ADMIN',
        lable: '系统管理权限',
        isActive: 'unShow'
    },
    {
        code: 'privilege_read',
        lable: '权限模块读权限',
        isActive: 'unShow'
    },
    {
        code: 'privilege_all',
        lable: '权限模块所有权限',
        isActive: 'unShow'
    },
    {
        code: 'uds_publish',
        lable: 'UDS 发布权限',
        isActive: 'unShow'
    },
    {
        code: 'uds_apply',
        lable: 'UDS 审核权限',
        isActive: 'unShow'
    }
]

export function getUuid() {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
    s[8] = s[13] = s[18] = s[23] = '-'
    var uuid = s.join('')
    return uuid
}

export function formatStatus(satus) {
    let result = ''
    if (satus === 1) {
        result = '新建'
    }
    if (satus === 2) {
        result = '待审核'
    }
    if (satus === 3) {
        result = '审核通过'
    }
    if (satus === 4) {
        result = '审核不通过'
    }
    if (satus === 5) {
        result = '发布成功'
    }
    if (satus === 6) {
        result = '发布失败'
    }
    if (satus === 7) {
        result = '取消发布'
    }
    if (satus === 8) {
        result = '发布中'
    }
    return result
}

export function formatNull(str) {
    let result = str
    if (str === '' || str === undefined) {
        result = '无'
    }
    return result
}

export function formatItemStatus(itemSatus) {
    let result = ''
    if (itemSatus === 1) {
        result = '未发布'
    }
    if (itemSatus === 2) {
        result = '发布成功'
    }
    if (itemSatus === 3) {
        result = '发布失败'
    }
    return result
}
