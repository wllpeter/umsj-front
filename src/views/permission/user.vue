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
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="用户名：">
            <el-input v-model="listQuery.username" class="input-width" placeholder="用户名" />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>数据列表</span>
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
        <el-table-column label="用户名" width="180" sortable="custom" prop="username" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="姓名" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.fullName }}</template>
        </el-table-column>
        <el-table-column label="部门" width="300" align="center">
          <template slot-scope="scope">{{ scope.row.department }}</template>
        </el-table-column>
        <el-table-column label="角色" align="center">
          <template slot-scope="scope">
            <RoleButton :role-list="scope.row.roleItems" />
          </template>
        </el-table-column>
        <el-table-column
          label="创建日期"
          width="249"
          sortable="custom"
          prop="created_at"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.createdAt | formatCreateTime }}</template>
        </el-table-column>
        <el-table-column
          label="更新日期"
          width="249"
          sortable="custom"
          prop="updated_at"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.updatedAt | formatCreateTime }}</template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button
              :disabled="havaPermission"
              size="mini"
              type="primary"
              @click="changeUserRole(scope.$index, scope.row)"
            >编辑</el-button>
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
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <el-checkbox-group v-model="selfRole">
        <ul v-for="role in checkedRoles" :key="role.name">
          <li>
            <el-checkbox :label="role.code">{{ role.name }}</el-checkbox>
          </li>
        </ul>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList, getRoleList, updateUser } from '@/api/user'
import { formatDate } from '@/utils/date'
import { judgeAction } from '@/utils/permission'
import RoleButton from './components/RoleButton'
const defaultListQuery = {
  pageNum: 1,
  pageSize: 15,
  username: '',
  sortBy: 'id',
  order: 'desc'
}
const defaultUserInfo = {
  id: 0,
  username: ''
}
export default {
  name: 'UserManagement',
  filters: {
    formatCreateTime(time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  components: { RoleButton },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      dialogVisible: false,
      checkedRoles: [],
      userInfo: Object.assign({}, defaultUserInfo),
      title: '',
      selfRole: [],
      havaPermission: true,
      defaultPermission: ['SYS_ADMIN', 'privilege_all'],
      haveActions: [],
      userRole: {
        id: 0,
        roleCodes: []
      }
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
      fetchList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.userList
        this.total = response.data.total
      })
    },
    changeUserRole(index, row) {
      getRoleList().then(response => {
        this.userInfo = Object.assign({}, row)
        this.checkedRoles = response.data
        this.dialogVisible = true
        this.title = '编辑用户' + row.username + '的角色'
        const tmpRoles = []
        row.roleItems.forEach(function(e) {
          tmpRoles.push(e.code)
        })
        this.selfRole = tmpRoles
      })
    },
    updateUser() {
      this.userRole.roleCodes = Object.assign([], this.selfRole)
      this.userRole.id = this.userInfo.id
      updateUser(this.userRole).then(response => {
        this.$message({
          type: 'success',
          message: '更新成功',
          duration: 1000
        })
        this.getList()
      })
      this.dialogVisible = false
      console.log(this.selfRole)
    }
  }
}
</script>
<style scoped>
.input-width {
  width: 203px;
}
li {
  list-style: none;
}
</style>
