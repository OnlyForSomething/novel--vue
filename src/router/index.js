import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
// 非按需加载提前引入
import Index from '@/components/index'
import Types from '../components/types' // ..等同于@
Vue.use(Router)
const router = new Router({
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
      path: '/login',
      name: 'login',
      meta: {showCopyright: false}, // 不显示copyright
      component: () => import('../components/login'),
      beforeEnter (to, from, next) {
        // if (from.path === '/') {
        //   alert('非法登陆，将为你跳转到首页')
        //   next(from.path)
        // }
        if (to.path === '/login' && store.getters.authorStatus === 1) { // 防止用户重复登陆
          alert('请不要重复登录')
          next(from.path) // 回到来的页面
        } else {
          next()
        }
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../components/registration')
    },
    {
      path: '/homepage',
      name: 'homepage',
      meta: {requireAuth: true}, // 需要登陆权限
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
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (JSON.parse(localStorage.getItem('account')) && store.state.authorStatus === 1) { // 判断本地是否存在account vuex中的登陆状态是否为 1
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
  /* 如果本地 存在 token 则 不允许直接跳转到 登录页面 */
  // if (to.fullPath === '/login') {
  //   if (JSON.parse(localStorage.getItem('token'))) {
  //     next({
  //       path: from.fullPath
  //     })
  //   } else {
  //     next()
  //   }
  // }
})
export default router
