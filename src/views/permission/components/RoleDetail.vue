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
      roleParam: Object.assign({}, defaultRoleParam)
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped>
</style>
