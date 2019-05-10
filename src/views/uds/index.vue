<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
        <el-button style="float:right" type="primary" size="small" @click="handleSearchList()">查询搜索</el-button>
        <el-button
          style="float:right;margin-right: 15px"
          size="small"
          @click="handleResetSearch()"
        >重置</el-button>
      </div>
      <div style="margin-top: 20px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="主题：">
            <el-input v-model="listQuery.title" class="input-width" placeholder="主题" />
          </el-form-item>
          <el-form-item label="JIRA 单号：">
            <el-input v-model="listQuery.jiraId" class="input-width" placeholder="JIRA 单号" />
          </el-form-item>
          <el-form-item label="发布者：">
            <el-input v-model="listQuery.publishUser" class="input-width" placeholder="发布者" />
          </el-form-item>
          <el-form-item label="审核者：">
            <el-input v-model="listQuery.applyUser" class="input-width" placeholder="审核者" />
          </el-form-item>
          <el-form-item>
            <el-select v-model="value" placeholder="全部状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>发布单列表</span>
      <el-button size="mini" class="btn-add-publish" type="primary" @click="addPublish()">新建发布单</el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="udsTable"
        v-loading="listLoading"
        :data="list"
        style="width: 100%;"
        border
        @selection-change="handleSelectionChange"
        @sort-change="orderSort"
      >
        <el-table-column label="ID" width="140" align="center">
          <template slot-scope="scope">{{ 'PO_' + scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="发布主题(发布项数量)" align="center">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column label="JIRA 单号" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.jiraId }}</template>
        </el-table-column>
        <el-table-column label="发布者" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.publishUser }}</template>
        </el-table-column>
        <el-table-column label="审核者" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.applyUser }}</template>
        </el-table-column>
        <el-table-column label="状态" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.status }}</template>
        </el-table-column>
        <el-table-column
          label="创建日期"
          width="249"
          sortable="custom"
          prop="created_at"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.createdAt }}</template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="lookUdsInfo(scope.$index, scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :total="total"
        :page-sizes="[15,20,30]"
        :current-page.sync="listQuery.pageNum"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>
<script>
import { fetchList } from '@/api/uds'
const defaultListQuery = {
  pageNum: 1,
  pageSize: 15,
  sortBy: 'id',
  order: 'desc',
  applyUser: '',
  jiraId: '',
  publishUser: '',
  status: 0,
  title: ''
}
export default {
  name: 'UdsMangement',
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: 0,
      value: null,
      options: [
        {
          value: '全部状态',
          lable: 0
        },
        {
          value: '新建',
          lable: 1
        },
        {
          value: '待审核',
          lable: 2
        },
        {
          value: '审核通过',
          lable: 3
        },
        {
          value: '审核不通过',
          lable: 4
        },
        {
          value: '发布成功',
          lable: 5
        },
        {
          value: '发布失败',
          lable: 6
        },
        {
          value: '取消发布',
          lable: 7
        },
        {
          value: '发布中',
          lable: 8
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    orderSort(column) {
      this.listQuery.pageNum = 1
      if (column.order === 'descending') {
        this.listQuery.sortBy = column.prop
        this.listQuery.order = 'desc'
      } else {
        this.listQuery.sortBy = column.prop
        this.listQuery.order = 'asc'
      }
      this.getList()
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    handleSearchList() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    lookUdsInfo(index, row) {
      console.log('lookUdsInfo')
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.udsPublishList
        this.total = response.data.total
      })
    },
    addPublish() {
      console.log('addPublish')
    }
  }
}
</script>
<style scoped>
.btn-add-publish {
  float: right;
}
</style>
