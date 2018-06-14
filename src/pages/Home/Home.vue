<template>
  <div class="goods-container">
    <div class="filter-nav">
      <el-input
        placeholder="请输入关键词"
        v-model="gjcInput"
        size="middle"
        clearable
        @input="inputchange"
      >
      </el-input>
      <span>关键词搜索</span>
    </div>
    <div class="goods-result">
      <div class="goods-filter" id="filter">
        <dl class="filter-price">
          <dt>Price:</dt>
          <dd>
            <el-input  placeholder="最小值" v-model="startPrice"></el-input>
            <el-input  placeholder="最大值" v-model="endPrice"></el-input>
          </dd>
          <dd style="background-color: #fff; padding:0;">
            <el-button type="primary" @click="handlePriceRange">查询</el-button>
          </dd>
          <dd><el-button type="primary" @click="hanldeAllBooks">查看全部</el-button></dd>
        </dl>
      </div>
      <div class="goods-main">
        <div class="loading-data" v-if="loading">
          <img src="../../assets/loading.gif" alt="">
        </div>
        <div class="not-found" v-if="!goodsList.length && !loading">
          <img src="../../assets/notfound.png" alt="">
          <p>搜索不到结果</p>
        </div>
        <div class="goods-list-wrap">
          <ul>
            <li v-for="(item, index) in goodsList" :key="item.id">
              <div class="good-card">
                <img v-lazy="item.imgurl" alt="good-img">
                <div class="good-main">
                  <h3 class="good-name"><a href="">{{ item.name }}</a></h3>
                  <p class="good-price">{{ item.price  | formatPrice }}</p>
                  <div class="btn-area">
                    <a class="add-cart" @click="addCart(index)" style="cursor: pointer;">加入购物车</a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <home-pagination @getPage="getPage"></home-pagination>
        </div>
      </div>
    </div>
    <transition name="fade">
      <home-login v-show="lg_show" @hideLogin="closeLogin" @loginsucc="loginsucc"></home-login>
    </transition>
  </div>
</template>

<script>
import HomePagination from './components/Pagination'
import HomeLogin from './components/Login'

export default {
  name: 'Home',
  components: {
    HomePagination,
    HomeLogin
  },
  props: ['login'],
  data () {
    return {
      goodsList: [],
      loading: false,
      timeoutID: null,
      startPrice: '',
      endPrice: ''
    }
  },
  computed: {
    lg_show () {
      return this.login
    }
  },
  methods: {
    inputchange (value) {
      clearTimeout(this.timeoutID)
      this.timeoutID = setTimeout(() => {
        this.loading = true
        var completeUrl
        if (value === '') {
          completeUrl = this.base_url + '/Oracle/getItems/0'
        } else {
          completeUrl = this.base_url + '/Oracle/search?keyword=' + value
        }
        this.$axios.get(completeUrl)
          .then(res => {
            if (res.data.length) {
              this.goodsList = res.data
            } else {
              this.goodsList = []
            }
            this.loading = false
          })
      }, 1000)
    },
    closeLogin () {
      this.lg_show = false
      this.$emit('hideCover')
    },
    getPage (page) {
      this.loading = true
      let pageUrl = `${this.base_url}/Oracle/getItems/${page - 1}`
      this.$axios.get(pageUrl)
        .then(res => {
          this.goodsList = res.data
          this.loading = false
        })
    },
    fetchData () {
      this.loading = true
      this.$axios.get(`${this.base_url}/Oracle/getItems/0`)
        .then(res => {
          this.loading = false
          this.goodsList = res.data
        })
    },
    loginsucc (username) {
      this.$emit('loginsucc', username)
    },
    handlePriceRange () {
      if (!this.startPrice || !this.endPrice) {
        this.hanldeAllBooks()
        return
      }
      var completeUrl = `${this.base_url}/Oracle/getItemByPrice?begin=${this.startPrice}&end=${this.endPrice}&page=0`
      this.loading = true
      this.$axios.get(completeUrl)
        .then(res => {
          if (res.data) {
            this.goodsList = res.data.length ? res.data : []
          } else {
            this.goodsList = []
          }
          this.loading = false
        })
    },
    hanldeAllBooks () {
      this.fetchData()
    },
    addCart (index) {
      const itemId = this.goodsList[index].id
      const username = sessionStorage.username
      this.$axios({
        url: `${this.base_url}/Oracle/addShoppingCar`,
        method: 'POST',
        headers: {'content-type': 'application/json'},
        data: JSON.stringify({username, itemId})
      }).then(res => {
        if (res.data === 'ok') {
          this.$message({
            showClose: true,
            message: '添加购物成功',
            type: 'success'
          })
        }
      })
    }
  },
  filters: {
    formatPrice (price) {
      return '￥' + price.toFixed(2)
    }
  },
  created () {
    this.fetchData()
  },
  mounted () {
    this.$nextTick(() => {
      console.log(this.goodsList)
    })
  }
}
</script>

<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.goods-list-wrap >>> .el-pagination
  margin 20px auto
.filter-nav  >>> .el-input.el-input--middle.el-input--suffix
  width 300px
.filter-price >>> .el-input
  float left
  width 46%
.filter-price >>> .el-input:nth-child(1)
  margin-right 10px
.filter-price >>> .el-button
  width 100%
.goods-container
  margin 0 auto
  margin-top 150px
  max-width 1260px
  .filter-nav
    box-sizing border-box
    width 100%
    height 55px
    line-height 55px
    background-color #fff
    text-align right
    span
      font-weight bold
    a
      margin-left 20px
      color #000
  .goods-result
    margin-top 28px
    display flex
    width 100%
    .goods-filter
      box-sizing border-box
      width 200px
      height 300px
      margin-right 50px
      dt
        margin 20px
        margin-bottom 40px
        font-size 25px
        letter-spacing 2px
      dd
        margin 20px
        overflow hidden
        a
          color #fff
    .goods-main
      flex 1
      width 100%
    .loading-data
      text-align center
      margin 30px 0
    .not-found
      padding 50px
      text-align center
      p
        margin 30px
        font-size 30px
    .goods-list-wrap
      width 100%
      display flex
      flex-wrap wrap
      ul
        width 100%
        li
          float left
          box-sizing border-box
          border 2px solid #eee
          width 23.80952%
          margin-right 1.5873%
          margin-bottom 1.5873%
          transition all .4s
          &:nth-child(4n)
            margin-right 0
          &:hover
            box-shadow 0 10px 20px rgba(0,0,0,.3)
            transform translateY(-5px)
            border-color rgb(238,122,35)
          img
            display block
            cursor pointer
            width 100%
          .good-main
            padding 20px 15px
            padding-bottom 10px
            background-color #fff
            font-size 18px
            .good-name
              font-weight bold
              margin-bottom 30px
              font-size 16px
              color #444
              height 54px
              overflow hidden
              text-overflow ellipsis
              line-height 18px
              a:hover
                text-decoration underline
            .good-price
              color #d1434a
            .btn-area
              margin-top 15px
            .add-cart
              display block
              padding 8px
              text-align center
              border 1px solid #d1434a
              color #d1434a
              font-weight bold
              font-size 14px
              transition background-color .3s
              &:hover
                background-color rgb(255,229,230)
</style>
