<template>
  <div class="scale-container" v-if="shop_flag.food">
    <div class="content">
      <div class="shang" :style="{ backgroundImage: `url('${shop_flag.food.img}')` }">
        <p>
          <span
            class="iconfont icon-icon-test6"
            style="color: #fff; font-size: 39px"
            @click="showalert({ flag: false })"
          ></span>
        </p>
        <p class="distrip">{{ shop_flag.food.distrip }}</p>
      </div>
      <div class="xia">
        <h3>{{ shop_flag.food.name }}</h3>
        <p>月售{{ shop_flag.food.sale_num_month }},好评率{{ shop_flag.food.haopin_rate }}%</p>
        <p>¥{{ Math.round(shop_flag.food.row_price * shop_flag.food.discount * 0.1) }}</p>
        <Acount :food="shop_flag.food"></Acount>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Acount from '@/components/Acount/Acount.vue'
export default {
  components: { Acount },
  computed: {
    ...mapState(['shop_flag'])
  },
  methods: {
    ...mapActions(['showalert']),
    back() {}
  }
}
</script>

<style lang="stylus" scoped>
.scale-container
  position: fixed
  z-index: 5
  width 100%
  height 100%
  background-color rgba(0,0,0,.3)
  .content
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%,-50%)
    width 75%
    height 50%
    border-radius: 5px
    overflow: hidden
    .shang
      position: relative
      width 100%
      height 70%
      background-size 100%
      .distrip
        position: absolute
        bottom: 0
        left: 10px
        color: #fff
    .xia
      position: relative
      width 100%
      height 30%
      box-sizing: border-box
      padding: 0 15px
      background-color #fff
</style>
