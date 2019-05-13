<template>
  <div class="create-publish">
    <div class="create-publish-form">
      <h3>新建发布单</h3>
      <el-form
        label-width="160px"
        :label-position="labelPosition"
        style="width: 600px"
        size="small"
      >
        <el-form-item label="上线原因">
          <el-input placeholder="本次的发布主题" />
        </el-form-item>
        <el-form-item label="JIRA单号">
          <el-input />
        </el-form-item>
        <el-form-item label="是否涉及核心数据">
          <el-select v-model="dataValue">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <div>
          <el-form-item label="代码类型">
            <el-select v-model="codeValue">
              <el-option
                v-for="item in codeTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="代码分支路径">
            <el-input type="textarea" />
          </el-form-item>
        </div>
        <el-form-item label="影响数据">
          <el-input />
        </el-form-item>
        <el-form-item label="ReviewBoard 地址">
          <el-input />
        </el-form-item>
        <el-form-item label="上线步骤说明">
          <el-input type="textarea" />
        </el-form-item>
        <el-form-item label="出错回滚步骤">
          <el-input type="textarea" />
        </el-form-item>
      </el-form>
      <el-button size="mini" type="primary">保存发布单</el-button>
    </div>
    <div class="create-publish-tip">
      <h3>提示</h3>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UdsCreate',
  data() {
    return {
      labelPosition: 'left',
      dataValue: '',
      codeValue: '',
      options: [
        {
          value: 0,
          label: '否'
        },
        {
          value: 1,
          label: '是'
        }
      ],
      codeTypes: [
        {
          value: 0,
          label: 'sh 文件'
        },
        {
          value: 1,
          label: 'ctsh 文件(创建表)'
        },
        {
          value: 2,
          label: 'jar 文件'
        }
      ]
    }
  },
  created() {
    this.dataValue = this.options[0].value
    this.codeValue = this.codeTypes[0].value
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.create-publish {
  margin-top: 10px;
  margin-left: 10px;
  width: 100%;
  display: flex;
  .create-publish-form {
    margin-left: 10px;
    width: 56%;
  }
  .create-publish-tip {
    margin-left: 10px;
    width: 39%;
  }
}
</style>

