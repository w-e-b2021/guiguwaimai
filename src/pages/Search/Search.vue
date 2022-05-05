<template>
  <form action="get" @submit.prevent="show">
    <div class="search-container">
      <HeaderTop title="搜索"></HeaderTop>
      <section class="search-section">
        <input type="text" placeholder="请输入" v-model.trim="keyword" /><button class="green-button">
          提交
        </button>
      </section>
      <div class="wrapper" v-show="searchShops.length">
        <ul class="content">
          <li v-for="shop in searchShops" :key="shop._id"><ShopLists :shop="shop"></ShopLists></li>
        </ul>
      </div>
      <div class="mention" v-show="!searchShops.length">{{ mention_text }}</div>
    </div>
  </form>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import BScroll from '@better-scroll/core'

import { reqSearchShops } from '@/api/index.js'
import ShopLists from '@/components/ShopLists/ShopLists.vue'
export default {
  name: 'search',
  data() {
    return {
      keyword: '',
      mention_text: '输入你想要搜索商家的信息',
      only_once: -1 //判断是否mounted()时执行的show()
    }
  },
  components: { ShopLists },
  computed: {
    ...mapState(['searchShops'])
  },
  created() {
    this.show()
  },
  mounted() {
    this.bs = new BScroll('.wrapper', { click: true })
  },
  watch: {
    searchShops() {
      if (this.only_once) {
        this.mention_text = '没有搜到任何结果'
      }
    }
  },
  methods: {
    ...mapActions(['getSearchShops']),
    async show() {
      this.only_once++
      let { code, data } = await reqSearchShops(this.keyword)
      if (code === 0) {
        this.getSearchShops(data)
        if (data.length) {
          this.$nextTick(() => {
            this.bs.refresh()
          })
        }
        this.keyword = ''
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl'
form
  height 100%
.search-container
  display: flex
  flex-direction: column
  overflow: hidden
  height 100%
  box-sizing: border-box
  padding-top: 50px
  padding-bottom: 40px
  .mention
    text-align: center
  .wrapper
    flex: 1
    overflow: hidden
  .search-section
    margin-top: 15px
    margin-bottom: 15px
    display flex
    input
      flex: 8
      margin: 0 10px
      padding-left: 5px
      border: 0
      border-radius: 5px
      font-size: 16px
      background-color #f3f2f3
    button
      flex: 2
</style>
