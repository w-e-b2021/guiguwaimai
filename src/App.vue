<template>
  <div id="app">
    <router-view class="one"></router-view>
    <router-view name="footer"></router-view>
    <FooterGuidle v-show="!$route.meta.notFooter"></FooterGuidle>
    <!-- 测试验证在一个页面中，只要是能显示的组件，$route都一样，当然APP在任何时候都能显示，
    举个例子，Mesit组件显示，Shop组件就不能显示，但APP任何时候都能 -->
    <!-- hash和history区别#后面不算请求，用history模式需要后台配合（中间件）或者Nginx -->
  </div>
</template>

<script>
import { reqUserInfo } from '@/api/index.js'
import { mapActions } from 'vuex'

import FooterGuidle from '@/components/FooterGuidle/FooterGuidle.vue'
export default {
  components: {
    FooterGuidle
  },
  async mounted() {
    let { code, data, msg } = await reqUserInfo()
    if (code === 0) {
      this.receive_user(data)
    } else {
      console.log(msg)
    }
    console.log(this.$route, this.$router)
  },
  methods: {
    ...mapActions(['receive_user']),
    show() {
      console.log(this)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
html,body,#app
  height 100%
  -webkit-tap-highlight-color: rgba(0,0,0,0)
body
  font-size: 16px !important
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
*
  padding: 0
  margin: 0
li
  list-style none
a
  text-decoration: none
  color: #000
input
  border: 0
</style>
