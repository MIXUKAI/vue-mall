import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home'
import Cart from '@/pages/Cart/Cart'
import Me from '@/pages/Me/Me'
import AdminHome from '@/pages/Admin/AdminHome'
import UserTable from '@/pages/Admin/components/UserTable'
import BookTable from '@/pages/Admin/components/BookTable'
import UploadBook from '@/pages/Admin/components/UploadBook'

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
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminHome,
      children: [
        { path: 'utable', name: 'UserTable', component: UserTable },
        { path: 'btable', name: 'BookTable', component: BookTable },
        { path: 'upload', name: 'UploadBook', component: UploadBook }
      ]
    }
  ]
})
