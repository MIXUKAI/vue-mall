<template>
  <div id="app">
    <home-header></home-header>
    <router-view @showCover="showCover" @hideCover="hideCover"/>
    <div class="cover">
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
  methods: {
    showCover () {
      var cover = document.querySelector('.cover')
      cover.style.display = 'block'
    },
    hideCover () {
      var cover = document.querySelector('.cover')
      cover.style.display = 'none'
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
</style>
