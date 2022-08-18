import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import HeaderTop from '@/components/HeaderTop/HeaderTop.vue'
import 'animate.css'
import { Button, Popup } from 'mint-ui'
import { Skeleton, Empty } from 'vant'
import './mock/mockServer.js'
import VueLazyload from 'vue-lazyload'
import loadimage from '@/common/images/loadingimage.jpeg'
import 'amfe-flexible/index'

Vue.use(VueLazyload, {
  loading: loadimage
})
Vue.config.productionTip = false
Vue.component('HeaderTop', HeaderTop)
Vue.component(Button.name, Button)
Vue.component(Popup.name, Popup)
Vue.use(Empty)
Vue.use(Skeleton)
//代理服务器
Vue.prototype.$host = '120.79.28.190:5501'
//本地后端
Vue.prototype.$serveHost = 'localhost:5500'
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
