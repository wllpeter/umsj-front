<template>
  <div class="select-type">
    <el-form-item label="代码类型" prop="codeType">
      <el-select v-model="selectCodeType" @change="changeType">
        <el-option
          v-for="item in codeTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        type="danger"
        icon="el-icon-delete"
        size="mini"
        class="select-type-button"
        circle
        @click="delteMoudle"
      />
    </el-form-item>
    <el-form-item label="代码分支路径" prop="path">
      <el-input v-model="selectPath" type="textarea" @change="changePath" />
    </el-form-item>
  </div>
</template>
<script>
export default {
  name: 'AddModule',
  props: {
    index: {
        type: Number,
        default: 0
    },
    moduleCodeType: {
        type: String,
        default: ''
    },
    modulePath: {
        type: String,
        default: ''
    }
  },
  data() {
    return {
      codeValue: 0,
      path: '',
      selectCodeType: '',
      selectPath: '',
      codeTypes: [
        {
          value: 'sh',
          label: 'sh 文件'
        },
        {
          value: 'ct',
          label: 'ctsh 文件(创建表)'
        },
        {
          value: 'jar',
          label: 'jar 文件'
        }
      ]
    }
  },
  created() {
      this.selectCodeType = this.moduleCodeType
      this.selectPath = this.modulePath
  },
  methods: {
      delteMoudle() {
        //  console.log('delete module ' + this.index)
          this.$confirm('确定移除该发布项吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('delteMoudle', this.index)
        })
      },
      changePath() {
          this.$emit('changePath', this.index, this.selectPath)
      },
      changeType() {
          this.$emit('changeType', this.index, this.selectCodeType)
      }
  }
}
</script>
<style lang="scss" scoped>
.select-type {
  margin-top: 10px;
  background-color: #f5f5f5;
  border: 1px solid #e3e3e3;
  .select-type-button {
    float: right;
  }
}
</style>

