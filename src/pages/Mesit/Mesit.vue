<template>
  <div class="mesit-container">
    <HeaderTop :title="address.address">
      <template v-slot:header-left>
        <router-link to="/search">
          <div class="mesit-left">
            <span class="iconfont icon-icon-test2" style="font-size: 25px; color: #fff"></span>
          </div>
        </router-link>
      </template>
      <template v-slot:header-right>
        <div class="mesit-right">
          <router-link to="/profil" style="color: #fff" v-if="userinfo._id">
            <span class="iconfont icon-touxiang" style="font-size: 20px"></span>
          </router-link>
          <router-link to="/login" style="color: #fff" v-else>登录注册</router-link>
        </div>
      </template>
    </HeaderTop>
    <nav class="shop-nav">
      <div v-if="categorys.length" class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(category, index) in categorys" :key="index">
            <ul class="daohang">
              <li v-for="item in category" :key="item._id">
                <img :src="'http://192.168.1.102:8080/net' + item.image_url" alt="" />
                <p>{{ item.title }}</p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
      <img v-else src="./images/msite_back.svg" alt="" class="mesit_svg" />
    </nav>
    <article class="wrapper shop-article" v-show="shops.length">
      <div class="near-shop" :class="{ near: near }"><span class="iconfont icon-caidan"></span> 附近商家</div>
      <div class="content">
        <ShopLists v-for="shop in shops" :key="shop._id" :shop="shop"></ShopLists>
      </div>
    </article>
    <!-- <template v-else>
      <van-skeleton :row="3" style="margin-bottom: 15px" />
      <van-skeleton :row="3" style="margin-bottom: 15px" />
      <van-skeleton :row="3" style="margin-bottom: 15px" />
      <van-skeleton :row="3" style="margin-bottom: 15px" />
      <van-skeleton :row="3" style="margin-bottom: 15px" />
    </template> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BScroll from '@better-scroll/core'
import Swiper from 'swiper'
import 'swiper/css'

import ShopLists from '@/components/ShopLists/ShopLists.vue'
import { Toast } from 'mint-ui'
export default {
  name: 'Mesit',
  data() {
    return {
      near: false
    }
  },
  components: { ShopLists },
  computed: {
    ...mapState(['address', 'categorys', 'shops', 'userinfo']),
    ...mapGetters(['categorys'])
  },
  mounted() {
    this.$store.dispatch('receive_adress')
    this.$store.dispatch('receive_categorys')
    this.$store.dispatch('receive_shops', () => {
      this.$nextTick(() => {
        setTimeout(() => {
          this.bscroll = new BScroll('.wrapper', {
            click: true,
            specifiedIndexAsContent: 1
          })
        }, 500)
      })
    })
  },
  watch: {
    categorys(newValue) {
      this.$nextTick(() => {
        new Swiper('.swiper', {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  },
  methods: {
    fix() {
      console.log(1)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl'
.mesit-container
  box-sizing: border-box
  height 100%
  padding-top: 50px
  padding-bottom: 40px
  display: flex
  flex-direction: column
  .mesit-left
    margin-left: 10px
  .mesit-right
    margin-right: 10px
  .shop-nav
    width 100%
    background-color #fff
    margin-bottom: 10px
    .mesit_svg
      width 100%
      height 150px
    .daohang
      display: flex
      flex-wrap: wrap
      li
        padding: 6px 0
        width 25%
        text-align:center
        font-size: 12px
        img
          width 50%
    .swiper-pagination
      >span.swiper-pagination-bullet
        background #02a774
  .shop-article
    overflow: hidden
    flex: 1
    .near-shop
      position: relative
      z-index: 3
      padding: 10px
      color: #afaeaf
      box-shadow: 0 2px 6px -4px #808080
      background-color #fff
    .near
      background-color #fff
      span
        margin-right: 5px
</style>
