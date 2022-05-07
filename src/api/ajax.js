import axios from 'axios'
let isLocal = false
const request = axios.create({
  //没有在这配置前缀应该是防止所有请求都走代理
  //给代理服务器发请求
  baseURL: isLocal ? 'http://localhost:8080' : 'http://192.168.1.102:8080'
})

export default function ajax(url, data = {}, type = 'get') {
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'get') {
      promise = request.get(url, { params: data })
    } else if (type === 'post') {
      promise = request.post(url, data)
    } else {
      reject('请求方式有误')
    }
    if (promise) {
      promise
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    }
  })
}
