<template>
  <div class="loginpw-container">
    <div class="login-input">
      <input type="text" placeholder="手机/邮箱/用户名" class="one" v-model.lazy="name" />
      <input :type="type" placeholder="密码" class="two" v-model.lazy="pwd" />
      <span class="iconfont" :class="yanjingObj" @click="setry"></span>
      <input type="text" placeholder="验证码" class="three" v-model.lazy="captcha" />
      <img :src="captcha_url" alt="" @click="show" />
    </div>
  </div>
</template>

<script>
import { reqCaptch } from '@/api/index.js'
export default {
  data() {
    return {
      yanjingObj: {
        'icon-biyanjing': true,
        'icon-yanjing': false
      },
      name: '',
      pwd: '',
      captcha: '',
      url: '',
      num: 0
    }
  },
  async created() {
    this.num++
    this.url = await reqCaptch(this.num)
  },
  watch: {
    name(newvalue) {
      this.$emit('numberTwo', 'name', newvalue)
    },
    pwd(newvalue) {
      this.$emit('numberTwo', 'pwd', newvalue)
    },
    captcha(newvalue) {
      this.$emit('numberTwo', 'captcha', newvalue)
    }
  },
  computed: {
    type() {
      if (this.yanjingObj['icon-biyanjing']) return 'password'
      return 'text'
    },
    captcha_url() {
      let str = new RegExp('//([0-9]|\\.|:)*/', 'i')
      console.log(str, str.exec(this.url))
      return this.url.replace(/\/\/([0-9]|\.|:)*\//, `//${this.$serveHost}/`)
    }
  },
  methods: {
    setry() {
      this.yanjingObj['icon-biyanjing'] = !this.yanjingObj['icon-biyanjing']
      this.yanjingObj['icon-yanjing'] = !this.yanjingObj['icon-yanjing']
    },
    async show() {
      this.num++
      if (this.num === 4) {
        this.num = 1
      }
      console.log(this.num)
      this.url = await reqCaptch(this.num)
    }
  }
}
</script>

<style lang="stylus" scoped>
.loginpw-container
  .login-input
      display: flex
      flex-direction: column
      align-items: center
      position: relative
      span
        position: absolute
        right: 13px
        top: 68px
        font-size: 25px
        color: #b6b3b6
      img
        position: absolute
        right: 13px
        bottom: 17px
        width 120px
        height 39px
      input
        margin-bottom: 15px
        padding-left: 10px
        width: 270px
        height: 42px
        border: 1px solid #b6b3b6
        border-radius: 3px
</style>
