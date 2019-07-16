export default {
  install: function (Vue, opt) {
    Vue.mixin({ /*  注入组件选项
               若其他组件中有validateAccount就不会执行本插件中的这个validateAccount，没有才会执行插件中的。
               其实就是同名先执行组件本身中的方法。 插件中的方法和正常写在组件内部methods属性里面的方法使用方式一样，
               注入其实就是和写在内部methods中等同 */
      methods: {
        validateAccount: function () {
          if (!this.formdata.account.replace(/\s+/g, '')) { // 去空格
            this.errors = {
              account: '请输入用户名'
            }
            return false
          } else if (!this.formdata.account.match('^[a-zA-Z0-9_\u4e00-\u9fa5]+$')) {
            this.errors = {
              account: '用户名不能有特殊符号'
            }
            return false
          } else {
            return true
          }
        },
        validatePassword: function () {
          let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
          if (!this.formdata.password.replace(/\s+/g, '')) { // 去空格
            this.errors = {
              password: '请输入密码'
            }
            return false
          } else if (!reg.test(this.formdata.password)) {
            this.errors = {
              password: '请输入由数字和字母组成的6-16位密码'
            }
            return false
          } else {
            return true
          }
        },
        validateRepassword: function () {
          if (!this.repassword.trim()) {
            this.errors = {
              repassword: '请再次输入密码'
            }
            return false
          } else if (this.formdata.password !== this.repassword) {
            this.errors = {
              repassword: '两次输入的密码不同'
            }
            return false
          } else {
            return true
          }
        },
        validatePhone: function () {
          if (!this.formdata.phone.trim()) {
            this.errors = {
              phone: '手机号不能为空'
            }
            return false
          } else if (!/^1[345678]\d{9}$/.test(this.formdata.phone)) {
            this.errors = {
              phone: '请填写正确的手机号码'
            }
            return false
          } else {
            this.errors = {}
            return true
          }
        },
        viewPassword: function () {
          if (this.iTitle === '显示密码' && this.iClass === 'el-icon-view') {
            this.iTitle = '隐藏密码'
            this.iClass = 'el-icon-view_off'
            this.type = 'text'
          } else {
            this.iTitle = '显示密码'
            this.iClass = 'el-icon-view'
            this.type = 'password'
          }
        },
        validateEmail: function () {
          let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if (!this.formdata.email.replace(/\s+/g, '')) { // 去空格
            this.errors = {
              email: '请输入邮箱'
            }
            return false
          } else if (!reg.test(this.formdata.email)) {
            this.errors = {
              email: '请输入正确的邮箱'
            }
            return false
          } else {
            return true
          }
        },
        clearErrors: function (name) {
          if (name === 'account' && this.errors.account) {
            this.errors.account = ''
          } else if (name === 'password' && this.errors.password) { // 当前聚焦为password输入框且当前输入框输入有误
            this.errors.password = ''
          } else if (name === 'repassword' && this.errors.repassword) {
            this.errors.repassword = ''
          } else if (name === 'phone' && this.errors.phone) {
            this.errors.phone = ''
          } else if (name === 'email' && this.errors.email) {
            this.errors.email = ''
          }
        }
      }
    })
  }
}
