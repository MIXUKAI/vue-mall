<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="12"
      layout="prev, pager, next, jumper"
      :total="5900">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  methods: {
    // handleSizeChange (val) {
    //   console.log(`每页 ${val} 条`)
    // },
    handleCurrentChange (val) {
      this.$emit('getPage', val)
    }
  },
  data () {
    return {
      // currentPage1: 1,
      // currentPage2: 5,
      // currentPage3: 5,
      // currentPage4: 4
    }
  }
}
</script>

<style lang="stylus" scoped>
.block >>> .el-pagination
  .el-icon
    font-size 24px
  .number
    font-size 15px
.block
  margin 10px auto 20px
</style>
