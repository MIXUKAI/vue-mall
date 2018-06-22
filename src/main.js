// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import store from './Store/store.js'
import
{
  Button,
  Pagination,
  Form, Input,
  FormItem,
  Message,
  InputNumber,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Table,
  TableColumn,
  Loading,
  MessageBox,
  Dialog
}
  from 'element-ui'
import './style/reset.css'

Vue.config.productionTip = false
Vue.use(axios)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(VueLazyLoad, {
  preload: 1.3,
  // error: require('./assets/error.png'),
  loading: require('./assets/loading-data.gif'),
  attempt: 20
})
Vue.prototype.$message = Message
Vue.prototype.base_url = 'http://10.62.20.186:8080'
Vue.prototype.$axios = axios
Vue.prototype.$confirm = MessageBox.confirm

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
