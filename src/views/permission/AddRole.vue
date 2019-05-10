<template>
  <div>
    <role-detail :is-edit="false" />
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

