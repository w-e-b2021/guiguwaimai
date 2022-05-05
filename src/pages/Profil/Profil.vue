<template>
  <div class="profil-container">
    <HeaderTop title="我的"></HeaderTop>
    <router-link :to="userinfo._id ? '/userinfo' : '/login'" class="section-1">
      <div class="touxiang">
        <img :src="'http://127.0.0.1:5500' + userinfo.person_img_url" alt="" v-if="userinfo.person_img_url" />
      </div>
      <div class="touxiang-right">
        <h3>{{ userinfo.person_name || userinfo._id || '登录/注册' }}</h3>
        <p><span class="iconfont icon-a-tupianyihuifu-46"></span>{{ userinfo.phone || '暂无绑定' }}</p>
      </div>
    </router-link>
    <section class="section-2">
      <ul class="section-2-2">
        <li>
          <p>
            <span>{{ userinfo.person_money || '0.00' }}</span
            ><small>元</small>
          </p>
          <small>我的余额</small>
        </li>
        <li>
          <p>
            <span>{{ (userinfo.person_ticket && userinfo.person_ticket.length) || '0' }}</span
            ><small>个</small>
          </p>
          <small>我的优惠</small>
        </li>
        <li style="border: 0">
          <p>
            <span>{{ userinfo.person_points || '0' }}</span
            ><small>分</small>
          </p>
          <small>我的积分</small>
        </li>
      </ul>
    </section>
    <section class="section-3">
      <ul>
        <li>
          <span class="iconfont icon-dingdan" style="color: #20c184"></span>
          <p>我的订单</p>
        </li>
        <li>
          <span class="iconfont icon-jifen" style="color: #f2723b"></span>
          <p>积分商城</p>
        </li>
        <li>
          <span class="iconfont icon-31huiyuan" style="color: #f2c821"></span>
          <p>小象外卖会员卡</p>
        </li>
        <li>
          <span class="iconfont icon-fuwuzhongxin" style="color: #8f8f8f"></span>
          <p>服务中心</p>
        </li>
      </ul>
    </section>
    <mt-button type="danger" style="width: 100%; margin-top: 15px" @click="logout" v-if="userinfo._id">退出登录</mt-button>
  </div>
</template>
<script>
import { MessageBox, Toast } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import { reqLogout } from '@/api/index.js'
export default {
  name: 'profil',
  computed: {
    ...mapState(['userinfo'])
  },
  methods: {
    ...mapMutations(['CLEAR_USER']),
    logout() {
      MessageBox.confirm('确定退出登录?', '提示').then(
        async action => {
          let { code } = await reqLogout()
          if (code === 0) {
            this.CLEAR_USER()
            Toast('退出成功')
          } else {
            Toast('退出失败')
          }
        },
        action => {}
      )
    }
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixins.styl'
.profil-container
  padding-top: 50px
  .section-1
    display: flex
    padding: 15px 10px
    border-top: 1px solid #fff
    background-color #009475
    .touxiang
      overflow: hidden
      margin-right: 15px
      width 50px
      height 50px
      border-radius: 25px
      background-color pink
      img
        width 100%
        transform: scale(1.5)
    .touxiang-right
      display: flex
      position: relative
      flex-direction: column
      justify-content: center
      color: #fff
      flex: 1
      font-size: 14px
      &::after
        content: '>'
        position: absolute
        right: 15px
        top:center
      h3
        margin-bottom: 5px
  .section-2
    .section-2-2
      display flex
      padding: 5px 0
      height 80px
      border-bottom: 1px solid #8f8f8f
      li
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        flex: 1
        border-right: 1px solid #8f8f8f
        p
          span
            font-size: 28px
            font-weight: 700
      li:nth-of-type(1)
        span
          color: #f29d00
      li:nth-of-type(2)
        span
          color: #ff6e3b
      li:nth-of-type(3)
        span
          color: #5bad00
  .section-3
    padding-left: 30px
    li
      position: relative
      display: flex
      position: relative
      padding: 15px 0
      border-bottom: 1px solid black
      &::after
        content: '>'
        position: absolute
        right: 10px
        top:center
        color: #8f8f8f
      span
        position: absolute
        left: -23px
        top:50%
        transform: translateY(-50%)
        font-size: 20px
</style>
