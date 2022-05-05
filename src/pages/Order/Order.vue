<template>
  <div class="order-container">
    <HeaderTop title="订单管理"></HeaderTop>
    <p class="order-article" v-if="userinfo._id">您还没订单,赶快去下单吧!</p>
    <article class="order-article" v-else>
      <p>您还没有登录</p>
      <button class="green-button" @click="OrderPush">点击登录</button>
    </article>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'order',
  components: {},
  computed: {
    ...mapState(['userinfo'])
  },
  methods: {
    OrderPush() {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixins.styl'
.order-container
  padding-top: 50px
  .order-article
    margin-top: 200px
    text-align: center
</style>
