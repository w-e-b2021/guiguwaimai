<template>
  <div class="star" :class="'star-' + size">
    <span class="star-item" :class="item" v-for="(item, index) in starClasses" :key="index"></span>
  </div>
</template>

<script>
export default {
  props: {
    sore: {
      required: true,
      type: Number,
      default: 5
    },
    size: { type: Number, required: true }
  },
  computed: {
    starClasses() {
      let result = []
      let sore = this.sore
      // 1. 全星: 0-5
      let onClasses = Math.floor(sore)
      for (var i = 0; i < onClasses; i++) {
        result.push('on')
      }
      // 2. 半星: 1 || 0 看评分是否有小数位
      sore - onClasses > 0 && result.push('half')
      // 3. 灰色星星: 0-5
      while (result.length < 5) {
        result.push('off')
      }
      return result
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.star //2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
.star-48
  .star-item
    width 20px
    height 20px
    margin-right 22px
    background-size 20px 20px
  &:last-child
    margin-right: 0
  .on
    background-image: url('./images/star48_on@2x.png')
  .half
    background-image: url('./images/star48_half@2x.png')
  .off
    background-image: url('./images/star48_off@2x.png')
.star-36
  .star-item
    width 15px
    height 15px
    margin-right 6px
    background-size 15px 15px
  :last-child
    margin-right 0
  .on
    background-image: url('./images/star36_on@2x.png')
  .half
    background-image: url('./images/star36_half@2x.png')
  .off
    background-image: url('./images/star36_off@2x.png')
.star-24//1
  .star-item
    width 10px
    height 10px
    margin-right 3px
    background-size 10px 10px
  :last-child
    margin-right 0
  .on
    background-image: url(./images/star24_on@2x.png)
  .half
    background-image: url('./images/star24_half@2x.png')
  .off
    background-image: url('./images/star24_off@2x.png')
</style>
