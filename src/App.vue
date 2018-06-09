<template>
  <div id="app">
    <home-header @alertLogin="show = true"></home-header>
    <router-view @showCover="showCover" @hideCover="hideCover" :login="show"/>
    <div class="cover" :class="{ display: show }">
    </div>
  </div>
</template>

<script>
import HomeHeader from '@/common/Header'

export default {
  name: 'App',
  components: {
    HomeHeader
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    showCover () {
      this.show = true
      console.log(this.$route)
      console.log(this.$router)
    },
    hideCover () {
      this.show = false
    }
  }
}
</script>

<style lang="stylus" scoped>
body {
  font-size: 14px;
  /* 考虑使用rem */
  background-color: #f5f7fc;
  font-family: akkurat,sans-serif;
}
.cover
  display none
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background-color rgba(0,0,0,.6)
.display
  display block
</style>
