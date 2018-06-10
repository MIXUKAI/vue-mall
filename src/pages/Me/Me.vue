<template>
  <div class="cart-container">
        <div class="cart">
      <h2 class="cart-title">我的订单</h2>
      <!-- <div class="empty-cart">
        <img src="./images/empty_gwc.png" alt="">
        <p>
          您的购物车空空如也哦, 赶快去购物吧
        </p>
      </div> -->
      <div class="loading-data" v-if="loading">
        <img src="../../assets/loading.gif" alt="">
      </div>
      <div class="item-list-wrap" v-if="itemList.length">
        <div class="cart-item">
          <div class="cart-item-head">
            <ul>
              <li>商品</li>
              <li>价格</li>
              <li>数量</li>
              <li>总价</li>
              <li>删除</li>
            </ul>
          </div>
          <ul class="cart-item-list">
            <li v-for="(item, index) in itemList" :key="item.id">
              <div class="cart-tab-1">
                <div class="cart-item-pic">
                  <img v-lazy="item.item.imgurl" :alt="item.name" style="width: 100%; height: 100%">
                </div>
                <div class="cart-item-title">{{ item.item.name }}</div>
              </div>
              <div class="cart-tab-2">
                <div class="item-price" style="color: #777;">￥<span class="price-num">{{ item.item.price | fixed}}</span></div>
              </div>
              <div class="cart-tab-3">
                <div class="item-quantity" style="color: #777;">
                  {{item.num}}
                </div>
              </div>
              <div class="cart-tab-4">
                <div class="item-price-total" style="color: #777;"><span class="price-tolal-num">{{ item.num * item.item.price | fixed }}元</span></div>
              </div>
              <div class="cart-tab-5">
                <div class="cart-item-opration">
                  <span class="iconfont"><img src="../../assets/ljx.png" alt="ljx" @click="showConfirm(index)"></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="confirm-delete">
        <h4>确认删除<i class="el-icon-delete" style="margin-left: 10px;"></i></h4>
        <div class="button-wrapper">
          <span @click="deleteItem" class="confirm-button ok">确定</span>
          <span @click="hideConfirm" class="confirm-button">取消</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Me',
  data () {
    return {
      loading: false,
      itemList: [],
      deleteIndex: 0
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.loading = true
      var url = `${this.base_url}/Oracle/getOrderList?username=${sessionStorage.username}`
      this.$axios.get(url)
        .then(res => {
          console.log(res)
          if (res.data) {
            this.itemList = res.data
          }
          this.loading = false
        })
    },
    showConfirm (index) {
      var confirmBox = document.getElementsByClassName('confirm-delete')[0]
      this.$emit('showCover')
      this.deleteIndex = index
      confirmBox.classList.add('render')
    },
    hideConfirm () {
      var confirmBox = document.getElementsByClassName('confirm-delete')[0]
      confirmBox.classList.remove('render')
      this.$emit('hideCover')
    },
    deleteItem () {
      const itemId = this.itemList[this.deleteIndex].item.id
      const username = sessionStorage.username
      this.itemList.splice(this.deleteIndex, 1)
      this.hideConfirm()
      this.$axios({
        url: `${this.base_url}/Oracle/deleteOrderListItem`,
        method: 'POST',
        headers: {'content-type': 'application/json'},
        data: JSON.stringify({username, itemId})
      }).then(res => {
        console.log(res)
        if (res.data === 'ok') {
          this.$message({
            showClose: true,
            message: '删除订单成功',
            type: 'success'
          })
        }
      })
    }
  },
  filters: {
    fixed (num) {
      return num ? num.toFixed(2) : 0
    }
  }
}
</script>

<style lang="stylus" scoped>
.loading-data
  text-align center
  margin 30px 0
.cart-container
  margin 0 auto
  margin-top 100px
  max-width 1280px
  .cart
    padding-bottom 50px
    .cart-title
      padding 20px 0 20px
      font-size 22px
      font-weight 700
  .item-list-wrap
    .cart-item
      display table
      width 100%
      .cart-item-head
        box-sizing border-box
        display table-header-group
        width 100%
        ul
          display table-row
          width 100%
          li
            display table-cell
            height 40px
            line-height 40px
            background-color #605f5f
            color #ffffff
            text-align center
            letter-spacing  3px
            font-size 15px
.cart-item-list
  display table-row-group
  li
    position relative
    display table-row
    padding 32px 0
    background-color #fff
    &>div
      position relative
      box-sizing border-box
      display table-cell
      border-bottom 1px solid #e9e9e9
      height 100%
      vertical-align top
      text-align center
      padding-top 64px
    .cart-tab-1
      min-height 72px
      width 450px
      // 为什么这里max-width不其效果
      padding 32px 0
      text-align left
      border-left 1px solid #e9e9e9
      .gou
        float left
        margin-top 20px
        margin-left 30px
        width 35px
        height 35px
        img
          width 100%
          cursor pointer
      .cart-item-pic
        float left
        box-sizing border-box
        margin-left 30px
        width 80px
        height 80px
        border 1px solid #e9e9e9
        overflow hidden
        img
          width 100%
      .cart-item-title
        float left
        padding 0 30px
        min-width 76px
        line-height 76px
        font-size 15px
        font-weight 700
    .cart-tab-2
      .item-price
        height 100%
    .cart-tab-5
      border-right 1px solid #e9e9e9
      .iconfont
        img
          width 30px
          height 30px
          cursor pointer
          position relative
          top -5px
.confirm-delete
  opacity 0
  visibility hidden
  position fixed
  z-index 10
  top 50%
  left 50%
  width 400px
  height 150px
  margin-top -50px
  margin-left -200px
  background-color rgba(255,255,255,.9)
  transition all .4s
  text-align center
  h4
    color #fff
    background-color #000
    height 60px
    line-height 60px
  .button-wrapper
    margin-top 40px
    .confirm-button
      border 1px solid #000
      padding 8px 30px
      color #000000
      cursor pointer
      transition background-color .3s
      &:hover
        background-color #000
        color #fff
.render
  opacity 1
  visibility visible
  margin-top -75px
</style>
