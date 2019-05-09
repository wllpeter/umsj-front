<template>
  <div style="margin-top: 50px">
    <el-form :model="roleParam" label-width="120px" style="width: 600px" size="small">
      <el-form-item label="角色编码(字母+下划线)">
        <el-input v-model="roleParam.code" :disabled="isEdit" />
      </el-form-item>
      <el-form-item label="角色名称(中文名称)">
        <el-input v-model="roleParam.name" />
      </el-form-item>
    </el-form>
    <div class="menu-tree">
      <el-tree
        ref="mTree"
        :data="menuTree"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :default-checked-keys="checkMenu"
      />
    </div>
    <div class="action-tree">
      <el-tree
        ref="aTree"
        :data="actionTree"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :default-checked-keys="checkAction"
      />
    </div>
    <el-button size="mini" type="primary" @click="saveChange(isEdit)">保存</el-button>
  </div>
</template>

<script>
import { updateRole, createRole } from '@/api/role'
const defaultRoleParam = {
  id: 0,
  actions: [],
  code: '',
  name: '',
  menus: [],
  subMenus: []
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
      postRoleParam: Object.assign({}, defaultRoleParam),
      checkAction: [],
      checkMenu: [],
      getAction: [],
      getMenu: [],
      menuTree: [
        {
          id: 1,
          label: '控制面板',
          code: 'dashboard',
          parent: true,
          children: []
        },
        {
          id: 2,
          label: '权限管理',
          code: 'privilege',
          parent: true,
          children: [
            {
              id: 5,
              label: '用户管理',
              code: 'usersManage',
              parent: false
            },
            {
              id: 6,
              label: '角色配置',
              code: 'rolesManage',
              parent: false
            }
          ]
        },
        {
          id: 3,
          label: 'UDS',
          code: 'uds',
          parent: true,
          children: [
            {
              id: 7,
              label: '发布单管理',
              code: 'udsPublish',
              parent: false
            },
            {
              id: 8,
              label: '新建发布单',
              code: 'udsPublishCreate',
              parent: false
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
  created() {
    if (this.isEdit) {
      this.roleParam = Object.assign({}, this.$route.params)
      this.handleChecked(this.$route.params)
    }
  },
  methods: {
    isExitAction(code) {
      let flag = false
      for (let i = 0; i < this.roleParam.actions.length; i++) {
        if (this.roleParam.actions[i] === code) {
          flag = true
        }
      }
      return flag
    },
    handleActionCheck(items) {
      for (let i = 0; i < this.actionTree.length; i++) {
        if (this.isExitAction(this.actionTree[i].code)) {
          this.checkAction.push(this.actionTree[i].id)
        }
      }
    },
    isExitMenu(code) {
      let flag = false
      this.roleParam.menus.forEach(element => {
        if (element === code) {
          flag = true
        }
      })
      return flag
    },
    handleMenuCheck(items) {
      this.menus = this.defaultRouteTree
      const length = this.menuTree.length
      for (let i = 0; i < length; i++) {
        var item = this.menuTree[i]
        if (this.isExitMenu(item.code)) {
          this.checkMenu.push(item.id)
        }
        if (item.children && item.children.length > 0) {
          var child = item.children
          for (let j = 0; j < child.length; j++) {
            if (this.isExitMenu(child[j].code)) {
              this.checkMenu.push(item.id)
            }
          }
        }
      }
    },
    handleChecked(params) {
      this.roleParam = params
      //  处理action check
      this.handleActionCheck(this.roleParam.actions)
      //  处理action check
      this.handleMenuCheck(this.roleParam.menus)
    },
    getCheckMenu() {
      this.getMenu = this.$refs.mTree.getCheckedNodes()
      const size = this.getMenu.length
      this.postRoleParam.menus = []
      this.postRoleParam.subMenus = []
      for (let i = 0; i < size; i++) {
        if (this.getMenu[i].parent) {
          this.postRoleParam.menus.push(this.getMenu[i].code)
        } else {
          this.postRoleParam.subMenus.push(this.getMenu[i].code)
        }
      }
      this.roleParam.menus = this.postRoleParam.menus
      this.roleParam.subMenus = this.postRoleParam.subMenus
    },
    getCheckAction() {
      this.getAction = this.$refs.aTree.getCheckedNodes()
      const size = this.getAction.length
      this.postRoleParam.actions = []
      for (let i = 0; i < size; i++) {
        this.postRoleParam.actions.push(this.getAction[i].code)
      }
      this.roleParam.actions = this.postRoleParam.actions
    },
    saveChange(isEdit) {
      this.getCheckAction()
      this.getCheckMenu()
      this.$confirm('是否要保存该角色', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (isEdit) {
          updateRole(this.roleParam).then(response => {
            this.$message({
              type: 'success',
              message: '提交成功',
              duration: 1000
            })
            this.$router.push({ path: '/permission/role' })
          })
        } else {
          createRole(this.roleParam).then(response => {
            this.$message({
              type: 'success',
              message: '提交成功',
              duration: 1000
            })
            this.$router.push({ path: '/permission/role' })
          })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
