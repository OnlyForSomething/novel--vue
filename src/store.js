import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    // 存储token 如果localStorage中有值则取其值为初始值 没有设置为空
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    authorStatus: localStorage.getItem('Authorization') ? 1 : 0,
    account: localStorage.getItem('account') ? localStorage.getItem('account') : ''
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) { // 这里的state对应上面状态state
      state.Authorization = user.Authorization
      localStorage.setItem('Authorization', user.Authorization)
      state.authorStatus = user.authorStatus
      if (state.authorStatus) {
        state.account = user.account
        localStorage.setItem('account', user.account)
      }
    },
    clearStatus (state) {
      localStorage.removeItem('Authorization')
      localStorage.removeItem('account')
      state.authorStatus = 0
      state.Authorization = ''
      state.account = ''
    }
  },
  getters: {
    account: (state) => state.account,
    authorStatus: (state) => state.authorStatus
  }
})

export default store
