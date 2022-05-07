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
import { reqAddress, reqFoodCategorys, reqShops, reqDiancan, reqPinjia, reqShangjia } from '../api/index.js'
//现在还只管请求成功的情况
export default {
  async receive_adress(context) {
    let geohash = context.state.jing + ',' + context.state.wei
    let { code, data } = await reqAddress(geohash)
    if (code === 0) {
      context.commit(RECEIVE_ADRESS, data)
    } else {
      console.log(data)
    }
  },
  async receive_categorys({ commit }) {
    let { code, data } = await reqFoodCategorys()
    if (code === 0) {
      commit(RECEIVE_CATEGORYS, data)
    } else {
      console.log(data)
    }
  },
  async receive_shops({ commit, state }, callback) {
    let { code, data } = await reqShops(state.jing, state.wei)
    if (code === 0) {
      commit(RECEIVE_SHOPS, data)
      callback && callback()
    } else {
      console.log(data)
    }
  },
  receive_user({ commit }, value) {
    commit(RECEIVE_USER, value)
  },
  async receive_diancan({ commit }, callback) {
    let { code, data } = await reqDiancan()
    if (code === 0) {
      commit(RECEIVE_DIANCAN, data)
      callback && callback()
    }
  },
  async receive_pingjia({ commit }) {
    let { code, data } = await reqPinjia()
    if (code === 0) {
      commit(RECEIVE_PINGJIA, data)
    }
  },
  async receive_shangjia({ commit }) {
    let { code, data } = await reqShangjia()
    if (code === 0) {
      commit(RECEIVE_SHANGJIA, data)
    }
  },
  updata({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(ADDUPDATA, food)
    } else {
      commit(REDUCEUPDATA, food)
    }
  },
  showalert({ commit }, value) {
    commit(SHOWALERT, value)
  },
  getSearchShops({ commit }, { data, callback }) {
    commit(GET_SEARCHSHOPS, data)
    callback && callback()
  }
}
