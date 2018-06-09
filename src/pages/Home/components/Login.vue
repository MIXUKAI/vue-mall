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
        <el-button type="primary" @click="submitForm('Login')">确认登录</el-button>
        <el-button type="text" @click="showLogin = !showLogin">还没有账号? 点击注册</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="90px" class="demo-ruleForm" v-show="!showLogin">
      <el-form-item label="用户名" prop="user">
        <el-input type="text" v-model="ruleForm1.user" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm1.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm1.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址" prop="email">
        <el-input type="text" v-model="ruleForm1.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    var checkUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不得为空'))
      } else {
        setTimeout(() => {
          callback()
        }, 3000);
        // 一定要调用callback才会有绿色的钩
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        // if (this.ruleForm2.checkPass === '4') {
        //   this.$refs.ruleForm2.validateField('checkPass')
        // }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var checkEmail = (rule, value, callback) => {
      if (value === '') {
        console.log('dddd')
        callback(new Error('邮箱不得为空'))
      } else {
        callback()
      }
    }
    return {
      ruleForm1: {
        user: '',
        pass: '',
        checkPass: '',
        email: ''
      },
      rules1: {
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
          { message: '邮箱地址不得为空', validator: checkEmail, trigger: 'blur' }
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
          { validator: checkUser, trigger: 'blur'}
        ]
      },
      showLogin: true
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
