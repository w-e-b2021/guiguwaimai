<template>
  <div class="loginmes-container">
    <div class="login-input">
      <input type="text" placeholder="手机号" class="one" v-model="phone" />
      <span :class="{ on: isClick_1 && isClick_2 }" @click="heightBright($event)">获取验证码</span>
      <input type="text" placeholder="验证码" class="two" v-model.lazy="code" />
    </div>
    <div class="tongyi" v-if="isSend">
      <span
        style="color: #20c184; transform: translateY(1px); display: inline-block"
        class="iconfont icon-jingshi"
      ></span>
      {{ show_text }}
    </div>
  </div>
</template>

<script>
import { reqSendCode } from '@/api/index.js'
export default {
  data() {
    return {
      phone: '',
      code: '',
      isClick_2: true,
      code_text: '获取验证码',
      show_text: '',
      isSend: false
    }
  },
  props: ['showMention'],
  computed: {
    isClick_1() {
      return this.phone.length == 11 ? true : false
    }
  },
  mounted() {},
  watch: {
    phone(newvalue) {
      this.$emit('numberOne', 'phone', newvalue)
    },
    code(newvalue) {
      this.$emit('numberOne', 'code', newvalue)
    }
  },
  methods: {
    countdown(e) {
      this.time = 30
      this.isClick_2 = false
      e.target.innerText = `重新获取(${this.time})`
      // this.code_text = `重新获取(${this.time})`
      this.timer = setInterval(() => {
        if (this.time) {
          this.time--
          e.target.innerText = `重新获取(${this.time})`
          // this.code_text = `重新获取(${this.time})`
        } else {
          clearInterval(this.timer)
          this.isClick_2 = true
          e.target.innerText = `获取验证码`
          // this.code_text = '获取验证码'
        }
      }, 1000)
    },
    showAlert(text) {
      this.show_text = text
      this.isSend = true
      let timer = setTimeout(() => {
        this.isSend = false
        clearTimeout(timer)
      }, 2000)
    },
    async heightBright(e) {
      //判断手机号格式是否正确
      if (this.showMention('stop')) {
        // 调用定时器
        this.countdown(e)
        try {
          var { code, msg } = await reqSendCode(this.phone)
        } catch (e) {
          this.showAlert('请求失败')
          this.time = 0
          return
        }
        if (code === 0) {
          this.showAlert(msg)
        } else {
          this.showAlert(msg)
          this.time = 0
        }
      }
    }
  },
  beforeDestroy() {}
}
</script>

<style lang="stylus" scoped>
.loginmes-container
  .login-input
    display: flex
    flex-direction: column
    align-items: center
    position: relative
    z-index 1
    .on
      pointer-events:all
      font-weight:700
      color: #20c184
    span
      pointer-events: none
      position: absolute
      right: 13px
      top: 13px
      font-size: 13px
      color: #b6b3b6
      border: 0
      background-color #fff
      outline: none
    input
      margin-bottom: 15px
      padding-left: 10px
      width: 270px
      height: 42px
      border: 1px solid #b6b3b6
      border-radius: 3px
  .tongyi
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%,-50%)
    width: 150px
    height: 30px
    line-height: 30px
    font-size: 12px
    text-align: center
    color: black
    background-color: #ffffff
    border-radius: 3px
    box-shadow: 0 0 6px -3px #333
</style>
