<template>
  <div class="container">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#EEF1F6"
      text-color="#48576A"
      active-text-color="#409EFF">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <router-link to="/admin/utable">
          <el-menu-item index="1-1">用户列表</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">商品管理</span>
        </template>
        <router-link to="/admin/btable">
          <el-menu-item index="2-1">商品列表</el-menu-item>
        </router-link>
        <router-link to="/admin/upload">
          <el-menu-item index="2-2">商品上传</el-menu-item>
        </router-link>
      </el-submenu>
    </el-menu>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin'
}
</script>

<style lang="stylus" scoped>
.container >>> .el-table__row
  padding-right 100px
.container >>> .el-menu-vertical-demo
  position fixed
  padding-top 80px
  top 0
  left 0
  bottom 0
  width 250px
.container
  margin-top 80px
  .content
    margin-left 250px
    padding 20px
</style>
