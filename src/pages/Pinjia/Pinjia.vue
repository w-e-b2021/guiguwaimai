<template>
  <transition :name="lastPath">
    <div class="pinjia-container">
      <div class="content">
        <div ref="shang" class="shang" @tap="tapshow">
          <div class="left">
            <div style="position: absolute; bottom: 10px">
              <p style="font-size: 25px; color: #ffc107">{{ pinfen }}</p>
              <p style="font-size: 12px; font-weight: 700">综合评分</p>
              <p style="font-size: 12px">高于周边商家69.2%</p>
            </div>
          </div>
          <div class="right">
            <div class="taidu">
              <div style="margin-right: 10px">服务态度</div>
              <Stars :size="36" :sore="PingJia.serve_attitude"></Stars>
              <span style="color: #ffc107; margin-left: 5px">{{ PingJia.serve_attitude }}</span>
            </div>
            <div class="pingfen" style="margin: 10px 0">
              <div style="margin-right: 10px">商品评分</div>
              <Stars :size="36" :sore="PingJia.shop_quelity"></Stars>
              <span style="color: #ffc107; margin-left: 5px">{{ PingJia.shop_quelity }}</span>
            </div>
            <div class="shijian">
              <div style="margin-right: 10px">送达时间</div>
              <span style="font-size: 12px; font-weight: 400">{{ time }}</span>
            </div>
          </div>
        </div>
        <div class="xia">
          <div class="fenlei">
            <span @click="selectPingjia('全部')" :class="{ 'green-list': green === '全部' }">
              全部({{ pingjiaLists.length }})
            </span>
            <span
              :class="{ 'green-list': green === item.name }"
              v-for="(item, index) in PingJia.fenlei"
              :key="index"
              @click="selectPingjia(item.name)"
            >
              {{ item.name }}({{ item.list.length }})
            </span>
            <div>
              <p style="color: #b6b8bb; font-size: 12px">
                <input
                  type="checkbox"
                  style="vertical-align: middle"
                  @change="filter_on_15"
                />只看20字以上评价
              </p>
            </div>
          </div>
          <div class="content">
            <div class="per" v-for="(list, index) in lists" :key="index">
              <div class="per-left">
                <div class="touxiang">
                  <img src="http://127.0.0.1:5500/public/image/moren.png" />
                </div>
              </div>
              <div class="per-right">
                <div class="one clearfis">
                  <div class="name">{{ list.name }}</div>
                  <div class="date">{{ list.emit_date }}</div>
                </div>
                <div class="two clearfis"><Stars :size="24" :sore="list.pinfen_star"></Stars></div>
                <p class="three">
                  {{ list.content }}
                </p>
                <div class="four">
                  <span v-for="(item, index) in list.recommond" :key="index">{{ item }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fenlei fix" v-show="fix_flag">
        <span @click="selectPingjia('全部')" :class="{ 'green-list': green === '全部' }">
          全部({{ pingjiaLists.length }})
        </span>
        <span
          :class="{ 'green-list': green === item.name }"
          v-for="(item, index) in PingJia.fenlei"
          :key="index"
          @click="selectPingjia(item.name)"
        >
          {{ item.name }}({{ item.list.length }})
        </span>
        <div>
          <p style="color: #b6b8bb; font-size: 12px">
            <input type="checkbox" style="vertical-align: middle" @change="filter_on_15" />只看20字以上评价
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BScroll from '@better-scroll/core'
import Stars from '@/components/Stars/Stars.vue'
export default {
  data() {
    return {
      lists: [],
      green: '',
      fenlie_name: '',
      fix_flag: false
    }
  },
  props: ['pingjia', 'pinfen', 'time'],
  components: {
    Stars
  },
  created() {
    this.selectPingjia('全部')
    if (this.$route.meta.lastPath === 'dc') {
      this.DC('dc')
    } else if (this.$route.meta.lastPath === 'sj') {
      this.SJ('sj')
    }
  },
  mounted() {
    this.fenleiScroll = new BScroll('.pinjia-container', {
      probeType: 3,
      click: true,
      startX: 100, //组件被创建的时候从x方向100的位置滑动进场
      tap: 'tap' //在betterscroll控制区域点击是会触发tap事件
    })
    this.fenleiScroll.on('scroll', ({ x, y }) => {
      if (Math.abs(y) >= this.$refs.shang.clientHeight + 20) {
        this.fix_flag = true
      } else {
        this.fix_flag = false
      }
    })
  },
  watch: {
    lists: {
      handler() {
        this.$nextTick(() => {
          this.fenleiScroll.refresh()
        })
      }
    }
  },
  computed: {
    ...mapState(['lastPath']),
    PingJia() {
      return JSON.parse(this.pingjia)
    },
    pingjiaLists() {
      let arr = []
      this.PingJia.fenlei.forEach(item => {
        item.list.forEach(item => {
          arr.push(item)
        })
      })
      return arr
    }
  },
  methods: {
    tapshow() {
      console.log(12)
    },
    ...mapMutations(['DC', 'SJ']),
    selectPingjia(name) {
      this.fenlie_name = name
      if (name === '全部') {
        this.lists = this.pingjiaLists
        this.green = name
        return
      }
      this.PingJia.fenlei.some(item => {
        if (item.name === name) {
          this.lists = item.list
          this.green = name
          return
        }
      })
    },
    filter_on_15(e) {
      if (e.target.checked) {
        let arr = []
        this.lists.forEach(item => {
          if (item.content.length > 20) {
            arr.push(item)
          }
        })
        this.lists = arr
      } else {
        this.selectPingjia(this.fenlie_name)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl'
.dc-enter
  transform: translateX(100%)
.dc-enter-active
  transition: all .3s
.sj-enter
  transform: translateX(-100%)
.sj-enter-active
  transition: all .3s
.pinjia-container
  position relative
  overflow: hidden
  height 460px
  background-color: rgba(219, 221, 223, 0.3)
  .shang
    display: flex
    margin-bottom: 20px
    padding: 25px 0
    box-shadow: 0 2px 6px -4px #808080
    background-color: #fff
    .left
      flex: 3.5
      text-align: center
      display: flex
      justify-content: center
      position: relative
      border-right: 1px solid #dbdddf
    .right
      flex: 6.5
      padding-left: 20px
      font-size: 13px
      font-weight: 700
      .taidu, .pingfen, .shijian
        display: flex
  .fix
    position: absolute
    top:-2px
    width 100%
    background-color #fff
  .fenlei //分类和fix要和上下平级
    padding: 15px
    border-bottom: 1px solid #dbdddf
    span
      display: inline-block
      margin-right: 15px
      margin-bottom: 10px
      padding: 0 15px
      height: 30px
      font-size: 14px
      text-align: center
      line-height: 30px
      border-radius: 3px
      background-color: #dbdddf
    span:last-of-type
      margin-right: 0
  .xia
    background-color: #fff
    .content
      .per
        display: flex
        padding: 15px 15px 15px 0
        font-size: 12px
        border-bottom: 1px solid #dbdddf
      .per-left
        flex: 2
        text-align: center
        .touxiang
          width: 50px
          height: 50px
          overflow: hidden
          border-radius:50%
          margin: auto
        img
          width 50px
          height 50px
          transform: scale(1.3)
      .per-right
        flex: 8
        .one
          .name
            float: left
          .date
            float: right
        .two
          width 100%
        .three
          margin-top: 5px
          margin-bottom: 5px
          font-weight: 700
        .four
          span
            display: inline-block
            padding: 0 5px
            margin-right: 5px
            margin-bottom: 5px
            color: #bbbec2
            border: 1px solid #dbdddf
</style>
