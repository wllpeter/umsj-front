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
import { defaultRouteTree } from '@/utils/common'
export default {
  name: 'MenuPermission',
  props: {
    selfMenus: Array
  },
  data() {
    return {
      menus: [],
      copyMenu: []
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
      this.copyMenu = defaultRouteTree
      const length = this.copyMenu.length
      for (let i = 0; i < length; i++) {
        var item = this.copyMenu[i]
        if (this.isExist(item.code)) {
          this.copyMenu[i].isActive = true
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
      this.menus = this.copyMenu
    }
  }
}
</script>

