<template>
  <transition name="diancan" v-on:after-enter="afterEnter">
    <div class="diancan" v-if="fenlei != undefined">
      <div class="left wrapper1">
        <ul class="content">
          <li
            :class="{ current: index === currentIndex }"
            v-for="(item, index) in fenlei"
            :key="index"
            @click="bgcAlert(index)"
          >
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div>
      <div class="right wrapper">
        <ul class="right-inner content">
          <li ref="shop_li" v-for="(item, index) in fenlei" :key="index">
            <div class="right-tip">{{ item.name }}</div>
            <div class="produce" v-for="(food, index) in item.foods" :key="index">
              <Acount :food="food" :xiaocheleft="xiaocheleft"></Acount>
              <div class="produce-left" @click="showalert({ flag: true, food: food })">
                <img :src="food.img" alt="" />
              </div>
              <div class="produce-right" id="1">
                <p>{{ food.name }}</p>
                <p>
                  月售<span>{{ food.sale_num_month }}</span> 份&nbsp; 好评率<span>{{
                    food.haopin_rate
                  }}</span>
                </p>
                <div class="discount">折扣{{ food.discount }}</div>
                <p>
                  <span class="now">¥{{ Math.round(food.row_price * food.discount * 0.1) }}</span>
                  <span class="row">¥{{ food.row_price }}</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
        <div class="right-tip fix" :style="`top:${right_tip_y}px`" v-show="right_tip_flag">
          {{ currentIndex >= 0 && fenlei[currentIndex].name }}
        </div>
      </div>
      <ShopFooter :get_xiaocheleft="get_xiaocheleft" :transition_after="transition_after"></ShopFooter>
    </div>
  </transition>
</template>

<script>
import BScroll from '@better-scroll/core'
import { mapState, mapActions, mapMutations } from 'vuex'

import Acount from '@/components/Acount/Acount.vue'
import ShopFooter from '@/components/ShopFooter/ShopFooter.vue'
export default {
  data() {
    return {
      transition_after: false,
      xiaocheleft: 0,
      tops: [],
      right_tip_y: 0, //当两个rihgt-tip碰到一起时开始移动
      top: 0,
      scrollY: 0,
      right_tip_flag: false
    }
  },
  components: { Acount, ShopFooter },
  computed: {
    fenlei() {
      return this.$store.state.diancan.fenlei
    },
    currentIndex() {
      return this.tops.findIndex((top, index) => {
        return this.scrollY >= top && this.scrollY < this.tops[index + 1]
      })
    },
    right_tipIndex() {
      return this.tops.some(top => {
        return this.scrollY >= top - 35 && this.scrollY <= top
      })
    }
  },
  activated() {
    this.DC('dc')
  },
  mounted() {
    window.routeDiancan = this.$route
    this.receive_diancan(() => {
      this.$nextTick(() => {
        console.log(this)
        new BScroll('.wrapper1', {
          click: true,
          disableTouch: false //当在移动端环境（支持 touch 事件），
          // disableTouch 会计算为 false，监听 touch 相关的事件，
          // 而在 PC 环境，disableTouch 会计算为 true，不会监听 touch 相关事件。
        })
        this.foodScroll = new BScroll('.wrapper', {
          probeType: 2, //一开始是1的
          click: true,
          disableTouch: false
        })
        this.initialize()
      })
    })
  },
  methods: {
    ...mapActions(['receive_diancan', 'showalert']),
    ...mapMutations(['DC']),
    afterEnter() {
      this.transition_after = true
    },
    get_xiaocheleft(left) {
      this.xiaocheleft = left
    },
    bgcAlert(index) {
      let y = this.tops[index]
      this.scrollY = y
      this.foodScroll.scrollTo(0, -y, 300)
    },
    initialize() {
      let { tops, top } = this
      tops.push(top)
      let lis = this.$refs.shop_li
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
      this.foodScroll.on('scroll', ({ x, y }) => {
        this.scrollY = Math.abs(y)
        y < 0 ? (this.right_tip_flag = true) : (this.right_tip_flag = false)
        if (this.right_tipIndex) {
          this.right_tip_y = this.tops[this.currentIndex + 1] - 35 - this.scrollY //-(this.scrollY - (this.tops[this.currentIndex + 1] - 35))
        } else {
          this.right_tip_y = 0
        }
      })
      this.foodScroll.on('scrollEnd', ({ x, y }) => {
        this.scrollY = Math.abs(y)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl'
.test
  position: fixed
  top:0
  left: 0
  height 100px
  background-color pink
.diancan-enter
  transform: translateX(-100%)
.diancan-enter-active
  transition: all .3s
.diancan
  flex: 1
  display: flex
  .fix
    position: fixed
    top:0
    left: 0
    z-index: 3
    width 100%
    height 100%
    background-color rgba(0,0,0,.3)
  .left
    overflow: hidden
    height 100%
    flex: 2
    // display: flex
    // flex-direction: column
    font-size: 13px
    background-color: rgba(243, 243, 243, 1)
    span
      display: block
      padding: 15px 0
      width: 100%
      text-align: center
  .right
    position: relative
    height 100%
    box-sizing: border-box
    overflow: hidden
    flex: 8
    .fix
      position: absolute
      top:0
      width 100%
    .right-tip//把right-tip写出来
      padding-left: 10px
      height: 35px
      line-height: 35px
      background-color: rgba(243, 243, 243, 1)
    .right-inner
      .produce
        position: relative
        padding: 10px 0
        display: flex
        height: 80px
        .produce-left
          flex: 3
          display: flex
          justify-content: center
          align-items: center
          background-color: #fff
          img
            width: 85%
            height: 85%
        .produce-right
          flex: 7
          .discount
            width 50px
            text-align: center
            color: #f96451
            font-size: 10px
            border: 1px solid #f96451
            border-radius: 3px
          p
            margin: 4px 0
            font-size: 12px
            color: #a0a0a0
          p:nth-child(1)
            font-size: 13px
            color: black
            font-weight: 700
          .now
            margin-right: 10px
            color: red
            font-weight: 700
          .row
            text-decoration: line-through
            color: #a0a0a0
</style>
