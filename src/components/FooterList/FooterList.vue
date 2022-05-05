<template>
  <div class="food-list">
    <transition name="bgc">
      <div class="bgc" @click.capture="showFoodList" v-show="flag"></div>
    </transition>
    <transition name="list">
      <div class="list" v-show="flag">
        <div class="clearfis clearall">
          <span class="left">已选商品</span>
          <div class="right" @click="clearAll"><span class="iconfont icon-shanchu"></span> 清空</div>
        </div>
        <ul>
          <li v-for="(food, index) in footer_foods" :key="index">
            <div class="produce">
              <Acount :food="food"></Acount>
              <div class="produce-left">
                <img :src="food.img" alt="" />
              </div>
              <div class="produce-right" id="1">
                <p>{{ food.name }}</p>
                <p></p>
                <p>
                  <span class="now">¥{{ Math.round(food.row_price * food.discount * 0.1) }}</span>
                  <span class="row">¥{{ food.row_price }}</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BScroll from '@better-scroll/core'
import Acount from '@/components/Acount/Acount.vue'
export default {
  props: ['showFoodList', 'flag'],
  components: {
    Acount
  },
  computed: {
    ...mapState(['footer_foods']),
    ...mapGetters(['footer_count'])
  },
  mounted() {},
  watch: {
    footer_foods: {
      handler(n, o) {
        console.log('点餐列表变化')
        if (this.bs) {
          this.$nextTick(() => {
            this.bs.refresh()
          })
        }
      }
    },
    flag(n, o) {
      if (!this.bs) {
        console.log('bs被创建')
        this.$nextTick(() => {
          this.bs = new BScroll('.list', {
            click: true,
            disableTouch: false,
            specifiedIndexAsContent: 1
          })
        })
      }
      if (this.bs) {
        this.$nextTick(() => {
          this.bs.refresh()
        })
      }
    }
  },
  methods: {
    clearAll() {
      this.footer_foods.forEach(item => {
        item.count = 0
      })
      this.footer_foods.length = 0
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl'
.food-list
  position: absolute
  z-index -1
  bottom: 100%
  width 100%
  .bgc
    position: fixed
    width 100%
    height 100%
    bottom: 66px
    background-color rgba(0,0,0,.3)
    z-index 97
  .bgc-enter,.bgc-leave-to
    opacity 0
  .bgc-enter-active,.bgc-leave-active
    transition: all,.5s
  .list
    overflow: hidden
    position: relative
    background-color #fff
    z-index 98
    max-height: 300px
    padding-bottom: 10px
    .clearall
      position relative
      z-index:2
      background-color #fff
      .left
        float: left
      .right
        float right
  .list-enter,.list-leave-to
    transform: translateY(100%)
  .list-enter-active,.list-leave-active
    transition: all .5s
  .produce
    position: relative
    display: flex
    height: 60px
    .produce-left
      flex: 2
      display: flex
      justify-content: center
      align-items: center
      background-color: #fff
      img
        width: 85%
        height: 85%
        border-radius: 3px
    .produce-right
      flex: 8
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
