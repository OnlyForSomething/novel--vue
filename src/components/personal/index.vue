<template>
  <div>
    <div class="home-user-wrapper qdp-border">
      <div class="home-user-avatar" >
        <a href="#" class="user-avatar-a"><img class="user-avatar-img" src="../../assets/default_user.0.1.png" alt="书友xxx的头像" ></a>
        <a href="#" target="_blank" class="home-user-vip icon icon-pt"></a>
      </div>
      <div class="home-user" >
        <div class="qdp-button">
          <a href="#" class="qdp-button-a mlr4" target="_blank" >个人主页</a>
          <a href="# " class="qdp-button-a qdp-button-icon ml12"><i class=" el-icon-s-tools" ></i></a>
        </div>
        <h3><a href="#">书友xxx</a><a href="#" class="home-user-level" >Lv0</a></h3>
        <div class="home-user-safety">
          <a href="#" >安全级别<div class="user-progress-wrapper">
            <div class="qdp-progress-totle">
              <div class="qdp-progress-done" style="width: 0%;"></div>
            </div>
          </div><span class="ml8 highlight">0</span>/100</a>
        </div>
        <div class="home-user-data">
          <span id="elFriendGuide" style="height:56px;display:inline-block;">
            <a href="#" class="mr12" >关注<b class="home-user-b">0</b></a>
            <a href="#" class="mr12 ml12" >粉丝<b class="home-user-b">0</b></a>
          </span>
          <a href="#" class="ml12" data-eid="qd_M29">大神之光<b class="home-user-b">0</b></a></div>
      </div>
    </div>
    <ul class="qdp-border home-msg-wrapper">
      <li class="home-msg" v-for="(item,index) in list"  :key="index">
        <div class="home-msg-title"><i :class="item.icon"></i><b>{{item.title}}</b></div>
        <div class="home-msg-data"><router-link :to="item.link" class="sideBar-list-a"><b class="home-msg-b">{{item.count1}}</b>{{item.msg1}}<span v-if="item.msg2" class="home-msg-num">&nbsp;·&nbsp;{{item.count2}}{{item.msg2}}</span></router-link></div>
        <a class="home-msg-more blue " href="#" >{{item.amsg}}</a>
      </li>
    </ul>
    <div class="qdp-border bg-white mt20" >
      <div class="home-award-title" >
        <h3>每日奖励</h3>完成每日任务获得活跃度,领取相应奖励<a href="#"  class="el-icon-third-wenhao qdp-question"></a>
        <a href="#" class="home-award-a blue">更多奖励»</a>
      </div>
      <div class="home-award-activity" ><a href="javascript:;" class="elTaskButton eltra" ><i class="el-icon-third-fire mr8 highlight"></i>活跃度<span class="ml8 highlight ui-loading" >5</span>/100</a>
        <a href="javascript:;" class="home-award-a blue elTaskButton" >任务进度&nbsp;<span  class="ui-loading">1</span>/9</a>
      </div>
      <div class="home-award-task ui-loading ui-loading-animation" style="height: 188px; transition: height 200ms ease 0s;" >
        <div class="qdp-progress-totle">
          <div class="qdp-progress-done"  style="width: 2%;"></div>
        </div>
        <ul>
          <li class="award-task-item invalid" v-for="(item,index) in task" :key="index">
          <div class="award-task-img qdp-hovertips-wrapper elTaskImg" @mouseover="isCurrentLi(index)" @mouseleave="isLeave">
            <div class="qdp-hovertips" :class="currentLi == index ? '' : 'hide'"> <span >{{item.tips}}</span>
            </div>
          </div>
          <div class="award-task-num">{{task.num}}活跃度可领取</div>
          <span class="award-task-status" >{{task.status}}</span>
        </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      list: [
        {icon: 'el-icon-third-renminbi yellow', title: '账户余额', count1: 0, msg1: '书币', amsg: '充值', link: '#'},
        {icon: 'el-icon-third-piaojia green', title: '我的票夹', count1: 0, count2: 0, msg1: '月票', msg2: '推荐票', amsg: '立即查看', link: '#'},
        {icon: 'el-icon-third-shujia blue', title: '我的书架', count1: 0, msg1: '本藏书', amsg: '立即查看', link: '#'},
        {icon: 'el-icon-third-guanzhu highlight', title: '我的关注', count1: 0, msg1: '个关注', amsg: '立即查看', link: '#'}
      ],
      task: [
        {tips: '开启礼包有机会获得经验值+10,经验值+20,碎片+1', num: '20', status: '未领取'},
        {tips: '开启礼包有机会获得经验值+15,经验值+30,碎片+3', num: '40', status: '未领取'},
        {tips: '开启礼包有机会获得经验值+20,经验值+40,碎片+5', num: '60', status: '未领取'},
        {tips: '开启礼包有机会获得经验值+25,经验值+50,书币+5', num: '80', status: '未领取'},
        {tips: '开启礼包有机会获得经验值+30,经验值+60,书币+10', num: '100', status: '未领取'}
      ],
      currentLi: -1
    }
  },
  methods: {
    isLeave: function () {
      this.currentLi = -1
    }
  }
}
</script>

