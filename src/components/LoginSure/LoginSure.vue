<template>
  <transition
    appear
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__bounceIn"
  >
    <div class="sure-container">
      <article class="sure-article">
        <div class="sure-mention">
          <span class="iconfont icon-50"></span>
          <p>{{ suretext }}</p>
        </div>
        <button class="sure-button green-button" @click="back">确认</button>
      </article>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['suretext'],
  methods: {
    back() {
      this.$emit('back')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl'
.sure-container
  position: fixed
  z-index 2
  top: -50%
  left: -50%
  width: 200%
  height: 200%
  background-color: rgba(0, 0, 0, 0.2)
  .sure-article
    overflow: hidden
    display: flex
    flex-direction: column
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -60%)
    width: 200px
    height: 150px
    border-radius: 5px
    background-color: #fff
    .sure-mention
      flex: 9
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      span
        font-size: 68px
        color: #ffd457
      p
        margin-top: 8px
        font-size: 14px
    .sure-button
      flex: 1
      border-radius: 0
</style>
