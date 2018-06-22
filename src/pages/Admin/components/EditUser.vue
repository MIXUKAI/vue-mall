<template>
<div class="edit">
  <p>
    <span>新的用户账号:</span><el-input v-model="edituser" placeholder="请输入内容"></el-input>
  </p>
  <p>
    <span>新的用户密码:</span><el-input v-model="editpwd" placeholder="请输入内容"></el-input>
  </p>
  <el-button type="primary" @click="handleClick">修改</el-button>
  <el-button @click="handleClose">关闭</el-button>
</div>
</template>

<script>
export default {
  name: 'UserInfoEditBox',
  props: {
    edituser: String,
    editpwd: String,
    editUserId: Number
  },
  methods: {
    handleClose () {
      this.$emit('closeEdit')
    },
    handleClick () {
      var id = this.editUserId
      var username = this.edituser
      var password = this.editpwd
      this.$axios({
        url: `${this.base_url}/Oracle/changeUserInfo`,
        method: 'POST',
        headers: {'content-type': 'application/json'},
        data: JSON.stringify({ id, username, password })
      }).then(res => {
        console.log(res)
        if (res.data === 'ok') {
          this.$emit('updateUser')
          this.$message({
            showClose: true,
            message: '用户信息修改成功',
            type: 'success'
          })
          this.handleClose()
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.edit >>> .el-input
  margin 10px 0 20px 0
.edit
  // visibility hidden
  z-index 10
  position fixed
  top 50%
  left 50%
  margin-left -150px
  transform translateY(-50%)
  background-color #EEF1F6
  width 300px
  padding 30px
  border-radius 5px
</style>
