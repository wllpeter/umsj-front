<template>
  <div class="uds-detail">
    <div class="uds-detail-content">
      <div class="uds-detail-content-left">
        <el-card>
          <div class="uds-detail-header">
            <div class="uds-detail-header-left">
              <h3>发布单详情</h3>
            </div>
            <div class="uds-detail-header-right">
              <el-button
                v-if="(status === 1 || status === 4) && publishInfo.publishUser === username"
                type="primary"
                style="float: right;"
                @click="updatePublish()"
              >编辑发布单</el-button>
            </div>
          </div>
          <div class="uds-detail-content-left-content">
            <span class="font-title-medium">发布单基本信息</span>
            <div class="form-container-border">
              <el-row>
                <el-col class="form-border form-left-bg font-small" :span="6">发布单ID</el-col>
                <el-col class="form-border font-small" :span="18">{{ 'PO_' + publishInfo.id }}</el-col>
              </el-row>
              <el-row>
                <el-col class="form-border form-left-bg font-small" :span="6">发布单主题</el-col>
                <el-col class="form-border font-small" :span="18">{{ publishInfo.title }}</el-col>
              </el-row>
              <el-row>
                <el-col class="form-border form-left-bg font-small" :span="6">关联JIRA</el-col>
                <el-col class="form-border font-small" :span="18">
                  <a
                    :href="['http://jira.tuniu.org/browse/']+publishInfo.jiraId"
                    target="view_window"
                    style="color: #B22222"
                  >{{ publishInfo.jiraId }}</a>
                </el-col>
              </el-row>
              <el-row>
                <el-col
                  class="form-border form-left-bg font-small"
                  :span="6"
                  style="height:60px;line-height:40px"
                >状态</el-col>
                <el-col class="form-border font-small" :span="18" style="height:60px;line-height:40px">
                  <div class="btn-status">{{ publishInfo.status | formatStatus }}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-border form-left-bg font-small" :span="6">发布者</el-col>
                <el-col class="form-border font-small" :span="18">{{ publishInfo.publishUser }}</el-col>
              </el-row>
              <el-row>
                <el-col class="form-border form-left-bg font-small" :span="6">审核人</el-col>
                <el-col class="form-border font-small" :span="18">{{ publishInfo.applyUser }}</el-col>
              </el-row>
              <el-row>
                <el-col class="form-border form-left-bg font-small" :span="6">影响数据</el-col>
                <el-col
                  class="form-border font-small"
                  :span="18"
                >{{ publishInfo.affectedData | formatNull }}</el-col>
              </el-row>
              <el-row>
                <el-col class="form-border form-left-bg font-small" :span="6">ReviewBoard 地址</el-col>
                <el-col
                  class="form-border font-small"
                  :span="18"
                >{{ publishInfo.reviewBoardUrl | formatNull }}</el-col>
              </el-row>
              <el-row>
                <el-col class="form-border form-left-bg font-small" :span="6">上线步骤说明</el-col>
                <el-col
                  class="form-border font-small"
                  :span="18"
                >{{ publishInfo.publishStep | formatNull }}</el-col>
              </el-row>
              <el-row>
                <el-col class="form-border form-left-bg font-small" :span="6">出错回滚步骤</el-col>
                <el-col
                  class="form-border font-small"
                  :span="18"
                >{{ publishInfo.errRollback | formatNull }}</el-col>
              </el-row>
              <div v-for="item in publishInfo.udsPublishItemList" :key="item.id">
                <PublishItem :child-item="item" :parent-status="publishInfo.status"></PublishItem>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="uds-detail-content-right">
        <el-card>
          <PublishOperate></PublishOperate>
          <TimeLine></TimeLine>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { formatStatus, formatNull } from '@/utils/common'
import TimeLine from './components/TimeLine'
import PublishOperate from './components/PublishOperate'
import PublishItem from './components/PublishItem'
import { publishDetail } from '@/api/uds'
const defaultPulishParams = {
  id: 0,
  title: '测试',
  jiraId: 0,
  status: 0,
  applyUser: 'zhangsan',
  publishUser: 'zhangsan',
  affectedData: '无',
  reviewBoardUrl: 'www.baidu.com',
  publishType: '无',
  errRollback: '无',
  udsPublishItemList: [
    {
      codePath: '',
      codeType: '',
      createdAt: '',
      id: 0,
      publishId: 0,
      state: 0
    }
  ]
}
const defaultListQuery = {
  id: 0
}
export default {
  name: 'UdsDetail',
  filters: {
    formatStatus(satus) {
      return formatStatus(satus)
    },
    formatNull(str) {
      return formatNull(str)
    }
  },
  components: { TimeLine, PublishItem, PublishOperate },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      id: 0,
      status: 0,
      uuid: '',
      publishInfo: Object.assign({}, defaultPulishParams),
      currentPeopleName: null
    }
  },
  computed: {
    ...mapGetters(['username'])
  },
  created() {
    this.id = this.$route.params.id
    this.status = this.$route.params.status
    // console.log('this.id ' + this.id)
    // console.log('this.status ' + this.status)
    // 获取表单信息
    this.getPublishInfo()
  },
  methods: {
    updatePublish() {
      this.$router.push({
        name: 'update',
        params: { id: this.id }
      })
    },
    getPublishInfo() {
      this.listQuery.id = this.id
      publishDetail(this.listQuery).then(response => {
        this.publishInfo = response.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.uds-detail {
  width: 98%;
  .uds-detail-content {
    margin-top: 5px;
    margin-left: 5px;
    width: 100%;
    height: 85%;
    // display: flex;
    .uds-detail-content-left {
      // flex: 2;
      width: 63%;
      .uds-detail-header {
        width: 100%;
        display: flex;
        .uds-detail-header-left {
          flex: 1;
        }
        .uds-detail-header-right {
          flex: 1;
        }
      }
      .uds-detail-content-left-content {
        width: 100%;
      }
    }
    .uds-detail-content-right {
      margin-left: 10px;
      // flex: 1;
      width: 30%;
      position: fixed;
      right: 10px;
      top: 62px;
    }
  }
}
.form-border {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
}
.form-container-border {
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
  margin-top: 15px;
}
.form-left-bg {
  background: #f2f6fc;
}
.btn-status {
  color: #006400;
  width: 200px;
  height: 60px;
  font-weight: bold;
  font-size: 24px;
  text-align: left;
}
</style>
