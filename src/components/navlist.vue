<template>
  <div>
    <div  class="nav">
      <ul>
      <li><router-link :to="url.Index"><el-button >首页</el-button></router-link></li>
      <li v-for="(type, index) in types" :key="index">
        <!--<router-link :to="url.types"><el-button>{{type.typeName}}</el-button></router-link>-->
        <!--参数1 name：路由名 参数2 params给动态路由传递的参数-->
        <router-link :to="{ name:'types',params:{type:types[index].typeName}}">
          <el-button>{{type.typeName}}</el-button>
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
        console.log(res)
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
    background: #f1f1f1;
    line-height: 40px;
    width: 180px;
    float: left;
    text-align: center;
    padding: 0;
    margin: 5px 0;
}
  ul{
    list-style: none;
    padding-left:30px;
  }
  li{
    float: left;
    margin: 0 20px;
    letter-spacing: 1em;
  }
</style>
