import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// import Mesit from '@/pages/Mesit/Mesit.vue'
// import Order from '@/pages/Order/Order.vue'
// import Profil from '@/pages/Profil/Profil.vue'
// import Search from '@/pages/Search/Search.vue'

const Mesit = () => import('@/pages/Mesit/Mesit.vue')
const Order = () => import('@/pages/Order/Order.vue')
const Profil = () => import('@/pages/Profil/Profil.vue')
const Search = () => import('@/pages/Search/Search.vue')

import Login from '@/pages/Login/Login.vue'
import UserInfo from '@/pages/Userinfo/UserInfo.vue'
import Shop from '@/pages/Shop/Shop.vue'
import Diancan from '@/pages/Diancan/Diancan.vue'
import Pinjia from '@/pages/Pinjia/Pinjia.vue'
import Shangjia from '@/pages/Shangjia/Shangjia.vue'

const routes = [
  {
    path: '/',
    redirect: '/mesit'
  },
  {
    path: '/mesit',
    name: 'Mesit',
    component: Mesit //第一次请求对应的路由路径的时候执行
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/login',
    name: 'Login',
    meta: { notFooter: true },
    components: {
      default: Login
    }
  },
  {
    path: '/userinfo',
    name: 'UserInfo',
    component: UserInfo
  },
  {
    path: '/shop',
    redirect: '/shop/diancan',
    meta: { notFooter: true },
    component: Shop,
    children: [
      {
        name: 'dc',
        path: 'diancan',
        meta: { notFooter: true },
        component: Diancan
      },
      {
        name: 'sj',
        path: 'shangjia',
        meta: { notFooter: true },
        component: Shangjia
      },
      {
        name: 'pj',
        path: 'pinjia/:pingjia/:pinfen/:time',
        meta: { notFooter: true },
        component: Pinjia,
        props: true,
        beforeEnter: (to, from, next) => {
          if (from.name === 'dc') {
            to.meta.lastPath = 'dc'
          }
          if (from.name === 'sj') {
            to.meta.lastPath = 'sj'
          }
          next()
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
