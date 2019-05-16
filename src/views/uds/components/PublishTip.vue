<template>
  <div class="create-publish-tip">
    <el-card class="box-card">
      <h3>提示</h3>
      <ol>
        <li>
          发布单中发布项为必填、带
          <div class="create-publish-tip-star">*</div>的为必填项；
        </li>
        <li>
          如有操作上的疑问，
          <a
            href="http://wiki.tuniu.org/pages/viewpage.action?pageId=101177636"
            target="view_window"
            style="color: #72AFD2"
          >请点击这里查看帮助文档；</a>
        </li>
      </ol>
      <h4>发布时间</h4>
      <ol>
        <li>日常发布：每周一、三、五全天可发布；</li>
        <li>
          紧急发布：非日常发布时间段；参见
          <a
            href="http://wiki.tuniu.org/pages/viewpage.action?pageId=62259972"
            target="view_window"
            style="color: #72AFD2"
          >数据开发后台上线发布流程。</a>
        </li>
        <li>审核时间：工作日 09:00~18:00；</li>
      </ol>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'PublishTip',
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.create-publish-tip {
  margin-left: 10px;
  margin-right: 10px;
  .box-card {
    width: 95%;
  }
  // width: 100%;
  .create-publish-tip-star {
    color: #ff4949;
    display: inline;
  }
}
</style>
