<template>
  <div>
    <div class="show" v-show="show">
      <Login @hide="hideLogin"></Login>
    </div>
    <div>
      <div class="top-nav">
        <div class="box-center cf">
          <div @click="showLogin" class="sign-out">
            <img src="../assets/loginout.jpg"/>
            <div class="font">登陆</div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="search">
          <el-button>默认按钮</el-button>
          <div class="arrow"></div>
        </div>
        <div>
          <Navlist/>
        </div>
        <div class="right">
          <el-carousel :interval="4000" type="card">
            <el-carousel-item v-for="(img,index) in imgs" :key="index">
              <img :src="img" alt=" ">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navlist from './navlist'
import Login from './login'
export default {
  name: 'index',
  data () {
    return {
      imgs: [
        'https://www.23us.so/files/article/image/3/3574/3574s.jpg',
        'https://www.23us.so/files/article/image/13/13332/13332s.jpg',
        'https://www.23us.so/files/article/image/0/43/43s.jpg',
        'https://www.23us.so/files/article/image/14/14239/14239s.jpg',
        'https://www.23us.so/files/article/image/9/9579/9579s.jpg',
        'https://www.23us.so/files/article/image/17/17795/17795s.jpg'
      ],
      formdata: {},
      show: 0 // 登陆模块默认不显示
    }
  },
  components: {
    Navlist,
    Login
  },
  methods: {
    showLogin: function () {
      if (this.show === 0) {
        this.show = !this.show
      }
    },
    hideLogin: function (data) {
      this.show = 1 ? data : this.show
    }
  }
}
</script>

<style scoped>
  .show{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(219,219,219,0.5);
    /*-webkit-filter: blur(10px); !* Chrome, Opera *!*/
    /*-ms-filter: blur(10px);*/
    /*filter: blur(10px);*/
    z-index: 20;
    border: black;
  }
  .loginform{
    margin: 220px auto;
    padding: 80px 0;
    width: 400px;
    border:2px solid #a1a1a1;
    border-radius: 15px;
    background: url("../assets/timg.jpg") no-repeat -210px -55px;
  }
  .box{
    margin: 0 auto;
    padding: 0;
    width: 70%;
  }
  .top-nav {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #e5e5e5;
    background: #f7f7f7;
  }
  .top-nav>.box-center {
    width: 70%;
    margin: 0 auto;
    border-bottom: 1px solid #e5e5e5;
    background: #f7f7f7;
  }
  .box-center>.sign-out{
    float: right;
    padding: 0;
    height: 35px;
    cursor: pointer;
  }
   img{
    height: 18px;
    width: 18px;
    margin-top: 8px;
  }
   .font {
     height: 35px;
     font-size:15px;
     float: right;
     padding-top: 7px;
   }
  .cf{
    zoom: 1;
  }
  .search{
    float: left;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100px;
    border-bottom:1px solid #f1f1f1f1;
  }
  .arrow{
    display: inline-block;
    border-left:4px solid transparent ;
    border-right:4px solid transparent ;
    border-top:5px solid #e3e3e3 ;
    width: 0;
    height: 0;
    margin-top: -1px;
    margin-left: 6px;
    margin-right: -14px;
    vertical-align: middle;
  }
  .el-carousel{
    height: 350px;
    width: 565px;
    margin: 20px auto;
  }
  .el-carousel__item{
    width: fit-content;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-_itcarousel_em:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel__item img{
    height: 100%;
    width: 280px;
  }
</style>
