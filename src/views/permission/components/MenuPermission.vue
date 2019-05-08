<template>
  <div>
    <div v-for="(item,index) in menus" :key="index">
      <div v-if="item.isActive">
        <ul>
          <li>
            {{ item.lable }}
            <div v-if="item.children">
              <div v-for="(value,childrenIndex) in item.children" :key="childrenIndex">
                <ul>
                  <li v-if="value.isActive">{{ value.lable }}</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MenuPermission',
  props: {
    selfMenus: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      menus: [],
      copyMenu: [],
      defaultRouteTree: [
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
    }
  },
  created() {
    this.handleMenu()
  },
  methods: {
    isExist(code) {
      let flag = false
      this.selfMenus.forEach(element => {
        if (element === code) {
          flag = true
        }
      })
      return flag
    },
    handleMenu() {
      this.menus = this.defaultRouteTree
      const length = this.menus.length
      for (let i = 0; i < length; i++) {
        var item = this.menus[i]
        if (this.isExist(item.code)) {
          this.menus[i].isActive = true
        }
        if (item.children && item.children.length > 0) {
          var child = item.children
          for (let j = 0; j < child.length; j++) {
            if (this.isExist(child[j].code)) {
              child[j].isActive = true
            }
          }
        }
      }
    }
  }
}
</script>

