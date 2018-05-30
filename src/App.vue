<template>
  <div id="app">
    <home-header></home-header>
    <router-view/>
  </div>
</template>

<script>
import HomeHeader from '@/common/Header'

export default {
  name: 'App',
  components: {
    HomeHeader
  }
}
</script>

<style>
body {
  font-size: 14px;
  /* 考虑使用rem */
  background-color: #f5f7fc;
  font-family: akkurat,sans-serif;
}
</style>
