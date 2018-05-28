<template>
  <div class="header">
    <div class="header-logo"></div>
    <div class="header-tools">
      <div class="user-wrapper">
        <img class="user-icon" src="../assets/user-icon.png" alt="this is user-icon">
        <span class="user-name">mixukai</span>
        <a class="user-logout" href="javascript:;">注销</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="stylus" scoped>
@import "../style/styls/variables"
// 为什么不能以 "@/style/styls/variables"的方式引入
.header
  position fixed
  left 0
  top 0
  width 100%
  height $header_height
  background-color $header_bgcolor
  .header-tools
    float right
    margin-right 30px
    .user-wrapper
      height $header_height
      line-height $header_height
      .user-icon
        width 60px
        height 60px
        border-radius 50%
        vertical-align middle
      .user-name
        margin-left $user_ml
        color #fff
      .user-logout
        margin-left $user_ml
        padding 5px 15px
        color #000
        background-color #fff
</style>
