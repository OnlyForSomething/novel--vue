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
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../components/registration')
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: () => import('../components/homepage'),
      // 二级路由(嵌套路由)默认加载页面
      redirect: '/homepage/personalIndex',
      // 二级路由(嵌套路由)
      children: [
        {
          path: 'personalIndex',
          name: 'personalIndex',
          component: () => import('../components/personal/index')
        },
        {
          path: 'financialCenter',
          name: 'financialCenter',
          component: () => import('../components/personal/financialCenter')
        }
      ]
    }
  ]
})
