<template>
  <div>
    <ul v-for="(item,index) in roleList" :key="index">
      <li>
        <el-button type="success" size="mini" round>{{ item.name }}</el-button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'RoleButton',
  props: {
    roleList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>
<style  scoped>
li {
  list-style: none;
}
</style>

