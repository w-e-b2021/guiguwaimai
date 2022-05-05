<template>
  <div class="login-container">
    <LoginSure v-show="mention" :suretext="suretext" @back="showAlert('', false)"></LoginSure>

    <div class="login-top"><span class="iconfont icon-icon-test6" @click="back"></span></div>
    <div class="login-title login-wid">
      <h1>小象外卖</h1>
    </div>
    <article class="login-article login-wid">
      <div class="login-select">
        <h3 @click="loginChangeOne" :class="{ 'login-class': select_flag }">短信登录</h3>
        <h3 @click="loginChangeTwo" :class="{ 'login-class': !select_flag }">密码登录</h3>
      </div>
      <LoginMes v-show="select_flag" @numberOne="getNumber" :showMention="showMention"></LoginMes>
      <LoginPw v-show="!select_flag" @numberTwo="getNumber"></LoginPw>
      <div class="login-tip">
        <label for="we">
          <input type="checkbox" id="we" class="q1" v-model="agree" />
          <span></span>
          温馨提示：未注册小象外卖账号的手机号，登录时将自动注册，且同意
          <span>《用户服务协议》</span>
        </label>
      </div>
      <button class="green-button login-wid" @click="showMention">登录</button>
      <p style="font-size: 12px; color: #b6b3b6; margin-top: 15px; text-align: center">关于我们</p>
    </article>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { reqSmsLogin, reqPwdLogin } from '@/api/index.js'

import LoginMes from '@/components/LoginMes/LoginMes.vue'
import LoginPw from '@/components/LoginPw/LoginPw.vue'
import LoginSure from '@/components/LoginSure/LoginSure.vue'
export default {
  data() {
    return {
      select_flag: true, //true代表短信登录
      mention: false, //false代表不显示错误信息模态框
      agree: '', //双向绑定同意勾选
      phone: '', //子组件的手机号
      code: '', //子组件的验证码
      suretext: '', //错误信息提示文本
      name: '', //子组件的账号
      pwd: '', //子组件的密码
      captcha: '' //子组件的图片验证码
    }
  },
  components: { LoginMes, LoginPw, LoginSure },
  methods: {
    ...mapActions(['receive_user']),
    back() {
      //登录界面返回
      this.$router.back()
    },
    loginChangeOne() {
      //选择短信登录
      this.select_flag = true
    },
    loginChangeTwo() {
      //选择账号登录
      this.select_flag = false
    },
    getNumber(name, value) {
      //获取LoginMes,LoginPw组件的手机号和验证码,账号,密码,图片验证码
      if (name === 'phone') {
        this.phone = value
      } else if (name === 'code') {
        this.code = value
      } else if (name === 'name') {
        this.name = value
      } else if (name === 'pwd') {
        this.pwd = value
      } else {
        this.captcha = value
      }
    },
    showAlert(suretext, metion = true) {
      this.suretext = suretext
      this.mention = metion
    },
    async showMention(stop) {
      let { name, pwd, captcha, phone, code, agree, showAlert } = this
      if (this.select_flag) {
        //短信登录验证
        if (!phone) {
          showAlert('手机号不能为空')
        } else if (!/^1[3-9]\d{9}$/.test(phone)) {
          showAlert('手机号格式不正确')
        } else if (stop === 'stop') {
          //如果执行到这一步，则说明手机号格式正确
          // str3 = String(Math.random()).substr(2, 6)这只是模拟
          return true
        } else if (!code) {
          showAlert('验证码不能为空')
        } else if (!/^\d{6}$/.test(code)) {
          showAlert('验证必须是6位数字')
        } else if (!agree) {
          showAlert('请同意用户服务协议')
        } else {
          //ajax短信验证码
          try {
            let { code, data, msg } = await reqSmsLogin(this.phone, this.code)
            if (code === 0) {
              //验证成功
              console.log(data, 'userinfo')
              this.receive_user(data)
              this.$router.replace('/profil')
            } else {
              //验证失败
              showAlert(msg)
            }
          } catch (err) {
            showAlert('请求失败')
          }
        }
      } else {
        //账号登录验证
        if (!name.trim()) {
          showAlert('账号不能为空')
        } else if (/\s/.test(name)) {
          showAlert('账号名中不能含有空格')
        } else if (!pwd) {
          showAlert('密码不能为空')
        } else if (!/^.{8,16}$/.test(pwd)) {
          showAlert('密码必须是8-16位的字符')
        } else if (!captcha) {
          showAlert('验证不能为空')
        } else if (!agree) {
          showAlert('请同意用户服务协议')
        } else {
          //ajax密码登录
          try {
            let { code, data, msg } = await reqPwdLogin({ name, pwd, captcha })
            if (code === 0) {
              this.receive_user(data)
              this.$router.replace('/profil')
            } else {
              showAlert(msg)
            }
          } catch (e) {
            showAlert('请求失败')
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl'
.login-container
  background-color #fff
  .login-top
    span
      font-size: 35px
      color: #c3c8c3
  .login-title
    margin: 30px auto
    h1
      text-align: center
      color: #009475
      font-size: 40px
  .login-article
    .login-select
      display: flex
      justify-content: center
      margin-bottom: 10px
      h3
        margin: 0 15px
        padding: 5px 0
        font-size: 15px
        // border-bottom: 2px solid black
    .login-tip
      margin-bottom: 30px
      font-size: 14px
      color: #b6b3b6
      span
        color: #009475
      .q1
        display: none
      .q1+span
        position: relative
        display: inline-block
        width: 18px
        height: 18px
        color: #fff
        border: 1px solid black
        border-radius: 3px
        transition: all 0.3s
        vertical-align: middle
        &::after
          content: '\2714'
          position: absolute
          left: 2px
          top: -3px
          font-size: 16px
      .q1:checked+span
        border: 1px solid #fff
        background-color: #20c184
        color: #fff
</style>
