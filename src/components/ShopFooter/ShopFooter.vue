<template>
  <div class="shop-footer">
    <FooterList :footer_foods="footer_foods" :showFoodList="showFoodList" :flag="flag"></FooterList>
    <div class="clearfis fix">
      <div class="outer-xiaoche" @click="showFoodList">
        <div ref="xiaoche" class="xiaoche" :class="{ 'enough-green': footer_count }">
          <span class="iconfont icon-gouwucheman" :class="{ 'enough-green': footer_count }"></span>
          <div class="num-tip" v-show="footer_count">{{ footer_count }}</div>
        </div>
      </div>
      <div class="price">
        <p>
          ¥<span>{{ footer_price }}</span>
        </p>
        <p>
          配送费¥<span>{{ shangjia.delivery_tip }}</span
          >元
        </p>
      </div>
      <div class="jiesuan" v-if="!footer_count">¥{{ shangjia.qisong }}元起送</div>
      <div class="jiesuan" v-else-if="shangjia.qisong > footer_price">
        差¥{{ shangjia.qisong - footer_price }}元起送
      </div>
      <div class="jiesuan enough-green" v-else @click="handlePay">结算</div>
    </div>
    <mt-popup v-model="popupVisible" position="right">
      <div class="login-title login-wid">
        <h1>小象外卖</h1>
      </div>
      <mt-button class="login-wid" style="background-color: #0eb492" size="large" type="primary" @click="pay"
        >微信支付</mt-button
      >
      <br />
      <mt-button class="login-wid" size="large" type="primary" @click="pay">支付宝支付</mt-button>
    </mt-popup>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import FooterList from '@/components/FooterList/FooterList.vue'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      flag: false,
      popupVisible: false
    }
  },
  props: ['get_xiaocheleft', 'transition_after'],
  components: { FooterList },
  computed: {
    ...mapState(['footer_foods', 'shangjia', 'userinfo']),
    ...mapGetters(['footer_count', 'footer_price'])
  },
  methods: {
    showFoodList() {
      if (this.footer_count) {
        this.flag = !this.flag
      }
    },
    handlePay() {
      if (this.userinfo._id) {
        this.popupVisible = true
      } else {
        Toast('你还没有登录')
        this.$router.push('/profil')
      }
    },
    pay() {
      Toast('支付成功')
      this.popupVisible = false
    }
  },
  watch: {
    //监视器不执行有可能是写了两个watch
    footer_count(n, o) {
      if (n === 0) this.flag = false
    },
    transition_after(n, o) {
      let left = this.$refs.xiaoche.getBoundingClientRect().left + this.$refs.xiaoche.clientWidth / 2
      this.get_xiaocheleft(left)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl'
.shop-footer
  position: fixed
  z-index 5
  bottom: 0
  width: 100%
  height: 50px
  .login-title
    margin: 30px auto
    h1
      text-align: center
      color: #009475
      font-size: 40px
  /deep/ .v-modal
    width: 100%
    background-color #fff
    opacity 1
  /deep/ .mint-popup-right
    width 100%
  .fix
    background-color: #121c27
  .enough-green
    background-color #47b78b !important
    color: #fff !important
  .outer-xiaoche
    float: left
    margin: -10px 10px 15px 20px
    width: 56px
    height: 56px
    border-radius: 28px
    background-color: #121c27
    .xiaoche
      position: relative
      z-index 99
      margin: 6px 0 0 6px
      width: 44px
      height: 44px
      border-radius: 22px
      background-color: #2e303d
      text-align: center
      line-height: 44px
      .num-tip
        position: absolute
        top: 0px
        right: -16px
        width 25px
        height 16px
        border-radius: 8px
        font-size: 12px
        line-height: 16px
        background-color red
        color #fff
      span
        font-size: 28px
        color: #7b828c
  .price
    float: left
    color: #fff
    p:nth-child(1)
      margin: 5px 0 0 10px
    p:nth-child(2)
      font-size: 12px
      color: #bcbcbc
  .jiesuan
    float: right
    height: 100%
    width: 100px
    text-align: center
    line-height: 50px
    color: #fff
    background-color: #2e303d
</style>
