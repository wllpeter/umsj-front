<template>
  <div style="width: 100%;">
    <role-detail :is-edit="false"></role-detail>
  </div>
</template>
<script>
import RoleDetail from './components/RoleDetail'
export default {
  name: 'AddRole',
  components: { RoleDetail },
  data() {
    return {
      name: ''
    }
  }
}
</script>

