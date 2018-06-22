<template>
  <div class="table-container">
    <template>
      <el-table
        v-loading="loading"
        ref="userTable"
        :data="userList"
        tooltip-effect="dark"
        style="width: 100%"
        @select-all="handleSelectAll"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="用户id"
          width="150">
          <template slot-scope="scope">{{ scope.row.id }}</template>
          <!-- 1.用prop="id"的方式渲染2.<template slot-scope="scope">{{ scope.row.id }}</template> -->
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户账号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="password"
          label="用户密码"
          show-overflow-tooltip>
        </el-table-column>
          <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <!-- scope.$index行号 -->
            <el-button size="small" type="danger" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
            <el-button size="small" type="primary" @click="handleEdit(scope.row)" plain>编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px;">
        <!-- <el-button @click="toggleSelection([userList[1], userList[2]])">选择二三两行</el-button> -->
        <el-button @click="toggleSelection()" size="large">取消选择</el-button>
        <el-button @click="deleteMultipleSelection" size="large" type="danger">批量删除</el-button>
      </div>
    </template>
    <!-- 使用element的dialog组件替代自己写的编辑框 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="dialogVisible"
      width="450px"
      :before-close="handleClose">
      <p>
        <el-input v-model="editUser" placeholder="请输入内容">
          <template slot="prepend">新的用户账号</template>
        </el-input>
      </p>
      <p>
        <el-input v-model="editPwd" placeholder="请输入内容">
          <template slot="prepend">新的用户密码</template>
        </el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="hanldeDialogClick">提 交</el-button>
      </span>
    </el-dialog>
    <!-- <user-info-edit-box @closeEdit="showEdit = false" v-if="showEdit" @updateUser="fetchUserData" :edituser="editUser" :editpwd="editPwd" :editUserId="editUserId"></user-info-edit-box> -->
  </div>
</template>

<script>
import UserInfoEditBox from './EditUser'
export default {
  name: 'UserTable',
  components: {
    UserInfoEditBox
  },
  data () {
    return {
      loading: false,
      userList: [],
      multipleSelection: [],
      editUser: '',
      editPwd: '',
      editUserId: 0,
      // showEdit: false,
      dialogVisible: false
    }
  },
  methods: {
    fetchUserData () {
      this.loading = true
      this.$axios.get(`${this.base_url}/Oracle/getAllUser`)
        .then(res => {
          this.userList = res.data
          this.loading = false
        })
    },
    handleEdit (row) {
      this.editUser = row.username
      this.editPwd = row.password
      this.editUserId = row.id
      this.dialogVisible = true
    },
    handleDelete (row, rowindex) {
      console.log(row, rowindex)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get(`${this.base_url}/Oracle/deleteUser`, {
          params: {
            id: row.id
          }
        }).then(res => {
          if (res.data === 'ok') {
            this.userList.splice(rowindex, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        // pass
      })
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.userTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.userTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      // console.log(val)
      this.multipleSelection = val
    },
    handleSelectAll () {
      // console.log('ddd')
    },
    deleteMultipleSelection () {
      this.$confirm('是否删除所勾选的所有的用户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        // pass
      })
      console.log(this.multipleSelection)
    },
    hanldeDialogClick () {
      var id = this.editUserId
      var username = this.editUser
      var password = this.editPwd

      this.$axios({
        url: `${this.base_url}/Oracle/changeUserInfo`,
        method: 'POST',
        headers: {'content-type': 'application/json'},
        data: JSON.stringify({ id, username, password })
      }).then(res => {
        if (res.data === 'ok') {
          this.fetchUserData()
          this.$message({
            showClose: true,
            message: '用户信息修改成功',
            type: 'success'
          })
          this.dialogVisible = false
        }
      })    
    }
  },
  created () {
    this.fetchUserData()
  }
}
</script>

<style lang="stylus" scoped>
.table-container >>> .el-dialog__body
  padding 10px 50px
.el-input
  margin-top 20px
.el-table th
  background-color #eee
// .table-container >>> .el-table th
//   background-color #eee
</style>
