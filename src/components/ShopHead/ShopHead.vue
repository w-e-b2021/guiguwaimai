<template>
  <div class="shop-head">
    <transition>
      <Youhui v-if="youhui_flag" :activity="shangjia.activity" :showalert="showalert"></Youhui>
    </transition>
    <div
      class="bgc"
      :style="{ background: `url(${shangjia.banner_img}) no-repeat fixed -20px -30px/150% 30%` }"
    >
      <span class="iconfont icon-icon-test6" @click="$router.push('/mesit')"></span>
    </div>
    <div class="instruction">
      <h5><span>品牌</span>{{ shangjia.name }} &nbsp;({{ shangjia.shop_address }})</h5>
      <p>
        <span style="margin-right: 5px">{{ shangjia.pinfen }}</span
        >月售<span>{{ shangjia.sale_num_month }}</span
        >单 <span style="margin-left: 5px">{{ shangjia.deliveryer }}</span> 约<span
          style="margin-right: 5px"
          >{{ shangjia.delivery_time }}</span
        >距离<span>{{ shangjia.distance }}</span>
      </p>
      <p class="houdong" @click="showalert(true)">
        <span class="first">{{ shangjia.activity[0].name }}</span>
        <span class="second expllis">{{ shangjia.activity[0].content }}</span>
        <span>{{ shangjia.activity.length }}</span
        >个优惠
      </p>
    </div>
  </div>
</template>

<script>
import Youhui from '@/components/Youhui/Youhui.vue'
export default {
  data() {
    return {
      youhui_flag: false
    }
  },
  props: ['shangjia'],
  components: { Youhui },
  methods: {
    showalert(flag) {
      this.youhui_flag = flag
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl'
.shop-head
  .v-enter-active,.v-leave-active
    transition: all .3s
  .v-enter,.v-leave-to
    transform: translateY(50%)
  .bgc
    height: 50px
    line-height: 50px
    color: #fff
    opacity: 0.9
    span
      font-size: 37px
  .instruction
    padding-top: 20px
    text-align: center
    h5
      font-size: 18px
      &::after
        content: ''
        margin-left: 10px
        display: inline-block
        border: 5px solid transparent
        border-left-color: black
      span
        padding: 0 2px
        margin-right: 10px
        display: inline-block
        font-size: 13px
        background-color: #ffed01
        border-radius: 3px
    p
      margin: 5px 0
      font-size: 12px
      .first
        padding: 0 2px
        margin-right: 5px
        border-radius: 3px
        background-color: #3dd0a6
        color: #fff
      .second
        display: inline-block
        text-align: left
        margin-right: 5px
        width: 200px
    .houdong
      position relative
      height: 20px
      display: flex
      align-items: center
      justify-content: center
      margin: auto
      width: 305px
      box-shadow: 0 0px 8px -3px #808080
      &::after
        content: ''
        position: absolute
        right: -3px
        margin-left: 10px
        display: inline-block
        border: 5px solid transparent
        border-left-color: black
</style>
