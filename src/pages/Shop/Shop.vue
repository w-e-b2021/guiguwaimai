<template>
  <div class="shop-container" v-if="shangjia.name">
    <transition>
      <Scale v-if="shop_flag.flag"></Scale>
    </transition>
    <ShopHead :shangjia="shangjia"></ShopHead>
    <div class="shop-head-guidle">
      <router-link to="/shop/diancan" replace><span>点餐</span></router-link>
      <router-link
        :to="`/shop/pinjia/${JSON.stringify(pingjia)}/${shangjia.pinfen}/${shangjia.delivery_time}`"
        replace
        >评价</router-link
      >
      <router-link :to="`/shop/shangjia?shangjia=${JSON.stringify(shangjia)}`" replace
        ><span>商家</span></router-link
      >
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
  <van-empty image-size="100%" description="描述文字" v-else />
</template>

<script>
import { Indicator } from 'mint-ui'
import { mapActions, mapState, mapMutations } from 'vuex'

import ShopHead from '@/components/ShopHead/ShopHead.vue'
import Scale from '@/components/Scale/Scale.vue'

export default {
  data() {
    return {
      lastPath: ''
    }
  },
  components: {
    ShopHead,
    Scale
  },
  created() {
    this.receive_pingjia()
    this.receive_shangjia()
    // this.wait()
  },
  computed: {
    ...mapState(['diancan', 'pingjia', 'shangjia', 'shop_flag'])
  },
  watch: {
    diancan(newV, oldV) {
      Indicator.close()
    }
  },
  methods: {
    ...mapActions(['receive_diancan', 'receive_pingjia', 'receive_shangjia']),
    ...mapMutations(['DC', 'SJ']),
    wait() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.shop-container
  height: 100%
  padding-bottom: 50px
  box-sizing: border-box
  display: flex
  flex-direction: column
  overflow hidden
  .v-enter,.v-leave-to
    opacity 0
  .v-enter-active,.v-leave-active
    transition: all .5s
  .shop-head-guidle
    position: relative
    z-index:1
    box-shadow: 0 2px 6px -4px #808080
    padding: 10px 0
    display: flex
    justify-content: space-around
</style>
