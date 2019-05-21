<template>
  <div class="uds-item-content-left-content">
    <span class="font-title-medium">发布项信息:</span>
    <div class="form-container-border">
      <el-row>
        <el-col
          class="form-border form-left-bg font-small"
          :span="6"
          style="height:60px;line-height:40px"
        >发布状态</el-col>
        <el-col class="form-border font-small" :span="18" style="height:60px">
          <el-button :type="typeFlag">{{ item.state | formatItemStatus }}</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col class="form-border form-left-bg font-small" :span="6">发布项ID</el-col>
        <el-col class="form-border font-small" :span="18">{{ item.publishId }}</el-col>
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
      'default': null
    }
  },
  data() {
    return {
      item: Object.assign({}, defaultItem),
      typeFlag: 'primary'
    }
  },
  created() {
    this.item = this.childItem
    if (this.item.state === 1) {
        this.typeFlag = 'success'
    }
    if (this.item.state === 3) {
        this.typeFlag = 'danger'
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.uds-item-content-left-content {
    margin-top: 9px;
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
  background: #F5F5F5;
}
</style>
