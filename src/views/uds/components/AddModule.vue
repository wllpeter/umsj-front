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
        type: Number,
        default: 0
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
      num: 0,
      selectCodeType: '',
      selectPath: '',
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
      this.selectCodeType = this.moduleCodeType
      this.selectPath = this.modulePath
      this.num = this.index
      console.log('child init')
      console.log('child num ' + this.num)
      console.log('child index ' + this.index)
  },
  methods: {
      delteMoudle() {
          this.$confirm('确定移除该发布项吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('child 删除 ')
          console.log('child num ' + this.num)
          console.log('child index ' + this.index)
          this.$emit('delteMoudle', this.num)
        })
      },
      changePath() {
          this.$emit('changePath', this.num, this.selectPath)
      },
      changeType() {
          this.$emit('changeType', this.num, this.selectCodeType)
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

