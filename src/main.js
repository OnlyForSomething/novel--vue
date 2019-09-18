// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import store from '../src/store'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css' // 第三方小图标
import Validate from '../src/utils/validate' // 多次使用的方法抽取为插件
import Crypt from '../src/utils/secret'
import ElementUI from 'element-ui'
// import { Button, Select, Carousel, CarouselItem } from 'element-ui'
// Vue.use(Button)
// Vue.use(Carousel)
// Vue.use(CarouselItem)
// Vue.use(Select)
Vue.use(ElementUI)
Vue.use(Validate)
Vue.use(Crypt)
Vue.prototype.$axios = Axios
// 跨域代理host的添加
Vue.prototype.HOST = '/api'
Vue.config.productionTip = false

/* eslint-disable no-new */

//  请求拦截
Axios.interceptors.request.use(
  config => {
    let url = config.url
    console.log(url)
    if (localStorage.Authorization) {
      config.headers.Authorization = localStorage.Authorization
      console.log('请求拦截')
    }
    if (url.split('/').pop() === 'OAuth') {
      // config.data.requestData = Crypt.Encrypt(JSON.stringify(config.data))
      console.log(config.data)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })
// 响应拦截
Axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      console.log(error.response.status)
      switch (error.response.status) {
        case 401:
          alert('登陆信息过期请重新登陆')
          store.commit('clearStatus')
          router.push({
            name: 'login'
            // query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
          })
          break
        default: return Promise.reject(error) // 如果状态码不是401 就将error返回给请求回应
      }
    }
  }

)
/**
 *对数字进行处理 每3位以逗号隔开
 */
Vue.filter('NumFormat', function (value) {
  if (!value) return '0.00'
  let intPart = Number(value) | 0 // 获取整数部分
  let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  let floatPart = '.00' // 预定义小数部分
  let value2Array = value.toString().split('.')
  // =2表示数据有小数位
  if (value2Array.length === 2) {
    floatPart = value2Array[1].toString() // 拿到小数部分
    // if (floatPart.length === 1) { // 补0,实际上用不着
    //   return intPartFormat + '.' + floatPart + '0'
    // } else {
    //   return intPartFormat + '.' + floatPart
    // }
    return intPartFormat + '.' + floatPart
  } else {
    return intPartFormat
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
