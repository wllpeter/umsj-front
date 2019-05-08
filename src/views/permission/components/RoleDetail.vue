<template>
  <div style="margin-top: 50px">
    <el-form
      ref="roleParam"
      :model="roleParam"
      label-width="120px"
      style="width: 600px"
      size="small"
    >
      <el-form-item label="角色编码(字母+下划线)">
        <el-input v-model="roleParam.code" />
      </el-form-item>
      <el-form-item label="角色名称(中文名称)">
        <el-input v-model="roleParam.name" />
      </el-form-item>
    </el-form>
    <div class="menu-tree">
      <el-tree
        :data="menuTree"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      />
    </div>
    <div class="action-tree">
      <el-tree
        :data="actionTree"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :default-checked-keys="checkMenu"
      />
    </div>
  </div>
</template>

<script>
const defaultRoleParam = {
  actions: [],
  code: '',
  name: '',
  subMenus: [],
  menus: []
}
export default {
  name: 'RoleDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleParam: Object.assign({}, defaultRoleParam),
      checkAction: [],
      checkMenu: [],
      menuTree: [
        {
          id: 1,
          label: '控制面板',
          code: 'dashboard',
          children: []
        },
        {
          id: 2,
          label: '权限管理',
          code: 'privilege',
          children: [
            {
              id: 5,
              label: '用户管理',
              code: 'usersManage'
            },
            {
              id: 6,
              label: '角色配置',
              code: 'rolesManage'
            }
          ]
        },
        {
          id: 3,
          label: 'UDS',
          code: 'uds',
          children: [
            {
              id: 7,
              label: '发布单管理',
              code: 'udsPublish'
            },
            {
              id: 8,
              label: '新建发布单',
              code: 'udsPublishCreate'
            }
          ]
        }
      ],
      actionTree: [
        {
          id: 1,
          label: '系统管理权限',
          code: 'SYS_ADMIN',
          children: []
        },
        {
          id: 2,
          label: '权限模块读权限',
          code: 'privilege_read',
          children: []
        },
        {
          id: 3,
          label: '权限模块所有权限',
          code: 'privilege_all',
          children: []
        },
        {
          id: 4,
          label: 'UDS 发布权限',
          code: 'uds_publish',
          children: []
        },
        {
          id: 5,
          label: 'UDS 审核权限',
          code: 'uds_apply',
          children: []
        }
      ]
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped>

</style>
