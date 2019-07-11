<template>
  <div class="loginform">
    <el-form @submit.prevent="submit" style="z-index: 30">
      <div style="width: 300px;margin: 50px auto">
        <el-input
          type="text"
          name="name"
          v-model="formdata.name"
          prefix-icon="el-icon-s-custom"
          style="width: 300px;height: 20px"
        ></el-input>
        <el-input
          prefix-icon="el-icon-key"
          style="width: 300px;height: 20px;margin: 50px 0"
          type="password"
          name="password"
          v-model="formdata.password"
          show-password
        ></el-input>
      </div>
      <el-button style="width: 300px" @click="hideLogin">登陆</el-button>
      <!--query方式传参 f5强制刷新时参数不丢失-->
      <div><router-link :to="{ name:'resetPassword',query:{username:formdata.name}}">
        忘记密码
      </router-link>
        <span>|</span>
        <a>免费注册</a>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      formdata: {},
      show: 0 // 登陆块是否显示
    }
  },
  methods: {
    hideLogin: function () {
      this.show = 1 ? 0 : this.show
      // 向父组件传值 hide为key 与在父组件中使用子组件时的自定义事件(@hide)同名 第二个参数为值
      this.$emit('hide', this.show)
    }
  }
}
</script>

<style scoped>
  .loginform{
    margin: 220px auto;
    padding: 80px 0;
    width: 400px;
    border:2px solid #a1a1a1;
    border-radius: 15px;
    background: url("../assets/timg.jpg") no-repeat -210px -55px;
  }
</style>
