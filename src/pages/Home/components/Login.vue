<template>
  <div class="login">
    <div class="x-wrap"><img src="../../../assets/backArror.png" alt="" class="back" v-if="!showLogin" @click="showLogin = true"><img src="../../../assets/x.png" alt="" @click="handleX"></div>
    <el-form :model="Login" status-icon :rules="LoginRule" ref="Login" label-width="90px" class="demo-ruleForm"  v-show="showLogin">
      <el-form-item label="用户名" prop="user">
        <el-input type="text" v-model="Login.user" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="Login.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitLogin">确认登录</el-button>
        <el-button type="text" @click="showLogin = !showLogin">还没有账号? 点击注册</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="Register" status-icon :rules="RegisterRule" ref="Register" label-width="90px" class="demo-ruleForm" v-show="!showLogin">
      <el-form-item label="用户名" prop="user">
        <el-input type="text" v-model="Register.user" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="Register.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="Register.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址" prop="email">
        <el-input type="text" v-model="Register.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    var checkUser = (rule, value, callback) => {
      let reg = /[_a-zA-Z0-9]+/
      if (value === '') {
        callback(new Error('用户名不得为空'))
      } else if (!reg.test(value)) {
        callback(new Error('用户名有数字, 字母和下划线组成'))
      } else if (value.length > 10 || value.length < 4) {
        callback(new Error('长度4到10位'))
      } else {
        var completeUrl = this.base_url + '/Oracle/hasAccount?name=' + value
        this.$axios.get(completeUrl)
          .then(res => {
            if (res.data === 1) {
              this.$message({
                showClose: true,
                message: '用户名存在',
                type: 'error'
              })
            } else {
              callback()
            }
          })
      }
    }
    var loginUser = (rule, value, callback) => {
      let reg = /[_a-zA-Z0-9]+/
      if (value === '') {
        callback(new Error('用户名不得为空'))
      } else if (!reg.test(value)) {
        callback(new Error('用户名有数字, 字母和下划线组成'))
      } else if (value.length > 10 || value.length < 4) {
        callback(new Error('长度4到10位'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 10) {
        callback(new Error('密码长度6到10位'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.Register.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var checkEmail = (rule, value, callback) => {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (value === '') {
        callback(new Error('邮箱不得为空'))
      } else if (!reg.test(value)) {
        callback(new Error('邮箱格式有误'))
      } else {
        callback()
      }
    }
    return {
      Register: {
        user: '',
        pass: '',
        checkPass: '',
        email: ''
      },
      RegisterRule: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        user: [
          { validator: checkUser, trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ]
      },
      Login: {
        pass: '',
        user: ''
      },
      LoginRule: {
        pass: [
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        user: [
          {validator: loginUser, trigger: 'blur'}
        ]
      },
      showLogin: true
    }
  },
  methods: {
    submitLogin () {
      this.$refs.Login.validate((valid) => {
        if (valid) {
          var completeUrl = this.base_url + '/Oracle/login'
          var username = this.Login.user
          var password = this.Login.pass
          this.$axios({
            url: completeUrl,
            method: 'POST',
            headers: {'content-type': 'application/json'},
            data: JSON.stringify({ username, password })
          }).then(res => {
            var data = res.data
            if (data === 1) {
              this.$message({
                showClose: true,
                message: '登录成功',
                type: 'success'
              })
              this.$emit('loginsucc', username)
              this.handleX()
            } else if (data === -1) {
              this.$message({
                showClose: true,
                message: '密码错误',
                type: 'error'
              })
            } else {
              this.$message({
                showClose: true,
                message: '用户不存在',
                type: 'error'
              })
            }
            // TODO: switch case
          })
        } else {
          alert('error submit!!')
          return false
        }
      })
    },
    submitRegister () {
      this.$refs.Register.validate(valid => {
        if (valid) {
          var completeUrl = this.base_url + '/Oracle/register'
          var username = this.Register.user
          var password = this.Register.pass
          this.$axios({
            url: completeUrl,
            method: 'POST',
            headers: {'content-type': 'application/json'},
            data: JSON.stringify({ username, password })
          }).then(res => {
            if (res.data === 'ok') {
              this.$message({
                message: '恭喜你，注册成功',
                type: 'success'
              })
              setTimeout(() => {
                this.showLogin = true
              }, 1000)
            }
          })
        } else {
          return false
        }
      })
    },
    handleX () {
      this.$refs.Login.resetFields()
      this.showLogin = true
      this.$emit('hideLogin')
    }
  }
}
</script>

<style lang="stylus" scoped>
.login >>> .el-form-item__content
  text-align center
.login >>> .el-button
    width 180px
.login >>> .el-form
  margin-right 80px
.login >>> .el-form-item__label
  width 60px
.login
  position fixed
  z-index 10
  // padding-top 50px
  top 50%
  left 50%
  transform translateY(-50%)
  margin-left -200px
  width 420px
  box-shadow 0 3px 10px rgba(0,0,0,.3)
  background-color #eee
  border-radius 5px
  .x-wrap
    padding 20px
    overflow hidden
    font-size 16px
    vertical-align middle
    .back
      float left
    img
      width 30px
      height 30px
      float right
      cursor pointer
</style>
