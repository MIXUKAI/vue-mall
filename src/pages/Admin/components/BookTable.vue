<template>
  <div class="table-container">
      <template>
      <el-table
        v-loading="loading"
        ref="userList"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="日期"
          width="150">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
          <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <!-- scope.$index -->
            <el-button size="small" type="danger" @click="handleClick(scope.row)">删除</el-button>
            <el-button size="small" type="primary" plain>编辑</el-button>
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="large">删除</el-button> -->
            <!-- <el-button type="text" size="large">编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
      </template>
  </div>
</template>

<script>
export default {
  name: 'BookTable',
  data () {
    return {
      loading: false,
      tableData3: [{
        date: '2016-05-03',
        name: '宓徐锴',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: []
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.userList.toggleRowSelection(row)
        })
      } else {
        this.$refs.userList.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
