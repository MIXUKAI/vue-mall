<template>
  <div class="header">
    <div class="header-logo">
      <router-link to="/">
        <img src="../assets/mf.png" alt="">
      </router-link>
    </div>
    <div class="header-tools">
      <el-button plain size="middle" @click="handleLogin" v-if="!showUserWrap">登录</el-button>
      <!--TODO: 使用VUEX实现兄弟组件之的通信 -->
      <div class="user-wrapper" v-if="showUserWrap">
        <img class="user-icon" src="../assets/user-icon.png" alt="this is user-icon">
        <span class="user-name">{{ username }}</span>
        <router-link  to="cart" class="cart-img"><img src="../assets/cart.png" alt=""></router-link>
        <el-button plain size="middle" @click="logout">注销</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    username: String
  },
  methods: {
    handleLogin () {
      this.$emit('alertLogin')
    },
    logout () {
      this.$emit('logout')
    }
  },
  computed: {
    showUserWrap () {
      return !!this.username
    }
  }
}
</script>

<style lang="stylus" scoped>
.header-tools >>> .el-button
  float left
  margin 20px 25px
@import "../style/styls/variables"
// 为什么不能以 "@/style/styls/variables"的方式引入
.header
  z-index 10
  position fixed
  left 0
  top 0
  width 100%
  height $header_height
  background-color $header_bgcolor
  .header-logo
    height $header_height
    float left
    margin-left 50px
    img
      height 100%
      cursor pointer
  .header-tools
    float right
    margin-right 30px
    .user-wrapper
      float left
      height $header_height
      line-height $header_height
      .user-icon
        float left
        margin-top 10px
        width 60px
        height 60px
        border-radius 50%
        vertical-align middle
      .user-name
        float left
        margin-left $user_ml
        color #fff
      .cart-img
        float left
        margin-left 15px
        width 50px
        height 50px
        line-height $header_height
        img
          vertical-align middle
          height 100%
          cursor pointer
</style>
