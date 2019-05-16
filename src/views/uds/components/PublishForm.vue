<template>
  <div class="publish-form">
    <el-card class="box-card">
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
            <el-form-item label="发布项">
              <el-button type="primary" class="select-type-button" @click="addModule()">添加发布项</el-button>
            </el-form-item>
          </div>
          <div v-for="(item, index) in postParams.udsPublishItemList" :key="item.uuid">
            <add-module
              :index="index"
              :module-code-type="item.codeType"
              :module-path="item.codePath"
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
          <el-button
            class="create-publish-form-button-button"
            type="primary"
            @click="savePulish()"
          >保存发布单</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import AddModule from './AddModule'
import { getUuid } from '@/utils/common'
import { createPublish, publishDetail, updatePublish } from '@/api/uds'
const defaultPostParams = {
  applyUser: '',
  jiraId: '',
  codeType: null,
  codePath: null,
  title: '',
  affectedData: '',
  reviewBoardUrl: '',
  publishStep: '',
  errRollback: '',
  udsPublishItemList: []
}
const defaultListQuery = {
  id: 0
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
      listQuery: Object.assign({}, defaultListQuery),
      postParams: Object.assign({}, defaultPostParams),
      labelPosition: 'right',
      isCoreData: 0,
      moduleInfo: [],
      // size: 0,
      modules: [],
      types: [],
      paths: [],
      id: 0,
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
    if (!this.isEdit) {
      this.postParams.codeType = this.codeTypeOptions[0].value
    }
    // 更新的时候
    if (this.isEdit) {
      this.id = this.$route.params.id
      console.log(this.$route.params.id)
      this.initModuleInfo(this.id)
    }
  },
  methods: {
    initModuleInfo(id) {
      this.listQuery.id = this.id
      publishDetail(this.listQuery).then(response => {
        this.postParams = response.data
        if (
          this.postParams.udsPublishItemList &&
          this.postParams.udsPublishItemList.length > 0
        ) {
          const len = this.postParams.udsPublishItemList.length
          for (let i = 0; i < len; i++) {
            this.postParams.udsPublishItemList[i]['uuid'] = getUuid()
          }
        }
      })
    },
    savePulish() {
      const len = this.postParams.udsPublishItemList.length
      // 单独处理 发布项 代码分支路径
      if (len > 0) {
        for (let i = 0; i < len; i++) {
          const pathValue = this.postParams.udsPublishItemList[i].codePath
          if (pathValue === null || pathValue === undefined || pathValue.trim().length === 0) {
            this.$message({
              message: '代码分支路径 不能为空 ！！！',
              type: 'error',
              duration: 3000
            })
            return false
          }
        }
      }
      this.$refs.postParams.validate(valid => {
        if (valid) {
          this.$confirm('是否要保存该发布单', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.isEdit) {
              updatePublish(this.postParams).then(response => {
                this.$message({
                  type: 'success',
                  message: '更新成功',
                  duration: 1000
                })
                this.$router.push({ path: '/uds/index' })
              })
            } else {
              createPublish(this.postParams).then(response => {
                this.$message({
                  type: 'success',
                  message: '创建成功',
                  duration: 1000
                })
                this.$router.push({ path: '/uds/index' })
              })
            }
          })
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000
          })
          return false
        }
      })
    },
    addModule() {
      const defaultModuleInfo = {
        id: null,
        codeType: 'sh',
        codePath: '',
        uuid: getUuid()
      }
      this.postParams.udsPublishItemList.push(defaultModuleInfo)
      // console.log('now module')
      // this.postParams.udsPublishItemList.forEach(item => { console.log(item.codeType + '  ' + item.codePath + '  ' + item.id + '  ' + item.uuid) })
    },
    delteMoudle(num) {
      this.postParams.udsPublishItemList.splice(num, 1)
      // console.log('delete after module')
      // this.postParams.udsPublishItemList.forEach(item => { console.log(item.codeType + '  ' + item.codePath + '  ' + item.id + '  ' + item.uuid) })
    },
    changePath(num, path) {
      this.postParams.udsPublishItemList[num].codePath = path
      // console.log('changePath after module')
      // this.postParams.udsPublishItemList.forEach(item => { console.log(item.codeType + '  ' + item.codePath + '  ' + item.id + '  ' + item.uuid) })
    },
    changeType(num, type) {
      this.postParams.udsPublishItemList[num].codeType = type
      // console.log('changeType after module')
      // this.postParams.udsPublishItemList.forEach(item => { console.log(item.codeType + '  ' + item.codePath + '  ' + item.id + '  ' + item.uuid) })
    }
  }
}
</script>
<style lang="scss" scoped>
.publish-form {
  width: 100%;
  .create-publish-form {
    margin-left: 10px;
    .select-type {
      // background-color: #f5f5f5;
      // border: 1px solid #e3e3e3;
      .select-type-button {
        float: right;
      }
    }
    .create-publish-form-button {
      width: 100%;
      margin-left: 25%;
      .create-publish-form-button-button {
        margin-left: 20%;
      }
    }
  }
}
</style>

