<template>
  <div class="shoplists-container">
    <router-link to="/shop">
      <div class="content">
        <div class="content-left">
          <img v-lazy="`http://${$serveHost}/public/shangjia_imgs/tu${index}.jpg`" alt="" />
        </div>
        <div class="content-right">
          <div class="left">
            <h3 class="shang">
              <span class="brand">品牌</span>
              <div class="duohangyingcang">{{ shop.name }}</div>
            </h3>
            <div class="zhong">
              <Stars class="star" :sore="shop.sore" :size="24"></Stars>
              <span>{{ shop.sore }}</span
              >月售<span>{{ shop.recent_order_num }}</span
              >单
            </div>
            <div class="xia">
              ¥<span>{{ shop.least_money }}</span
              >起送/配送费约¥<span>{{ shop.delivery_fee }}</span>
            </div>
          </div>
          <div class="right">
            <div class="shang">{{ shop.supports }}</div>
            <div>
              <span class="xia">{{ shop.delivery_mode }}</span>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import Stars from '@/components/Stars/Stars.vue'
export default {
  props: ['shop', 'index'],
  components: {
    Stars
  }
}
</script>

<style lang="stylus" scoped>
.shoplists-container
    .content
      display: flex
      padding: 10px
      .content-left
        margin-right: 5px
        flex: 2
        img
          width 100%
      .content-right
        flex: 8
        display: flex
        .left
          flex: 8
          display: flex
          flex-direction: column
          justify-content: space-around
          .shang
            font: 700 14px '宋体'
            .brand
              float: left
              padding: 3px
              font-size: 12px
              background-color #f5cc25
          .zhong
            margin: 5px 0
            font-size: 12px
            color: #afaeaf
            .star
              margin-top:3px
            span:nth-of-type(1)
              margin: 0 5px
              color: #ff9800
          .xia
            font-size: 14px
            color: #afaeaf
        .right
          flex: 2
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          .shang
            margin-bottom: 10px
            font-size: 14px
            color: #afaeaf
            letter-spacing:3px
          .xia
            font-size: 12px
            background-color rgba(67, 199, 137,.5)
            color: rgb(65, 184, 131)
            border-radius: 3px
</style>
