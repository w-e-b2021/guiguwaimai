import ajax from '@/api/ajax.js'
const base_url = '/api'

//1.根据经纬度过获取位置详情
export const reqAddress = geohash => ajax(`${base_url}/position/${geohash}`)
//2.获取食品分类列表
export const reqFoodCategorys = () => ajax(base_url + '/index_category')
//3.根据经纬度获取商铺列表
export const reqShops = (jing, wei) => ajax(base_url + '/shops', { jing, wei })
//4.根据经纬度和关键字搜索商铺列表
export const reqSearchShops = keyWord => ajax(base_url + '/search_shops', { keyWord })
//5.获取一次性验证码
export const reqSendCode = phone => ajax(base_url + '/sendcode', { phone })
//6.用户名密码登录
export const reqPwdLogin = ({ name, pwd, captcha }) =>
  ajax(base_url + '/login_pwd', { name, pwd, captcha }, 'post')
//7.手机号验证码登录
export const reqSmsLogin = (phone, code) => ajax(base_url + '/login_sms', { phone, code }, 'post')
//8.根据会话获取用户信息
export const reqUserInfo = () => ajax(base_url + '/userinfo')
//9.退出登录
export const reqLogout = () => ajax(base_url + '/logout')
//10.获取验证码图片
export const reqCaptch = num => ajax(base_url + '/captcha', { num })
//11.获取点餐mock数据
export const reqDiancan = () => ajax('/diancan')
//12.获取评价mock数据
export const reqPinjia = () => ajax('/pinjia')
//13.获取商家mock数据
export const reqShangjia = () => ajax('/shangjia')
