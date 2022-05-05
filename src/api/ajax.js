import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8080'
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
