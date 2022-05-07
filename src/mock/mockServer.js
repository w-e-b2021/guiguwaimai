import data from './data.json'
import Mock from 'mockjs'
//拦截ajax请求
Mock.mock('http://192.168.1.102:8080/diancan', { code: 0, data: data.diancan })
Mock.mock('http://192.168.1.102:8080/pinjia', { code: 0, data: data.pinjia })
Mock.mock('http://192.168.1.102:8080/shangjia', { code: 0, data: data.shangjia })
console.log(Mock.mock(data))
