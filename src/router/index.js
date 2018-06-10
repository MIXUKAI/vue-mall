import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home'
import Cart from '@/pages/Cart/Cart'
import Me from '@/pages/Me/Me'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/me',
      name: 'Me',
      component: Me
    }
  ]
})
