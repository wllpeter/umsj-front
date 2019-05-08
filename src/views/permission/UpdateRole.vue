<template>
  <div>
    <h3>编辑角色</h3>
    <role-detail :is-edit="true" />
  </div>
</template>
<script>
import RoleDetail from './components/RoleDetail'
export default {
  name: 'UpdateRole',
  components: { RoleDetail },
  data() {
    return {
        name: ''
    }
  }
}
</script>
