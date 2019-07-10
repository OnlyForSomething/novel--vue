// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
// import { Button, Select, Carousel, CarouselItem } from 'element-ui'
// Vue.use(Button)
// Vue.use(Carousel)
// Vue.use(CarouselItem)
// Vue.use(Select)
Vue.use(ElementUI)
Vue.prototype.$axios = Axios
// 跨域代理host的添加
Vue.prototype.HOST = '/api'
Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
