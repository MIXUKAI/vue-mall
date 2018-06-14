<template>
  <div class="upload-content">
      <p>
        <el-input v-model="bookName" placeholder="请输入书名"></el-input>
      </p>
      <p>
        <el-input v-model="bookPrice" placeholder="请输入书本价格"></el-input>
      </p>
      <p>
        <el-input v-model="bookURL" placeholder="图片地址"></el-input>
      </p>
      <el-button type="primary" @click="uploadBook">上传<i class="el-icon-upload el-icon--right"></i></el-button>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  data () {
    return {
      bookName: '',
      bookPrice: 0,
      bookURL: ''
    }
  },
  methods: {
    uploadBook () {
      console.log(this.bookName, Number.parseFloat(this.bookPrice), this.bookURL)
      var name = this.bookName,
          price = this.bookPrice,
          imgurl = this.bookURL
      this.$axios({
        url: `${this.base_url}/Oracle/addItem`,
        method: 'POST',
        headers: {'content-type': 'application/json'},
        data: JSON.stringify({ name, price, imgurl })
      }).then(res => {
        console.log(res)
        if (res.data === 'ok') {
          this.$message({
            showClose: true,
            message: '书本上传成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.upload-content >>> .el-input
  width 300px
.upload-content
  margin 30px
  p
    margin-bottom 30px
</style>
