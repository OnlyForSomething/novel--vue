<template>
  <div style="background: #f7f6f2;height: 100%;width: 100%; overflow-scrolling: auto">
    <div class="box">
      <el-container>
        <el-header>Header</el-header>
        <el-container>
          <el-aside width="174px">
            <ul>
              <!--给当前点击的li添加active样式 currentLi初始为1 即页面加载默认为第一个li添加active样式
                  通过点击事件将当前li的index赋值给currentLi，即当前点击li有active样式
                  其它index与currentLi不等的li的class=''-->
              <li :class="currentLi == index ? 'active' : ''" @click="isCurrentLi(index)"
                  v-for="(li, index) in list" :key="index">
                  <router-link :to="li.link" class="sideBar-list-a"><i :class="li.icon"></i>{{li.name}}</router-link>
                <span hidden>{{index}}</span>
              </li>
            </ul>
          </el-aside>
          <el-main><router-view/></el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homepage',
  data () {
    return {
      list: [
        {name: '首页', link: '/homepage/personalIndex', icon: 'el-icon-s-home'},
        {name: '账务中心', link: '/homepage/financialCenter', icon: 'el-icon-coin'},
        {name: '我的票夹', link: '/homepage/#', icon: 'el-icon-third-piaojia'},
        {name: '我的书评', link: '/homepage/#', icon: 'el-icon-chat-dot-round'},
        {name: '经验值等级', link: '/homepage/#', icon: 'el-icon-third-jingyanzhi'},
        {name: '任务', link: '/homepage/#', icon: 'el-icon-third-renwu'},
        {name: '徽章/称号/认证', link: '/homepage/#', icon: 'el-icon-third-huizhang'},
        {name: '会员中心', link: '/homepage/#', icon: 'el-icon-third-V'},
        {name: '安全中心', link: '/homepage/#', icon: 'el-icon-third-anquan'},
        {name: '作家专区', link: '/homepage/#', icon: 'el-icon-third-gangbijian'}
      ],
      currentLi: 0
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .box{
    margin: 0 auto;
    padding: 0;
    width: 990px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 20px;
  }
  .el-header {
    background: url("https://bossaudioandcomic-1252317822.file.myqcloud.com/activity/document/115f9777b15c599841c94b0e9d851663.jpg");
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    text-align: left;
    margin: 20px 40px 0 0;
    padding-top: 0;
  }
  .sideBar-group {
    margin: 0 0 20px;
  }
 .sideBar-list-a {
    display: block;
    overflow: hidden;
    padding: 0 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-radius: 4px;
  }
  .active {
    font-weight: 600;
    color: #ee4259;
    border: 1px solid #e0deda;
    background: #fff;
  }
  a {
    transition: color .3s;
    text-decoration: none;
    color: inherit;
  }
  li {
    font-size: 14px;
    line-height: 36px;
    position: relative;
    cursor: pointer;
    color: #3e3d43;
    border: 1px solid transparent;
    border-radius: 4px;
  }
  li:nth-child(4),li:nth-child(7),li:nth-child(10){
    margin: 0 0 20px;
  }
  li:hover{
    background: white;
  }
  li, ul {
    padding: 0;
    list-style-type: none;
  }
  ul{
    margin: 0;
  }
  i{
    margin-right: 10px;
  }
  .el-main {
    color: #333;
    margin: 20px 0 0 0;
    padding: 0;
    text-align: left;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>
