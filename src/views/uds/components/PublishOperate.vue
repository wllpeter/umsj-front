<template>
  <div class="operate">
    <div class="publish">
      <h4>发布操作：</h4>
      <el-button type="primary" icon="el-icon-position">提交审核</el-button>
      <el-button type="warning" icon="el-icon-refresh-left">撤回提审</el-button>
      <el-button type="danger" icon="el-icon-close">取消发布</el-button>
      <el-button type="primary" icon="el-icon-finished">完成发布</el-button>
    </div>
    <div class="audit">
      <h4>审核操作：</h4>
      <el-button type="primary" icon="el-icon-check">通过</el-button>
      <el-button type="danger" icon="el-icon-close">驳回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PublishOperate',
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>
