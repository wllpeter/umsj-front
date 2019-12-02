<template>
  <div class="markdown">
    <div class="container">
      <mavon-editor
        ref="md"
        v-model="content"
        style="min-height: 600px"
        @imgAdd="$imgAdd"
        @change="change"
      />
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { saveMarkdown } from '@/api/mark'
export default {
  name: '',
  components: {
    mavonEditor
  },
  props: [],

  data() {
    return {
      content: '',
      html: '',
      configs: {},
      params: {
        content: ''
      }
    }
  },
  mounted() {},
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file) {
      const formdata = new FormData()

      this.$upload
        .post('/上传接口地址', formdata)
        .then(res => {
          console.log(res.data)
          this.$refs.md.$img2Url(pos, res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render
    },
    // 提交
    submit() {
      console.log(this.content)
      console.log(this.html)
      this.params.content = this.html
      saveMarkdown(this.params).then(response => {
        this.$message({
          type: 'success',
          message: '添加成功',
          duration: 1000
        })
      })
    }
  }
}
</script>
<style lang="scss">
.markdown {
  margin-left: 5px;
  margin-top: 5px;
}
</style>
