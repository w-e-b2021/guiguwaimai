<template>
  <header class="shop-header">
    <slot name="header-left"><p></p></slot>
    <div class="center duohangyingcang">{{ title }}</div>
    <slot name="header-right"><p></p></slot>
    <!-- p标签是一定要加的因为有justify-content属性 -->
  </header>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl'
.shop-header
    position: fixed
    z-index 2
    top:0
    width 100%
    display: flex
    align-items: center
    justify-content: space-between
    height 50px
    background-color #009475
    color: #fff
    .center
      position: absolute
      left: 50%
      transform: translateX(-50%)
      width 50%
      text-align: center
</style>
