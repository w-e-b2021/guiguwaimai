import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import HeaderTop from '@/components/HeaderTop/HeaderTop.vue'
import 'animate.css'
import { Button } from 'mint-ui'
import { Empty } from 'vant'
import { Skeleton } from 'vant'
import './mock/mockServer.js'
import VueLazyload from 'vue-lazyload'
import loadimage from '@/common/images/loadingimage.jpeg'

Vue.use(VueLazyload, {
  loading: loadimage
})
Vue.config.productionTip = false
Vue.component('HeaderTop', HeaderTop)
Vue.component(Button.name, Button)
Vue.use(Empty)
Vue.use(Skeleton)

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
