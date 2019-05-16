<template>
  <div style="width: 100%;">
    <role-detail :is-edit="true"></role-detail>
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
