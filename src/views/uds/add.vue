<template>
  <div class="create-publish">
    <div class="create-publish-form">
      <h3>新建发布单</h3>
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
        <div v-for="n in modules" :key="n">
          <add-module
            :index="size"
            :module-code-type="'sh'"
            :module-path="''"
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
    <div class="create-publish-tip">
      <h3>提示</h3>
      <ol>
        <li>
          发布单中带
          <div class="create-publish-tip-star">*</div>的为必填项；
        </li>
        <li>
          如有操作上的疑问，
          <a
            href="http://wiki.tuniu.org/pages/viewpage.action?pageId=101177636"
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
            style="color: #72AFD2"
          >数据开发后台上线发布流程。</a>
        </li>
        <li>审核时间：工作日 09:00~18:00；</li>
      </ol>
    </div>
  </div>
</template>
<script>
import AddModule from './components/AddModule'
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
  codeTypes: []
}
export default {
  name: 'UdsCreate',
  components: { AddModule },
  data() {
    return {
      postParams: Object.assign({}, defaultPostParams),
      labelPosition: 'right',
      dataValue: '',
      isCoreData: 0,
      codeType: '',
      codePath: '',
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
    this.dataValue = this.options[0].value
    this.postParams.codeType = this.codeTypeOptions[0].value
  },
  methods: {
    handleParams() {
      this.postParams.codePaths.push(this.postParams.codePath)
      this.postParams.codeTypes.push(this.postParams.codeType)
      const len = this.paths.length
      if (this.paths && len > 0) {
        for (let i = 0; i < len; i++) {
          this.postParams.codePaths.push(this.paths[i])
          this.postParams.codeTypes.push(this.types[i])
        }
      }
      console.log('this.postParams.codePaths ' + this.postParams.codePaths)
      console.log('this.postParams.codeTypes ' + this.postParams.codeTypes)
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
      this.size += 1
      // 初始化
      this.modules.push(this.size)
      this.types.push(this.codeTypeOptions[0].value)
      this.paths.push('')
    },
    delteMoudle(num) {
      this.size -= 1
      const start = this.modules.indexOf(num)
      if (start > -1) {
        this.modules.splice(start, 1)
        this.types.splice(start, 1)
        this.paths.splice(start, 1)
      }
    },
    changePath(num, path) {
      const start = this.modules.indexOf(num)
      if (start > -1) {
        this.paths[start] = path
      }
    },
    changeType(num, type) {
      const start = this.modules.indexOf(num)
      if (start > -1) {
        this.types[start] = type
      }
    }
  }
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
  .create-publish-tip {
    margin-left: 10px;
    width: 39%;
    .create-publish-tip-star {
      color: #ff4949;
      display: inline;
    }
  }
}
</style>

