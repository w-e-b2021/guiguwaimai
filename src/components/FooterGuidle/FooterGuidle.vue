<template>
  <div class="footer-container">
    <router-link replace to="/mesit" class="hezi" active-class="active">
      <span class="iconfont icon-caidan"></span>
      <small>主页</small>
    </router-link>
    <router-link replace to="/search" class="hezi" active-class="active">
      <span class="iconfont icon-icon-test2"></span>
      <small>搜索</small>
    </router-link>
    <router-link replace to="/order" class="hezi" active-class="active">
      <span class="iconfont icon-dingdan"></span>
      <small>订单</small>
    </router-link>
    <router-link replace to="/profil" class="hezi" active-class="active">
      <span class="iconfont icon-zhanghao"></span>
      <small>用户</small>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
.footer-container
   display: flex
   justify-content: space-between
   position: fixed
   width 100%
   left: 0
   bottom: 0
   height 40px
   box-shadow: 0 -2px 5px -4px #808080
   background-color #fff
   .active
     background-color skyblue
     color: #fff
  .hezi
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  width 50px
  text-decoration: none
</style>
