<template>
  <div>
    <div v-for="(item,index) in actions" :key="index">
      <div v-if="item.isActive === 'show'">
        <ul>
          <li>{{ item.lable }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ActionsPermission',
  props: {
    selfActions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      actions: [],
      defaultActions: [
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
    }
  },
  created() {
    this.handleAtions()
  },
  methods: {
    isExist(code) {
      let flag = false
      for (let i = 0; i < this.selfActions.length; i++) {
        if (this.selfActions[i] === code) {
          flag = true
        }
      }
      return flag
    },
    handleAtions() {
      // console.log(this.defaultActions)
      this.actions = this.defaultActions
      for (let i = 0; i < this.actions.length; i++) {
        if (this.isExist(this.actions[i].code)) {
          this.actions[i].isActive = 'show'
        }
      }
    }
  }
}
</script>
