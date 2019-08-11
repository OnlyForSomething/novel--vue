<template>
<div class="reset_form">
  <InputGroup name="account" class="input"  v-model="user.account"
              placeholder="用户名"
              @inputBlur="validateAccount"
              @inputFocus="clearErrors"
              :error="errors.account"/>
  <InputGroup name="password" class="input" :type="type" v-model="user.password"
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
  <InputGroup name="phone" class="input"  v-model="user.phone"
              placeholder="本人使用中的手机号码"
              @inputBlur="validatePhone"
              @inputFocus="clearErrors"
              :error="errors.phone"/>
  <InputGroup name="email" class="input"  v-model="user.email"
              placeholder="邮箱"
              @inputBlur="validateEmail"
              @inputFocus="clearErrors"
              :error="errors.email"/>
   <div class="agreement">注册即同意<a>《用户服务协议》</a></div>
  <el-button type="primary"  style="height:55px;width: 480px;margin-top: 20px;font-size: 17px" @click="register">注册</el-button>
</div>
</template>

<script>
import InputGroup from '../components/inputGroup'
export default {
  name: 'registration',
  data () {
    return {
      user: {
        account: '',
        password: '',
        phone: '',
        email: ''
      },
      repassword: '',
      errors: {},
      type: 'password',
      iTitle: '显示密码',
      iClass: 'el-icon-view',
      disabled: false
    }
  },
  components: {
    InputGroup
  },
  methods: {
    register: function () {
      if (this.validateAccount() && this.validatePassword() && this.validateRepassword() && this.validatePhone() && this.validateEmail()) {
        // 向后台提交数据
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
  .agreement{
    margin-top: 20px;
    font-size: 10px;
  }
  a:hover{
    color: red;
    cursor: pointer;
  }
</style>
