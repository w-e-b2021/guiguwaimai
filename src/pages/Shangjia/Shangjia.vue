<template>
  <transition name="shangjia">
    <div class="container-shangjia">
      <div class="content">
        <article>
          <h3 class="name">{{ shangjia.name }}</h3>
          <div class="address"><span class="iconfont icon-dingwei"></span> {{ shangjia.shop_address }}</div>
          <div class="shangjia_img">
            <img src="@/assets/banner.jpg" alt="" />
            <img src="./logo.png" alt="" />
          </div>
          <h3>商家信息</h3>
          <div class="information"><span>商家品类：</span><span>脆皮鸡饭</span></div>
          <div class="information"><span>营业时间：</span><span>10:00-23:00</span></div>
          <h3>商家服务</h3>
          <div class="serve"><span class="bor">极速退</span><span>内容</span></div>
          <div class="serve"><span class="bor">极速退</span><span>内容</span></div>
        </article>
        <div class="jubao" @click="show">举报商家</div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from '@better-scroll/core'
import { mapMutations } from 'vuex'
import { Toast } from 'mint-ui'
export default {
  activated() {
    this.SJ('sj')
  },
  computed: {
    shangjia() {
      if (this.$route.query.shangjia) {
        return JSON.parse(this.$route.query.shangjia)
      } else {
        return {}
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      new BScroll('.container-shangjia', {
        click: true
      })
    })
  },
  methods: {
    ...mapMutations(['SJ']),
    show() {
      Toast({
        message: '操作成功'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
$color=#9e9e9e
.shangjia-enter
  transform: translateX(100%)
.shangjia-enter-active
  transition: all .3s
.container-shangjia
  flex: 1
  padding: 0 15px
  background-color rgba(221, 221, 221,0.2)
  .content
    height 100%
    article
      padding: 10px
      border-radius: 5px
      background-color #fff
      h3
        font-size: 15px
      .address
        margin: 10px 0
        font-size: 12px
        color: $color
      .shangjia_img
        img
          margin-right: 5px
          width 50px
          height 50px
          border: 1px solid $color
          border-radius: 5px
      .information,.serve
        margin: 10px 0
        font-size: 12px
        color: $color
        .bor
          margin-right: 5px
          padding: 2px
          border: 1px solid $color
          border-radius: 3px
    .jubao
      margin-top: 10px
      padding: 10px 0
      text-align: center
      color: $color
      border-radius: 5px
      background-color #fff
</style>
