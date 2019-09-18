<template>
  <div class="loginform">
    <el-form @submit.prevent="submit" style="z-index: 30">
      <div style="width: 300px;margin: 50px auto">
        <el-input
          placeholder="用户名"
          type="text"
          name="name"
          v-model="user.account"
          prefix-icon="el-icon-s-custom"
          style="width: 300px;height: 20px"
          @blur="validateAccount"
        ></el-input>
        <span v-if="ErrMsg.account" class="err" style="margin-top: 19px">{{ErrMsg.account}}</span>
        <el-input
          placeholder="密码"
          prefix-icon="el-icon-key"
          style="width: 300px;height: 20px;margin: 50px 0"
          type="password"
          name="password"
          v-model="user.password"
          @blur="validatePassword"
        ></el-input>
        <span v-if="ErrMsg.password"  class="err" style="margin: -25px 0 0 -148px">{{ErrMsg.password}}</span>
      </div>
      <el-button   style="width: 300px;margin-bottom: 10px"  @click="submit">登陆</el-button>
      <!--query方式传参 f5强制刷新时参数不丢失-->
      <div style="color: #b3d4fc ;font-size: 14px"><router-link :to="{ name:'resetPassword',query:{account:user.account}}">忘记密码</router-link>
        <span>|</span>
       <router-link :to="{name: 'registration'}">免费注册</router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      user: {
        account: this.$route.query.account ? this.$route.query.account : ''
      },
      show: 0, // 登陆块是否显示
      ErrMsg: {
        account: '',
        password: ''
      },
      aes_key: '',
      aes_iv: ''
    }
  },
  created () {
    this.getEncryptParams()
  },
  methods: {
    ...mapMutations(['changeLogin']),
    hideLogin: function () {
      this.show = 1 ? 0 : this.show
      // 向父组件传值 hide为key 与在父组件中使用子组件时的自定义事件(@hide)同名 第二个参数为值
      this.$emit('hide', this.show)
    },
    validateAccount: function () {
      if (this.isEmpty(this.user.account)) {
        this.ErrMsg.account = '*请输入用户名'
        return false
      } else if (!this.isEmpty(this.user.account) && !this.isEmpty(this.ErrMsg.account)) {
        this.ErrMsg.account = ''
        return true
      }
      if (this.ErrMsg.account === '') {
        return true
      }
    },
    validatePassword: function () {
      if (this.isEmpty(this.user.password)) {
        this.ErrMsg.password = '*请输入密码'
        return false
      } else if (!this.isEmpty(this.user.password) && !this.isEmpty(this.ErrMsg.password)) {
        this.ErrMsg.password = ''
        return true
      }
      if (this.ErrMsg.password === '') {
        return true
      }
    },
    submit: function () {
      this.validateAccount()
      this.validatePassword()
      // console.log(this.Encrypt(JSON.stringify(this.user), this.aes_key, this.aes_iv))
      if (this.ErrMsg.account === '' && this.ErrMsg.password === '' && this.aes_key && this.aes_iv) {
        this.$axios.post('api/OAuth', {requestData: this.Encrypt(JSON.stringify(this.user), this.aes_key, this.aes_iv)}, {timeout: 1000 * 60 * 2})
          .then(res => {
            if (res.data.msg) {
              // element Message消息提示
              this.$message({
                showClose: true, // 显示关闭按钮
                message: res.data.msg,
                // customClasss: 'alert', // 自定义css
                type: 'error',
                center: true // 文字居中
              })
            } else {
              console.log(res.data.token)
              this.$router.push('/')
              this.changeLogin({Authorization: res.data.token, authorStatus: 1, account: this.user.account, user_id: res.data.user_id})
              if (this.validatePassword() && this.validateAccount() &&
                this.ErrMsg.account === '' && this.ErrMsg.password === '') {
                this.hideLogin()
              }
              // console.log(this.$store.getters.account)
            }
            // console.log(res.status)
          })
          // .catch(function (error) {
          //   if (error.response) {
          //   // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          //     console.log(error.response.data)
          //     console.log(error.response.status)
          //     console.log(error.response.headers)
          //   }
          // })
          .catch(error => {
            console.log(error)
            if (error.response.status && error.response.status === 504) {
              this.$message({
                showClose: true, // 显示关闭按钮
                message: '服务器出错,请稍后重新登陆',
                type: 'error',
                center: true // 文字居中
              })
            } else {
              this.$message({
                showClose: true, // 显示关闭按钮
                message: error.response.data.msg,
                type: 'error',
                center: true // 文字居中
              })
            }
          })
      }
    }
  }
}
</script>

<style scoped>
  .loginform{
    margin: 215px auto;
    padding: 80px 0 60px  0;
    width: 400px;
    border:2px solid #a1a1a1;
    border-radius: 15px;
    background: url("../assets/timg.jpg") no-repeat -210px -55px;
  }
  a{
    color:#b3d4fc;
  }
  a:hover{
    color: blue;
  }
  .err{
    position: absolute;
    color: red;
    font-size: 16px;
  }
</style>
