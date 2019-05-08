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