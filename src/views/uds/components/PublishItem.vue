<template>
  <div class="uds-item-content-left-content">
    <div>
      <span class="font-title-medium">发布项信息:</span>
      <el-button v-if="item.state === 1 && pStatus === 3" type="primary" style="margin-left: 20px;">发布</el-button>
    </div>
    <div class="form-container-border">
      <el-row>
        <el-col
          class="form-border form-left-bg font-small"
          :span="6"
          style="height:60px;line-height:40px"
        >发布状态</el-col>
        <el-col class="form-border font-small" :span="18" style="height:60px;line-height:40px">
          <div class="btn-status" :style="fontColor">{{ item.state | formatItemStatus }}</div>
        </el-col>
      </el-row>

      <el-row>
        <el-col class="form-border form-left-bg font-small" :span="6">发布项ID</el-col>
        <el-col class="form-border font-small" :span="18">{{ 'ITM_' + item.id }}</el-col>
      </el-row>
      <el-row>
        <el-col class="form-border form-left-bg font-small" :span="6">代码类型</el-col>
        <el-col class="form-border font-small" :span="18">{{ item.codeType | formatNull }}</el-col>
      </el-row>
      <el-row>
        <el-col class="form-border form-left-bg font-small" :span="6">代码分支路径</el-col>
        <el-col class="form-border font-small" :span="18">{{ item.codePath | formatNull }}</el-col>
      </el-row>
      <el-row>
        <el-col class="form-border form-left-bg font-small" :span="6">服务器返回时间</el-col>
        <el-col class="form-border font-small" :span="18">{{ item.updatedAt | formatNull }}</el-col>
      </el-row>
      <!-- <el-row>
        <el-col class="form-border form-left-bg font-small" :span="6">返回结果</el-col>
        <el-col class="form-border font-small" :span="18">{{ publishInfo.applyUser }}</el-col>
      </el-row>-->
    </div>
  </div>
</template>
<script>
import { formatNull, formatItemStatus } from '@/utils/common'
const defaultItem = {
  codePath: 'string',
  codeType: 'string',
  createdAt: 'string',
  id: 0,
  publishId: 0,
  state: 0,
  updatedAt: 'string'
}
export default {
  name: 'PublishItem',
  filters: {
    formatNull(str) {
      return formatNull(str)
    },
    formatItemStatus(itemStatus) {
      return formatItemStatus(itemStatus)
    }
  },
  props: {
    childItem: {
      type: Object,
      default: null
    },
    parentStatus: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      item: Object.assign({}, defaultItem),
      pStatus: null,
      fontColor: 'color: #7FFFD4;'
    }
  },
  created() {
    this.item = this.childItem
    this.pStatus = this.parentStatus
    // 颜色区分
    if (this.item.state === 2) {
        this.fontColor = 'color: #006400;'
    }
    if (this.item.state === 3) {
        this.fontColor = 'color: #FF0000;'
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.uds-item-content-left-content {
  margin-top: 15px;
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
  background: #f5f5f5;
}
.btn-status {
  width: 200px;
  height: 30px;
  font-weight: bold;
  font-size: 16px;
  text-align: left;
}
</style>
