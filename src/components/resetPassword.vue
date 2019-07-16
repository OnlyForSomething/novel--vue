<template>
  <div class="reset_form">
    <!--改密码的账号-->
    <InputGroup class="input" type="text" :readonly=readonly v-model="formdata.account" />
      <!--新密码-->
    <InputGroup name="password" class="input" :type="type" v-model="formdata.password"
                placeholder="6-16位由字母、数字组成的密码"
                :iTitle="iTitle"
                :iClass="iClass"
                @iClick="viewPassword"
                @inputBlur="validatePassword"
                @inputFocus="clearErrors"
                :error="errors.password"/>
    <InputGroup name="repassword" class="input" type="password" v-model="repassword"
                :error="errors.repassword"
                placeholder="再次输入新密码"
                @inputBlur="validateRepassword"
                @inputFocus="clearErrors"/>
    <!--手机号-->
   <InputGroup name="phone" class="input" type="text" v-model="formdata.phone"
              placeholder="手机号"
              :btnTitle="btnTitle"
              :disabled="disabled"
              :error="errors.phone"
              @btnClick="getVerifyCode"
              @inputFocus="clearErrors"/>
              <!--v-bind动态绑定值获得data中的值再传递给子组件-->
    <!--验证码-->
   <InputGroup  class="input" type="text" v-model="verifyCode"
                placeholder="验证码"
                :error="errors.code"/>
    <el-button type="primary"  style="height:55px;width: 480px;margin-top: 30px;font-size: 17px" @click="submit">确认修改密码</el-button>
  </div>
</template>

<script>
import InputGroup from '../components/inputGroup'
export default {
  name: 'rsetPassword',
  data () {
    return {
      formdata: {
        account: this.$route.query.account, // 接收路由传的参数
        password: '',
        phone: ''
      },
      repassword: '',
      verifyCode: '',
      errors: {},
      btnTitle: '获取验证码',
      type: 'password',
      iTitle: '显示密码',
      iClass: 'el-icon-view',
      disabled: false,
      readonly: true,
      serverCode: ''
    }
  },
  components: {
    InputGroup
  },
  methods: {
    validatePassword: function () {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
      if (!this.formdata.password.replace(/\s+/g, '')) { // 去空格
        this.errors = {
          password: '请输入新密码'
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
          repassword: '请再次输入新密码'
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
    getVerifyCode: function () {
      if (this.validatePhone()) {
        // 从后台获取验证码
        this.serverCode = '123456'
        this.validateBtn()
      }
    },
    validateCode: function () {
      if (!this.verifyCode) {
        this.errors = {
          code: '请输入验证码'
        }
        return false
      } else if (this.verifyCode !== this.serverCode) {
        this.errors = {
          code: '验证码不正确'
        }
        return false
      } else {
        return true
      }
    },
    validateBtn: function () {
      let time = 60
      let timer = setInterval(() => {
        if (time === 0) {
          clearInterval(timer)
          this.btnTitle = '获取验证码'
          this.disabled = false
        } else {
          // 倒计时
          this.btnTitle = time + '秒后重试'
          this.disabled = true
          time--
        }
      }, 1000)
    },
    submit: function () {
      if (this.validatePassword() && this.validateRepassword() && this.validatePhone()) {
        this.validateCode()
        if (this.validateCode()) {
          // 向后台提交数据
        }
      }
    }
  }
}

</script>
<style scoped>
  .reset_form{
    margin: 220px auto;
    padding: 30px 10px;
    width: 500px;
    border:2px solid #a1a1a1;
    border-radius: 15px;
  }
 .input /deep/ .el-input__inner{   /* element-ui样式为全局定义 vue默认全局样式覆盖局部样式
                                    深度选择器改变子组件的el-input样式*/
    border: none;
    outline: none;
  }
</style>
