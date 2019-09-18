<template>
  <div>
    <div  class="nav">
      <ul>
      <!--<li><router-link :to="url.Index">首页</router-link></li>-->
      <li v-for="(type, index) in types" :key="index" style="display: inline-block">
        <!--<router-link :to="url.types"><el-button>{{type.typeName}}</el-button></router-link>-->
        <!--参数1 name：路由名 参数2 params给动态路由传递的参数-->
        <router-link :to="{ name:'types',params:{type:types[index].typeName}}">
        <div class="kind">
        <cite>
          <em :class="type.typeIcon"></em>
          <span class="info">
            <i>{{type.typeName}}</i>
            <b>4343464</b>
          </span>
        </cite>
        </div>
        </router-link>
        <span hidden>{{index}}</span>
      </li>
     </ul>

      <div class="clearfloat"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navlist',
  data () {
    return {
      url: {
        Index: '/',
        types: '/types'
      },
      types: [ ]
    }
  },
  created () {
    this.$axios.get('api/types')
      .then(res => {
        this.types = res.data
        // console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {

  }
}
</script>

<style scoped>
 .nav{
    background: #f7f6f2;
    border: 1px #dbdbdb solid;
    width:218px;
    float: left;
    text-align: center;
    padding: 0;
    margin:  -1px 0 0 0;
}
  ul{
    display:inline;
    list-style: none;
    padding:0;
  }
  li{
    display: inline;
    float: left;
    /*letter-spacing: 1em;*/
    height: 65px;
    width: 84px;
    padding-left: 20px;
    margin-top: 8px;
  }
 li:nth-child(2n){
   padding-right: 9px;
 }
 li:nth-child(3),li:nth-child(4),li:nth-child(7),li:nth-child(8),li:nth-child(11),li:nth-child(12){
   background: #fcfcfa;
 }
 .kind:hover b{ /*只依赖color的继承是不行的。继承样式相对于定义在元素本身上的样式，优先级更低,
                  要在悬停时改变本身字体颜色需要继续使用层级选择器*/
    color: red;
  }
 .kind:hover {
   color: red;
 }
 em {
   float: left;
   width: 30px;
   height: 25px;
   margin: 15px 3px 0 0;
   text-align: right;
   /*transition: margin ease-out .3s;*/
 }
 .kind:hover em{
   transition: 0.3s;
   text-align: left;
 }
 .info{
   float: left;
   max-width: 42px;
   max-height: 50px;
   padding: 0;
   margin: 10px 11px 0 0;
 }
 .info>i {
   font-size: 14px;
   display: block;
   cursor: pointer;
   text-align: left;
   padding: 0;
 }
 .info>b {
    font: 12px/1.5 Arial;
    color: #999;
    float: left;
    width: 40px;
  }
 a:link,a:visited{
   color:#444;
   text-decoration:none;
 }
</style>
