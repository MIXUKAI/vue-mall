<template>
  <div class="cart-container">
        <div class="cart">
      <h2 class="cart-title">我的购物车</h2>
      <!-- <div class="empty-cart">
        <img src="./images/empty_gwc.png" alt="">
        <p>
          您的购物车空空如也哦, 赶快去购物吧
        </p>
      </div> -->
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
                <span class="check-box-wrap">
                  <input type="checkbox" :id="'check' + index" class="input_check" @click="select($event, index)">
                  <label :for="'check' + index"></label>
                </span>
                <div class="cart-item-pic">
                  <img v-lazy="item.imgUrl" :alt="item.name" style="width: 100%; height: 100%">
                </div>
                <div class="cart-item-title">{{ item.name }}</div>
              </div>
              <div class="cart-tab-2">
                <div class="item-price" style="color: #777;">￥<span class="price-num">{{ item.price | fixed}}</span></div>
              </div>
              <div class="cart-tab-3">
                <div class="item-quantity" style="color: #777;">{{ item.quantity }}</div>
              </div>
              <div class="cart-tab-4">
                <div class="item-price-total" style="color: #777;"><span class="price-tolal-num">{{ item.quantity * item.price | fixed }}元</span></div>
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
      <div class="cart-foot-wrap">
        <span class="check-box-wrap check-all">
          <input type="checkbox" id="checkall" class="input_check" :checked="selectAllFlag" @click="selectAll" v-model="selectAllFlag">
          <label for="checkall"></label>
        </span>
        选择全部
        <div class="cart-foot-r">
          <div class="btn-wrap">
            <a class="btn" href="javascript:;">结算</a>
          </div>
          <div class="item-total">总价：<span style="color: #E35C62">￥</span><span class="item-total-num">{{ totalPrice | fixed }}</span></div>
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
  name: 'Cart',
  data () {
    return {
      itemList: [{
        id: 1,
        name: '八八海苔饼',
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528349937925&di=0001689eaef703db32cc6918ad0d2720&imgtype=0&src=http%3A%2F%2Fm.tuniucdn.com%2Ffb2%2Ft1%2FG2%2FM00%2F6D%2F01%2FCii-T1fdBQWIZg-yAARA1P1eNB8AACfXQBHSkQABEDs517_w700_h0_c0_t0.JPG',
        price: 25,
        quantity: 5
      }, {
        id: 2,
        name: '99海苔饼',
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528349937925&di=0001689eaef703db32cc6918ad0d2720&imgtype=0&src=http%3A%2F%2Fm.tuniucdn.com%2Ffb2%2Ft1%2FG2%2FM00%2F6D%2F01%2FCii-T1fdBQWIZg-yAARA1P1eNB8AACfXQBHSkQABEDs517_w700_h0_c0_t0.JPG',
        price: 24,
        quantity: 5
      }],
      selectList: [],
      totalPrice: 0,
      deleteIndex: 0,
      selectAllFlag: false
    }
  },
  methods: {
    calcTotal () {
      this.totalPrice = 0
      this.selectList.forEach((val, index) => {
        this.totalPrice += val.price * val.quantity
      })
    },
    changeSelectList () {
      this.selectList = []
      var checkBoxs = document.getElementsByClassName('input_check')
      this.itemList.forEach((val, index) => {
        if (checkBoxs[index].checked) {
          this.selectList.push(val)
        }
      })
      this.selectAllFlag = this.selectList.length === this.itemList.length
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
      console.log(this.deleteIndex)
      this.itemList.splice(this.deleteIndex, 1)
      this.hideConfirm()

      this.$nextTick(function () {
        this.changeSelectList()
        this.selectAllFlag = this.confirmList.length === this.itemList.length
      })
    },
    select (event, index) {
      this.changeSelectList()
    },
    selectAll () {
      var checkBoxs = Array.from(document.getElementsByClassName('input_check'))
      var checkAll = document.getElementById('checkall')
      if (!checkAll.checked) {
        checkBoxs.forEach((input, index) => {
          input.checked = false
        })
        this.selectList = [...this.itemList]
      } else {
        checkBoxs.forEach((input, index) => {
          input.checked = true
        })
        this.selectList = []
      }
    }
  },
  watch: {
    selectList () {
      this.calcTotal()
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
.cart-foot-wrap
  margin-top 50px
  height 55px
  background-color #fff
  border 1px solid #e9e9e9
  color #666
  line-height 55px
  .gou
    float left
    margin-top 10px
    margin-left 30px
    width 35px
    height 35px
    margin-right 30px
    img
      width 100%
      cursor pointer
  .cart-foot-r
    float right
    height 100%
    .item-total
      float right
      margin-right 30px
      color #c9c9c9
      .item-total-num
        color #E35C62
        font-weight 700
    .btn-wrap
      float right
      height 100%
      .btn
        display block
        padding 0 30px
        height 100%
        background-color #E35C62
        font-size 25px
        color #fff
        line-height 55px
.check-box-wrap
  float left
  margin-top 25px
  margin-left 30px
  height 30px
  position relative
  .input_check
    position absolute
    visibility hidden
    &+label
      vertical-align top
      display inline-block
      width 25px
      height 25px
      border 2px solid #e92333
      cursor pointer
      border-radius 50%
    &:checked+label
      background-color #e92333
    &:checked+label::after
      content: "";
      position: absolute;
      left: 3px;
      bottom: 14px;
      width: 17px;
      height:7px;
      border: 3px solid #fff;
      border-top-color: transparent;
      border-right-color: transparent;
      transform: rotate(-45deg)
.check-all
  margin 15px 30px 0
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
