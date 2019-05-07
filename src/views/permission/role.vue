<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>角色列表</span>
    </el-card>
    <div class="table-container">
      <el-table
        ref="orderTable"
        v-loading="listLoading"
        :data="list"
        style="width: 100%;"
        border
        @selection-change="handleSelectionChange"
        @sort-change="orderSort"
      >
        <el-table-column label="ID" sortable="custom" prop="id" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="角色编码" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.code }}</template>
        </el-table-column>
        <el-table-column label="角色名称" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="菜单" width="220" align="center">
          <template slot-scope="scope"><MenuTree :self-menus="scope.row.menus" /></template>
        </el-table-column>
        <el-table-column label="功能权限" width="198" align="center">
          <template slot-scope="scope">
            {{ scope.row.actions }}
          </template>
        </el-table-column>
        <el-table-column
          label="创建日期"
          width="240"
          sortable="custom"
          prop="created_at"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.createdAt | formatCreateTime }}</template>
        </el-table-column>
        <el-table-column
          label="更新日期"
          width="240"
          sortable="custom"
          prop="updated_at"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.updatedAt | formatCreateTime }}</template>
        </el-table-column>
        <el-table-column label="操作" width="400" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="changeRole(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="deleteRole(scope.$index, scope.row)"
            >删除</el-button>
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
import { getRoleList } from '@/api/role'
import { formatDate } from '@/utils/date'
import { MenuTree } from './components/MenuTree'
const defaultListQuery = {
  pageNum: 1,
  pageSize: 15,
  sortBy: 'id',
  order: 'desc'
}
export default {
  name: 'RolePermission',
  components: { MenuTree },
  filters: {
    formatCreateTime(time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      menus: []
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
    getList() {
      this.listLoading = true
      getRoleList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.roleList
        this.total = response.data.total
      })
    },
    changeRole(index, row) {
      console.log('编辑角色')
    },
    deleteRole(index, row) {
      console.log('删除角色')
    }
  }
}
</script>
<style scoped>
.input-width {
  width: 203px;
}
</style>
