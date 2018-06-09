<template>
  <div class="goods-container">
    <div class="filter-nav">
      <span class="sortby">Sort by:</span>
      <a href="javascript:;">Default</a>
      <a href="javascript:;">Price<span class="iconfont"></span></a>
    </div>
    <div class="goods-result">
      <div class="goods-filter" id="filter">
        <dl class="filter-price">
          <dt>Price:</dt>
          <dd><a href="javascript:;">ALL</a></dd>
          <dd><a href="javascript:;">0-50</a></dd>
          <dd><a href="javascript:;">50-100</a></dd>
          <dd><a href="javascript:;">100-200</a></dd>
          <dd><a href="javascript:;">MORE</a></dd>
        </dl>
      </div>
      <div class="goods-main">
        <div class="loading-data" v-if="loading">
          <img src="../../assets/loading.gif" alt="">
        </div>
        <div class="goods-list-wrap">
          <ul>
            <li v-for="item in goodsList" :key="item.id">
              <div class="good-card">
                <img v-lazy="item.goodImgUrL" alt="good-img">
                <div class="good-main">
                  <h3 class="good-name">{{ item.goodName }}</h3>
                  <p class="good-price">{{ item.goodPrice }}</p>
                  <!-- 到时候可以过滤下 -->
                  <div class="btn-area">
                    <a class="add-cart" href="javascript:;">加入购物车</a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <home-pagination></home-pagination>
        </div>
      </div>
    </div>
    <transition name="fade">
      <home-login v-show="lg_show" @hideLogin="closeLogin"></home-login>
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
      goodsList: [{
        id: '001',
        goodName: '自拍杆',
        goodPrice: '39',
        goodImgUrL: 'http://imooc.51purse.com/static/zipai.jpg'
      }, {
        id: '002',
        goodName: '智能插线板',
        goodPrice: '59',
        goodImgUrL: 'http://imooc.51purse.com/static/6.jpg'
      }, {
        id: '003',
        goodName: '头戴式耳机',
        goodPrice: '80',
        goodImgUrL: 'http://imooc.51purse.com/static/2.jpg'
      }, {
        id: '004',
        goodName: '小钢炮蓝牙音箱',
        goodPrice: '129',
        goodImgUrL: 'http://imooc.51purse.com/static/1.jpg'
      }, {
        id: '005',
        goodName: '智能摄像机',
        goodPrice: '389',
        goodImgUrL: 'http://imooc.51purse.com/static/photo.jpg'
      }, {
        id: '006',
        goodName: 'Ear700',
        goodPrice: '700',
        goodImgUrL: 'http://imooc.51purse.com/static/16.jpg'
      }, {
        id: '007',
        goodName: 'IH 电饭煲',
        goodPrice: '999',
        goodImgUrL: 'http://imooc.51purse.com/static/9.jpg'
      }],
      loading: false
      // lg_show: false
    }
  },
  computed: {
    lg_show () {
      return this.login
    }
  },
  methods: {
    closeLogin () {
      this.lg_show = false
      this.$emit('hideCover')
    }
  }
}
</script>

<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.goods-list-wrap >>> .el-pagination
  margin 20px auto
.goods-container
  margin 0 auto
  margin-top 100px
  max-width 1260px
  .filter-nav
    box-sizing border-box
    padding 0 30px
    width 100%
    height 55px
    line-height 55px
    background-color #fff
    text-align right
    a
      margin-left 20px
      color #000
  .goods-result
    margin-top 20px
    display flex
    width 100%
    .goods-filter
      box-sizing border-box
      width 255px
      height 300px
      dt
        margin 20px
        margin-bottom 40px
        font-size 25px
        letter-spacing 2px
      dd
        margin 20px
        font-size 16px
        letter-spacing 1px
        a
          color #666
    .goods-main
      flex 1
      width 100%
    .loading-data
      text-align center
      margin 30px 0
    .goods-list-wrap
      width 100%
      display flex
      flex-wrap wrap
      ul
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
