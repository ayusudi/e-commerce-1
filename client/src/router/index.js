import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Shop from '../views/Shop.vue'
import Items from '../views/Items.vue'
import Cart from '../views/Cart.vue'
import Detail from '../components/Detail.vue'
import TRX from '../views/Trx.vue'
import Admin from '../views/Admin.vue'
import Listitem from '../views/Listitem.vue'
import Income from '../views/Income.vue'
import CreateItem from '../components/CreateItem.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') && localStorage.getItem('email')) {
        let role = localStorage.getItem('role')
        if (role === 'customer') {
          next({
            path: '/shop'
          })
        } else if (role === 'admin') {
          next({
            path: '/shop'
          })
        }
      } else {
        next()
      }
    }
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Signin.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') && localStorage.getItem('email')) {
        let role = localStorage.getItem('role')
        if (role === 'customer') {
          next({
            path: '/shop'
          })
        } else if (role === 'admin') {
          next({
            path: '/shop'
          })
        }
      } else {
        next()
      }
    }
  },
  {
    path: '/shop',
    name: 'shop',
    component: Shop,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') && localStorage.getItem('email')) {
        let role = localStorage.getItem('role')
        if (role === 'customer') {
          next()
        } else if (role === 'admin') {
          next({
            path: '/admin'
          })
        }
      } else {
        next()
      }
    },
    children: [
      {
        path: '',
        name: 'all',
        component: Items
      }, {
        path: 'bestseller',
        name: 'bestseller',
        component: Items
      }, {
        path: 'kids',
        name: 'kids',
        component: Items
      }, {
        path: 'paint',
        name: 'paint',
        component: Items
      }, {
        path: 'brush',
        name: 'brush',
        component: Items
      }, {
        path: 'profesional',
        name: 'profesional',
        component: Items
      }, {
        path: 'item/:id',
        name: 'itemDetails',
        component: Detail
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') && localStorage.getItem('email')) {
        let role = localStorage.getItem('role')
        if (role === 'customer') {
          next({
            path: '/shop'
          })
        } else if (role === 'admin') {
          // console.log('heree?')
          next()
        }
      } else {
        next({
          path: '/'
        })
      }
    },
    children: [
      {
        path: '',
        name: 'Income',
        component: Income
      },
      {
        path: 'items',
        name: 'Listitem',
        component: Listitem
      },
      {
        path: 'create',
        name: 'CreateItem',
        component: CreateItem
      }
    ]
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') && localStorage.getItem('email')) {
        let role = localStorage.getItem('role')
        if (role === 'customer') {
          next()
        } else if (role === 'admin') {
          next({
            path: '/admin'
          })
        }
      } else {
        next({
          path: '/'
        })
      }
    },
    children: [
      {
        path: ':id',
        name: 'Item',
        component: Detail
      }
    ]
  },
  {
    path: '/transactions',
    name: 'trx',
    component: TRX,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') && localStorage.getItem('email')) {
        let role = localStorage.getItem('role')
        if (role === 'customer') {
          next()
        } else if (role === 'admin') {
          next({
            path: '/admin'
          })
        }
      } else {
        next({
          path: '/'
        })
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