<style scoped>
  div {
    display: block;
  }
  .home-user-wrapper {
    position: relative;
    margin:  0;
    padding: 58px 0 0 0;
    background: #fff url("../../assets/home-index-bg.0.1.png") no-repeat;
  }
  .home-user-avatar {
    position: relative;
    float: left;
    width: 140px;
    text-align: center;
  }
  .user-avatar-a {
    display: inline-block;
    border-radius: 50%;
  }
  .user-avatar-img {
    width: 100px;
    height: 100px;
    vertical-align: top;
    border: 3px solid #fff;
    border: 3px solid rgba(255,255,255,.5);
    border-radius: 50%;
  }
  .icon-pt {
    background: url("../../assets/sprite.0.2.png") 0 0;
    width: 52px;
    height: 20px;
  }
  .home-user-vip {
    font-size: 12px;
    position: absolute;
    bottom: -7px;
    left: 50%;
    margin: 0 0 0 -25px;
    color: #fff;
    border-radius: 2px;
  }
  .home-user {
    margin: -15px 0 0 140px;
    text-align: left;
  }
  .home-user-wrapper .qdp-button {
    right: 20px;
    margin: 5px 0 0 0;
  }
  .qdp-button {
    position: absolute;
  }
  .qdp-button-a {
    display: inline-block;
    margin: 0 0 0 16px;
    padding: 4px 12px;
    transition: background .15s,border-color .15s;
    color: #fff;
    border: 1px solid #fff;
    border: 1px solid rgba(255,255,255,.5);
    border-radius: 50px;
    background: rgba(0,0,0,.2);
  }
  .qdp-button-a:hover{
    background: #ff3840;
    border: none;
  }
 .home-user h3{
    font-size: 20px;
    font-weight: 600;
    padding: 13px 20px 20px 0;
    color: #fff;
  }
  .mr12 {
    margin-right: 12px;
  }
  .ml12 {
    margin-left: 12px;
  }
  .home-user-b {
    font-family: arial;
    font-size: 20px;
    margin: 0 0 0 8px;
  }
  .mlr4 {
    margin-right: 4px;
    margin-left: 4px;
  }
  a {
    transition: color .3s;
    text-decoration: none;
    color: inherit;
  }
  .qdp-button-icon {
    font-size: 16px;
    /* line-height: 1; */
    padding: 6px;
  }
  .qdp-button-a {
    display: inline-block;
    margin: 0 0 0 16px;
    padding: 4px 12px;
    transition: background .15s,border-color .15s;
    color: #fff;
    border: 1px solid #fff;
    border: 1px solid rgba(255,255,255,.5);
    border-radius: 50px;
    background: rgba(0,0,0,.2);
  }
  .home-user-level {
    font-size: 12px;
    display: inline-block;
    margin: 0 0 0 9px;
    padding: 0 6px;
    vertical-align: .5ex;
    color: #fff;
    border-radius: 2px;
    background: #ee4259;
  }
  .home-user-safety{
    margin-top: -20px;
    line-height:54px;
    border-bottom: 1px solid #e0deda;
    text-align: left;
  }
  .home-user-wrapper .user-progress-wrapper {
    position: relative;
    display: inline-block;
    width: 80px;
    margin: 0 5px 0 8px;
    vertical-align: 1.1ex;
  }
  .qdp-progress-totle {
    position: absolute;
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: #e6e4df;
  }
  .highlight {
    color: #ee4259;
  }
  .home-user-data {
     margin-top: 5px;
     line-height: 54px;
     text-align: left;
   }
  .home-msg-wrapper {
    font-size: 0;
    line-height: 0;
    margin: 20px 0 0 0;
    background: #fff;
  }
  .qdp-border {
    border: 1px solid #e0deda;
    border-radius: 4px;
  }
  .home-msg:first-child {
    border: none;
  }
  .home-msg {
    text-align: left;
    font-size: 14px;
    line-height: 20px;
    display: inline-block;
    box-sizing: border-box;
    width: 25%;
    padding: 20px 20px 0;
    border-left: 1px solid #e0deda;
  }
  .home-msg-title {
    line-height: 16px;
  }
  .yellow {
    color: #ffa100;
  }
  .home-msg-data {
    line-height: 1;
    padding: 12px 0;
    border-bottom: 1px solid #e0deda;
  }
  .home-msg-b {
    font-size: 26px;
    font-weight: 600;
    display: inline-block;
    overflow: hidden;
    max-width: 102px;
    margin: 0 6px 0 0;
    vertical-align: -.4ex;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .home-msg-more {
    display: block;
    margin: 13px 0;
  }
  .blue {
    color: #3f5895;
  }
  .green {
    color: #1ecfa7;
  }
  li, ul {
    padding: 0;
    list-style-type: none;
  }
  ul{
    margin: 0;
  }
  i{
    margin-right: 5px;
  }
  .mt20 {
    margin-top: 20px;
  }
  .bg-white {
    background-color: #fff;
  }
  .home-award-title {
    line-height: 1;
    position: relative;
    padding: 20px;
    color: #7f7f7f;
    border-bottom: 1px solid #e0deda;
  }
  .home-award-title h3 {
    font-size: 18px;
    font-weight: 600;
    display: inline-block;
    margin: 0 8px 0 0;
    color: #3e3d43;
  }
  .qdp-question {
    font-size: 18px;
    margin: 0 8px 0 8px;
    vertical-align: sub;
    color: #7f7f7f;
  }
  .home-award-title .home-award-a {
    bottom: 20px;
  }
  .home-award-a {
    font-weight: 400;
    position: absolute;
    right: 20px;
  }
  .home-award-activity {
    font-weight: 600;
    line-height: 56px;
    position: relative;
    padding: 0 20px;
  }
  .mr8 {
    margin-right: 8px;
  }
  .ml8 {
    margin-left: 8px;
  }
  .ui-loading {
    position: relative;
  }
  .ui-loading-animation {
    -webkit-animation: fadeIn .5s both;
    animation: fadeIn .5s both;
  }
  .home-award-task {
    font-size: 0;
    position: relative;
    margin: 0 20px;
    padding: 0 28px;
    border-top: 1px solid #e0deda;
  }
  .home-award-task .qdp-progress-totle {
    top: 57px;
    left: 0;
  }
  .qdp-progress-done {
    height: 100%;
    border-radius: 3px;
    background: #ee4259;
    background: linear-gradient(to right,#ffd500,#ee4259);
  }
  .award-task-item {
    font-size: 12px;
    position: relative;
    display: inline-block;
    width: 20%;
    padding: 20px 0;
    text-align: center;
  }
  .award-task-item {
    font-size: 12px;
    position: relative;
    display: inline-block;
    width: 20%;
    padding: 20px 0;
    text-align: center;
  }
  .award-task-item.invalid .award-task-img {
    background: #f7f6f2 url("../../assets/home-award-invalid-0.2.png") center no-repeat;
    background: #f7f6f2 url("../../assets/home-award-invalid-0.2.png") center/42px no-repeat;
  }
  .award-task-img {
    display: inline-block;
    width: 76px;
    height: 76px;
    cursor: pointer;
    border: 2px solid #fff;
    border-radius: 50%;
    background: #f7f6f2 url("../../assets/home-award-invalid-0.2.png") center no-repeat;
    background: #f7f6f2 url("../../assets/home-award-invalid-0.2.png") center/42px no-repeat;
  }
  .qdp-hovertips-wrapper {
    position: relative;
  }
  .qdp-hovertips {
    position: absolute;
    top: 80%;
    width: 180px;
    margin: 15px 0 0 -70px;
    padding: 20px;
    background: #fff;
    box-shadow: 0 4px 8px rgba(0,0,0,.2)
  }
  .award-task-num {
    padding: 7px 0;
    color: #7f7f7f;
  }
  .award-task-status {
    font-size: 14px;
    line-height: 20px;
    display: inline-block;
    min-width: 40px;
    padding: 4px 10px;
    color: #7f7f7f;
  }
  .hide{
    display: none;
  }
</style>
