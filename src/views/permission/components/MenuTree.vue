<template>
  <el-tree
    :data="menus"
    node-key="id"
    default-expand-all
    :expand-on-click-node="false"
  />
</template>
<script>
import { defaultRouteTree } from '@/utils/common'
export default {
  name: 'MenuTree',
  props: {
    selfMenus: Array,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menus: []
    }
  },
  created() {
    this.menus = defaultRouteTree
    console.log(this.menus)
  }
}
</script>

