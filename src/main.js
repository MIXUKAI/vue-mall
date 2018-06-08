// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import { Button, Pagination } from 'element-ui'
import './style/reset.css'

Vue.config.productionTip = false
Vue.use(axios)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(VueLazyLoad, {
  preload: 1.3,
  error: require('./assets/error.png'),
  loading: require('./assets/loading.gif'),
  attempt: 20
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
