import Vue from 'vue'
import {
  RECEIVE_ADRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_DIANCAN,
  RECEIVE_PINGJIA,
  RECEIVE_SHANGJIA,
  ADDUPDATA,
  REDUCEUPDATA,
  SHOWALERT,
  GET_SEARCHSHOPS
} from './mutationtypes'

export default {
  [RECEIVE_ADRESS](state, value) {
    state.address = value
  },
  [RECEIVE_CATEGORYS](state, value) {
    state.categorys = value
  },
  [RECEIVE_SHOPS](state, value) {
    state.shops = value
  },
  [RECEIVE_USER](state, value) {
    state.userinfo = value
  },
  CLEAR_USER(state) {
    state.userinfo = {}
  },
  [RECEIVE_DIANCAN](state, value) {
    state.diancan = value
  },
  [RECEIVE_PINGJIA](state, value) {
    state.pingjia = value
  },
  [RECEIVE_SHANGJIA](state, value) {
    state.shangjia = value
  },
  [ADDUPDATA](state, food) {
    if (!food.count) {
      Vue.set(food, 'count', 1)
      state.footer_foods.push(food)
    } else {
      food.count++
    }
  },
  [REDUCEUPDATA](state, food) {
    if (food.count) {
      food.count--
      if (food.count === 0) {
        state.footer_foods.splice(state.footer_foods.indexOf(food), 1)
      }
    }
  },
  [SHOWALERT](state, value) {
    state.shop_flag.flag = value.flag
    state.shop_flag.food = value.food
  },
  DC(state, value) {
    //从点餐页进入评价页
    state.lastPath = value
  },
  SJ(state, value) {
    //从商家页进入评价页
    state.lastPath = value
  },
  [GET_SEARCHSHOPS](state, value) {
    state.searchShops = value
  }
}
