import Vue from 'vue'
import Router from 'vue-router'
// 非按需加载提前引入
import Index from '@/components/index'
import Types from '../components/types' // ..等同于@
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/types/:type', // :type 动态路由参数 将参数作为路径的一部分
      name: 'types',
      component: Types
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: () => import('../components/resetPassword') // 按需加载
    }
  ]
})
