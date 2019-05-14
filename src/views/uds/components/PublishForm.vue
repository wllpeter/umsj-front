<template>
  <div class="create-publish-form">
    <h3 v-if="isEdit">编辑发布单</h3>
    <h3 v-else>新建发布单</h3>
    <el-form
      ref="postParams"
      :model="postParams"
      :rules="rules"
      label-width="220px"
      :label-position="labelPosition"
      style="width: 800px"
      size="medium"
    >
      <el-form-item label="上线原因" prop="title">
        <el-input v-model="postParams.title" placeholder="本次的发布主题" />
      </el-form-item>
      <el-form-item label="JIRA单号" prop="jiraId">
        <el-input v-model="postParams.jiraId" />
      </el-form-item>
      <el-form-item label="是否涉及核心数据">
        <el-select v-model="isCoreData">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <div class="select-type">
        <el-form-item label="代码类型" prop="codeType">
          <el-select v-model="postParams.codeType">
            <el-option
              v-for="item in codeTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            class="select-type-button"
            circle
            @click="addModule()"
          />
        </el-form-item>
        <el-form-item label="代码分支路径" prop="codePath">
          <el-input v-model="postParams.codePath" type="textarea" />
        </el-form-item>
      </div>
      <div v-for="(item, index) in moduleInfo" :key="item.id">
        <add-module
          :index="index"
          :module-code-type="item.childType"
          :module-path="item.childPath"
          @delteMoudle="delteMoudle"
          @changePath="changePath"
          @changeType="changeType"
        />
      </div>
      <el-form-item label="影响数据">
        <el-input v-model="postParams.affectedData" />
      </el-form-item>
      <el-form-item label="ReviewBoard 地址" prop="reviewBoardUrl">
        <el-input v-model="postParams.reviewBoardUrl" />
      </el-form-item>
      <el-form-item label="上线步骤说明">
        <el-input v-model="postParams.publishStep" type="textarea" />
      </el-form-item>
      <el-form-item label="出错回滚步骤">
        <el-input v-model="postParams.errRollback" type="textarea" />
      </el-form-item>
    </el-form>
    <div class="create-publish-form-button">
      <el-button type="primary" @click="savePulish()">保存发布单</el-button>
    </div>
  </div>
</template>
<script>
import AddModule from './AddModule'
import { createPublish } from '@/api/uds'
const defaultPostParams = {
  applyUser: '',
  jiraId: '',
  codeType: 0,
  codePath: '',
  title: '',
  affectedData: '',
  reviewBoardUrl: '',
  publishStep: '',
  errRollback: '',
  codePaths: [],
  codeTypes: [],
  udsPublishItemList: []
}
export default {
  name: 'PublishForm',
  components: { AddModule },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postParams: Object.assign({}, defaultPostParams),
      labelPosition: 'right',
      isCoreData: 0,
      codeType: '',
      codePath: '',
      moduleInfo: [],
      size: 0,
      modules: [],
      types: [],
      paths: [],
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
      codeTypeOptions: [
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
      ],
      rules: {
        title: [
          { required: true, message: '请填写 上线原因', trigger: 'blur' }
        ],
        jiraId: [
          { required: true, message: '请填写 jira链接', trigger: 'blur' }
        ],
        codeType: [
          { required: true, message: '请选择 代码类型', trigger: 'blur' }
        ],
        codePath: [
          { required: true, message: '请填写 代码分支路径', trigger: 'blur' }
        ],
        reviewBoardUrl: [
          {
            required: true,
            message: '请填写 ReviewBoard 地址',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.postParams.codeType = this.codeTypeOptions[0].value
    // 更新的时候
    // if (this.isEdit) {

    // }
  },
  methods: {
    handleParams() {
      const itemList = {
        codePath: '',
        codeType: ''
      }
      itemList.codePath = this.postParams.codePath
      itemList.codeType = this.postParams.codeType
      this.postParams.udsPublishItemList.push(itemList)
      for (let i = 0; i < this.moduleInfo.length; i++) {
        itemList.codePath = this.moduleInfo[i].childPath
        itemList.codeType = this.moduleInfo[i].childType
        this.postParams.udsPublishItemList.push(itemList)
      }
    },
    savePulish() {
      this.handleParams()
      this.$confirm('是否要保存该发布单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        createPublish(this.postParams).then(response => {
          this.$message({
            message: '保存成功',
            type: 'success',
            duration: 1000
          })
          this.$router.push({ path: '/uds/index' })
        })
      })
    },
    addModule() {
      const defaultModuleInfo = {
        childType: 'sh',
        id: this.size,
        childPath: ''
      }
      defaultModuleInfo.childType = 'sh'
      defaultModuleInfo.childPath = ''
      this.moduleInfo.push(defaultModuleInfo)
      this.size = this.size + 1
      // console.log('this.moduleInfo ' + this.moduleInfo.length)
      this.moduleInfo.forEach(item => { console.log(item.childType + '  ' + item.childPath) })
    },
    delteMoudle(num) {
      // console.log('删除：')
      // console.log(num)
      // this.size = this.size - 1
      this.moduleInfo.splice(num, 1)
      this.moduleInfo.forEach(item => { console.log(item.childType + '  ' + item.childPath) })
      // console.log('this.moduleInfo ' + this.moduleInfo.length)
    },
    changePath(num, path) {
      // console.log('num ' + num)
      this.moduleInfo[num].childPath = path
      this.moduleInfo.forEach(item => { console.log(item.childType + '  ' + item.childPath) })
      // console.log('len ' + this.moduleInfo.length)
    },
    changeType(num, type) {
      // console.log('num ' + num)
      this.moduleInfo[num].childType = type
      this.moduleInfo.forEach(item => { console.log(item.childType + '  ' + item.childPath) })
      // console.log('len ' + this.moduleInfo.length)
    }
  }
}
</script>
<style lang="scss" scoped>
.create-publish-form {
  margin-left: 10px;
  width: 56%;
  .select-type {
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    .select-type-button {
      float: right;
    }
  }
  .create-publish-form-button {
    width: 100%;
    margin-left: 25%;
  }
}
</style>

