<template>
  <div class="acount">
    <transition>
      <div
        class="addandred jian"
        v-if="food.count"
        @click="
          showBall($event)
          updata({ isAdd: 0, food })
        "
      >
        -
      </div>
    </transition>
    <div class="text" v-if="food.count">{{ food.count }}</div>
    <div class="text" v-else></div>
    <transition name="ourter1" v-on:after-enter="afterEnter">
      <div
        class="ourter"
        :class="{ out: out1 }"
        :style="`transform:translateY(${distanceY}px)`"
        v-show="ball.state"
      >
        <transition name="inner1">
          <div
            class="inner"
            :class="{ inn: inn1 }"
            :style="`transform:translateX(${distanceX}px);opacity:${opacity}`"
            v-show="ball.state"
          ></div>
        </transition>
      </div>
    </transition>
    <div
      class="addandred"
      @click="
        showBall($event)
        updata({ isAdd: 1, food })
      "
    >
      +
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      ball: { state: true },
      distanceY: 0,
      distanceX: 0,
      opacity: 1,
      out1: true,
      inn1: true
    }
  },
  props: ['food', 'xiaocheleft'],
  methods: {
    ...mapActions(['updata']),
    afterEnter() {},
    showBall(e) {
      let rect = e.target.getBoundingClientRect()
      if (this.food.count === undefined || this.food.count === 0) {
        this.out1 = this.inn1 = true
        // this.inn1 = true
        //————————————————————————————————————
        this.distanceY = window.innerHeight - rect.top
        this.distanceX = -(rect.left - this.xiaocheleft)
        this.opacity = 0.5
        // this.ball.state = false
      } else {
        this.out1 = this.inn1 = false
        // this.inn1 = false
        // this.ball.state = true
        //showBall执行在updata前面，看上面
        //所以点击减从1减到0的时候先执行showBall此时count还是1，在执行updata，此时count减为0
        //——————————————————————————————————
        this.distanceY = 0
        this.distanceX = 0
        this.opacity = 1
      }
      console.log(e.target.getBoundingClientRect())
    }
  }
}
</script>

<style lang="stylus" scoped>
.acount
  position: absolute
  right: 15px
  bottom: 12px
  display: flex
  .addandred
    position: relative
    z-index 2
    width: 18px
    height: 18px
    text-align: center
    line-height: 18px
    border-radius: 50%
    color: #fff
    background-color: #3dd0a6
    &.v-enter-active,&.v-leave-active
      transition: all .5s
    &.v-enter,&.v-leave-to
      opacity 0
      transform: translateX(35px) rotate(180deg)
  .jian
    width: 16px
    height: 16px
    background-color: #fff
    color: #3dd0a6
    border: 2px solid #3dd0a6
    font-weight: 700
  .text
    text-align: center
    width: 35px
    outline: none
    border: 0
  .ourter
    position: absolute
    z-index 1
    top:0
    right: 0
    width: 18px
    height: 18px
    .inner
      width: 18px
      height: 18px
      background-color: #3dd0a6
      border-radius: 50%
  .out
    transition: all .5s cubic-bezier(0.36, -0.58, 0.73, 0.13)
  .inn
    transition: all .5s cubic-bezier(0, 0, 0, 0)
  .ourter-enter-active
    transition: all .5s cubic-bezier(0.36, -0.58, 0.73, 0.13)
    // animation ourter .5s cubic-bezier(0.36, -0.58, 0.73, 0.13)
  .inner-enter-active
    transition: all .5s cubic-bezier(0, 0, 0, 0)
    // animation inner .5s cubic-bezier(0, 0, 0, 0)
  // .ourter-enter-to
  //   transform: translateY(200px)
  // .inner-enter-to
  //   transform: translateX(-200px)
  //   opacity .5
  @keyframes ourter
    100%
      transform: translateY(200px)
  @keyframes inner
    100%
      transform: translateX(-200px)
      opacity .5
</style>
