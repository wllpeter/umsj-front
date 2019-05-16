<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>角色列表</span>
      <el-button
        :disabled="havaPermission"
        size="mini"
        class="btn-add-role"
        type="primary"
        @click="addRole()"
      >添加角色</el-button>
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
        <el-table-column label="ID" sortable="custom" prop="id" width="70" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="角色编码" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.code }}</template>
        </el-table-column>
        <el-table-column label="角色名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="菜单" width="250" align="center">
          <template slot-scope="scope">
            <MenuPermission :self-menus="scope.row.menus"></MenuPermission>
          </template>
        </el-table-column>
        <el-table-column label="功能权限" width="250" align="center">
          <template slot-scope="scope">
            <ActionsPermission :self-actions="scope.row.actions"></ActionsPermission>
          </template>
        </el-table-column>
        <el-table-column
          label="创建日期"
          width="240"
          sortable="custom"
          prop="created_at"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.createdAt }}</template>
        </el-table-column>
        <el-table-column
          label="更新日期"
          width="240"
          sortable="custom"
          prop="updated_at"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.updatedAt }}</template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button
              :disabled="havaPermission"
              size="mini"
              type="primary"
              @click="changeRole(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              :disabled="havaPermission"
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
import MenuPermission from './components/MenuPermission'
import ActionsPermission from './components/ActionsPermission'
import { getRoleList, deleteRole } from '@/api/role'
import { judgeAction } from '@/utils/permission'
import { formatDate } from '@/utils/date'
const defaultListQuery = {
  pageNum: 1,
  pageSize: 15,
  sortBy: 'id',
  order: 'desc'
}
const defaultRoleInfo = {
  id: 0,
  actions: [],
  code: '',
  name: '',
  menus: [],
  subMenus: []
}
export default {
  name: 'RolePermission',
  filters: {
    formatCreateTime(time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  components: { MenuPermission, ActionsPermission },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      havaPermission: true,
      defaultPermission: ['SYS_ADMIN', 'privilege_all'],
      roleInfo: Object.assign({}, defaultRoleInfo)
    }
  },
  created() {
    this.getList()
    this.havaPermission = judgeAction(this.defaultPermission)
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
      this.$router.push({
        name: 'UpdateRole',
        params: {
          id: row.id,
          actions: row.actions,
          code: row.code,
          name: row.name,
          menus: row.menus
        }
      })
    },
    deleteRole(index, row) {
      this.roleInfo.id = row.id
      this.$confirm('是否要删除该角色', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(this.roleInfo).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          })
          this.getList()
        })
      })
    },
    addRole() {
      this.$router.push({ path: '/permission/addRole' })
    }
  }
}
</script>
<style scoped>
.input-width {
  width: 203px;
}
.btn-add-role {
  float: right;
}
</style>
