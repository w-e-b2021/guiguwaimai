<template>
  <div class="youhui-container">
    <div class="shang" @click="showalert(false)"></div>
    <div class="content">
      <ul>
        <li class="houdong" v-for="(item, index) in activity" :key="index">
          <span class="first" :class="{ first1: item.name == '特价', first2: item.name == '满减' }">
            {{ item.name }}
          </span>
          <span class="second expllis">{{ item.content }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['activity', 'showalert']
}
</script>

<style lang="stylus" scoped>
.youhui-container
  display: flex
  position: fixed
  bottom: 0
  z-index: 5
  width 100%
  height 200%
  background-color rgba(0,0,0,.3)
  .shang
    flex: 1
  .content
    position: absolute
    bottom: 0
    left: 0
    width 100%
    height 25%
    background-color #fff
    border-radius: 10px 10px 0 0
    li
      margin: 5px 0
      font-size: 12px
    .houdong
      position relative
      display: flex
      align-items: center
      padding: 8px 5px
      margin: 10px 0
      height: 20px
      width: 100%
      box-shadow: 0 0px 8px -5px #808080
      .first
        padding: 0 2px
        margin-right: 5px
        border-radius: 3px
        background-color: #3dd0a6
        color: #fff
      .first1
        background-color orange
      .first2
        background-color red
      .second
        display: inline-block
        text-align: left
        margin-right: 5px
        width: 200px
</style>
