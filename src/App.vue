<template>
  <div id="app">
    <home-header @alertLogin="show = true" :username="username" @logout="logout"></home-header>
    <router-view @showCover="show = true" @hideCover="show = false" :login="show" @loginsucc="loginsucc"/>
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
      show: false,
      username: ''
    }
  },
  methods: {
    loginsucc (username) {
      sessionStorage.username = username
      this.username = sessionStorage.username
    },
    logout () {
      sessionStorage.username = ''
      this.username = sessionStorage.username
    }
  },
  // computed: {
  //   username () {
  //     return sessionStorage.username
  //   }
  // },
  mounted () {
    this.username = sessionStorage.username
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
  z-index 9
  top 0
  right 0
  bottom 0
  left 0
  background-color rgba(0,0,0,.6)
.display
  display block
</style>
