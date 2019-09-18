<template>
  <div>
    <div class="show" v-if="show"><!-- v-if根据条件是否为真判断是否创建 v-show先创建根据条件是否为真判断是否显示 -->
      <Login @hide="hideLogin"></Login>
    </div>
    <div>
      <div class="top-nav">
        <div class="box-center cf">
          <!--未登陆显示-->
          <div v-if="!this.$store.getters.authorStatus" @click="showLogin" class="sign-out">
            <img src="../assets/loginout.jpg"/>
            <div class="font">登陆</div>
          </div>
          <!--登陆后显示 this.$store.getters.authorStatus为是否登陆的状态，保存在vuex的store中 -->
          <div v-if="this.$store.getters.authorStatus" class="sign-out">
            <div class="font">您好,书友
              <router-link :to="{name: 'homepage'}">{{this.$store.getters.account}}</router-link>
              <span>&nbsp;|&nbsp;</span>
              <!--<router-link :to="{name: 'index'}"><span @click="exit">[退出]</span></router-link>-->
              <router-link :to="{name: 'index'}" @click.native="exit">[退出]</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="box-top">
          <div class="search">
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="keyqords"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            placeholder=""
            @select="handleSelect">
            <template slot-scope="{ item }" >
              <div class="name">{{ item.value}}</div><span class="aut">{{ item.author}}</span>
            </template>
          </el-autocomplete>
            <label class="search-btn" ><em class="el-icon-third-sousuo"></em></label>
          </div>
          <!--<div class="arrow"></div>-->
        </div>
          <div class="top-contain">
            <div class="left">
              <Navlist/>
            </div>
            <div class="middle">
              <div class="carousel-box">
                <el-carousel trigger="click" indicator-position="outside" arrow="never" :autoplay="false"> <!--:autoplay="false"  在autoplay前加上冒号获取的值不为string  -->
                <el-carousel-item v-for="(item,index) in carousel_item" :key="index" :label = "item.title">
                  <a><img :src="item.img" alt=" "></a>
                </el-carousel-item>
              </el-carousel>
            </div>
              <div class="adv-box">
                <ul>
                  <li v-for="(item,index) in adv" :key="index" class="adv">
                    <a><img :src="item.img"></a>
                    <span class="op-tag"></span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="right">
              <div class="notice">
                <h4>网络文学优秀作品联展</h4>
                <ul>
                  <li v-for="(item,index) in notice" :key="index" class="content">
                   <a>
                     <i>「</i>{{item.kind}}<i>」</i>
                     {{item.content}}
                   </a>
                  </li>
                </ul>
                <ul style="margin-top: 25px">
                  <li v-for="(item,index) in games" :key="index" class="games">
                    <a>
                      <i>{{item.kind}}</i>
                      <span>{{item.content}}</span>
                    </a>
                  </li>
                </ul>
                <ul>
                  <li class="broadcast">
                    <i class=" el-icon-third-gonggao"></i>
                    <div class="broadcast-contain" ref="affiche">
                      <div class="affiche_text" id="affiche_text" >
                        <!--展示的文字-->
                        <div style="margin-right: 16px">滚动广播内容~滚动广播内容~滚动广播内容~滚动广播内容</div>
                        <!--文字副本，为了实现无缝滚动-->
                        <div id="copy" style="display: inline;float: left"></div>
                      </div>
                    </div>
                    <!--/*为了获取text实际宽度*/-->
                    <div id="node" class="node" >滚动广播内容~滚动广播内容~滚动广播内容~滚动广播内容</div>
                  </li>
                </ul>
              </div>
              <div class="right-ad">
                <a><img src="https://bossaudioandcomic-1252317822.file.myqcloud.com/activity/document/261b7205ccd46270a21cc862542029cb.jpg"></a>
                <span class="op-tag"></span>
              </div>
            </div>
          </div>
        <div class="box-bottom">
          <div class="bot-left">
            <h4>本周强推
              <span class="more"><a>更多 ></a></span></h4>
            <ul>
              <li v-for="(item,index) in hot_novels" v-if="index < 17" :key="index" class="hot-list">
                 <i>「<a>{{item.novelType}}</a>」</i>
                <a><span>{{item.novelName}}</span></a>
                <a class="author">{{item.author}}</a>
              </li>
              <li class="hot-list">
                <i>「<a>页游</a>」</i>
                <a><span>猛将传说</span></a>
                <a class="author">广告</a>
              </li>
            </ul>
          </div>
          <div class="bot-center">
            <h4>编辑推荐
              <span class="more"><a>更多 ></a></span></h4>
            <div class="center-top">
              <div class="card">
                <el-carousel :interval="4000" type="card" height="150px"
                             indicator-position="outside"
                             @change="cardInfo">
                <el-carousel-item v-for="(card,index) in cards" :key="index">
                  <img :src="card.img">
                </el-carousel-item>
              </el-carousel>
            </div>
              <div class="card-info">
                <h4><a>{{card_info.title}}</a></h4>
                <div class="introduction">{{card_info.brief_introduction}}</div>
                <div class="details_btn">
                  <a>书籍详情</a>
                </div>
               </div>
            </div>
            <div class="center-bot">
              <ul>
                <li v-for="(item,index) in recommend" v-if="index < 6" :key="index">
                  <span><a>{{item.title}}</a></span>
                  <span class="fans"><b>{{item.fans|NumFormat}}</b><i>人在追</i></span>
                  <div class="introduce">{{item.brief_introduction}}</div>
                </li>
              </ul>
                <div class="one">
                  <a><b>{{ recommend[6].title}}</b></a>
                  <div class="introduce">{{ recommend[6].brief_introduction}}</div>
                  <div class="img">
                    <a><img  :src=" recommend[6].img"/></a>
                  </div>
                </div>
                <div class="one">
                  <a><b style=" color: #0060bf;">{{ recommend[7].title}}</b></a>
                  <div class="introduce">{{ recommend[7].brief_introduction}}</div>
                  <div class="img">
                    <a><img  :src=" recommend[7].img"/></a>
                  </div>
                </div>
            </div>
          </div>
          <div class="bot-right">
            <h4>网文新风
              <span class="more"><a>更多 ></a></span></h4>
            <ul>
              <li v-for="(item,index) in hot_novels" v-if="index > 17 && index < 35" :key="index" class="hot-list">
                <i>「<a>{{item.novelType}}</a>」</i>
                <a><span>{{item.novelName}}</span></a>
                <a class="author">{{item.author}}</a>
              </li>
              <li class="hot-list">
                <i>「<a>页游</a>」</i>
                <a><span>九曲封神宇宙</span></a>
                <a class="author">广告</a>
              </li>
            </ul>
          </div>
          <div class="bot-adv">
            <a><img src="https://qidian.qpic.cn/qidian_common/349573/0199d54527c9e85b9482229746a0dcb4/0"/></a>
            <span class="op-tag"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navlist from './navlist'
import Login from './login'
import {mapMutations} from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      carousel_item: [
        {'img': 'https://bossaudioandcomic-1252317822.file.myqcloud.com/activity/document/98002b8060b7ec160e344bcfc2295096.jpg',
          'title': '榜样照亮前行路'},
        {'img': 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/8934fe645de9db20ed138160b4380a99.jpg',
          'title': '创造游戏世界'},
        {'img': 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/7a858f8f91b578d9cc41bffcb8c98bf7.jpg',
          'title': '奋斗在洪武末年'},
        {'img': 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/956e2a4928f9087c99554e4a78b6750a.jpg',
          'title': '英雄联盟'},
        {'img': 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/28d407bf3ea40d7351143ecb2576f975.jpg',
          'title': '暗黑大天使'}
      ],
      adv: [
        {'img': 'https://qidian.qpic.cn/qidian_common/349573/77fe21a95812aa75cff6255563788282/0',
          'link': '#'},
        {'img': 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/731324f9bd3a9ff73e59be7b8c421b8f.png',
          'link': '#'},
        {'img': 'https://qidian.qpic.cn/qidian_common/349573/bd326aea6e0a7ca656ed6a4011745b90/0',
          'link': '#'}
      ], // 广告
      notice: [
        {'kind': '公告', 'content': '关于举报志愿者招募事项'},
        {'kind': '公告', 'content': '关于xxx的xxx'},
        {'kind': '公告', 'content': '关于xxx的xxx'},
        {'kind': '资讯', 'content': '网络举报知识有奖竞赛'},
        {'kind': '资讯', 'content': '四川站星学院开班啦'},
        {'kind': '资讯', 'content': '关于xxx的xxx'}], // 公告 资讯
      games: [
        {'kind': '页游', 'content': '暗黑大天使2'},
        {'kind': '页游', 'content': '美人计之后宫计'}], // 公告资讯栏游戏推荐
      hot_novels: [], // 本周强推 网文新风
      cards: [
        { 'img': 'https://bookcover.yuewen.com/qdbimg/349573/1015154561/90',
          'title': '建造狂魔',
          'brief_introduction': '咱们一起去搬砖吧，等赚了钱，再包个小工地，然后全球建造集团成立了……',
          'novel_id': ''
        },
        { 'img': 'https://bookcover.yuewen.com/qdbimg/349573/1015056750/90',
          'title': '我可以无限强化',
          'brief_introduction': '是/否——分解【朱雍】分解成功，获得衣服x1、武器碎片x10、饰品碎片x20，‘烈火掌',
          'novel_id': ''
        },
        { 'img': 'https://bookcover.yuewen.com/qdbimg/349573/1015490320/90',
          'title': '花掉1000000亿',
          'brief_introduction': '终极任务：花掉100000000000000元，奖励神秘果实and技能书',
          'novel_id': ''
        },
        { 'img': 'https://bookcover.yuewen.com/qdbimg/349573/1015990091/90',
          'title': '烂柯棋缘',
          'brief_introduction': '一觉醒来，成了一个破旧山神庙中的半瞎乞丐。',
          'novel_id': ''
        },
        { 'img': 'https://bookcover.yuewen.com/qdbimg/349573/1014988550/90',
          'title': '我能看见经验值',
          'brief_introduction': '一觉醒来，整个世界都变了！眼睛左上角的光屏，成为了他唯一的依靠。',
          'novel_id': ''
        },
        { 'img': 'https://bookcover.yuewen.com/qdbimg/349573/1013452763/90',
          'title': '我家有个仙侠世界',
          'brief_introduction': '卧室里突然出现了一座通向仙侠世界的传送门！',
          'novel_id': ''
        },
        { 'img': 'https://bookcover.yuewen.com/qdbimg/349573/1011489683/90',
          'title': '谍影风云',
          'brief_introduction': '机缘巧合回到了1936年，寻找地下组织，追查间谍，在波澜壮阔的大时代中，开始了他传奇的谍海生涯。',
          'novel_id': ''
        }
      ], // 编辑推荐 轮播图card
      user: {},
      show: 0, // 登陆模块默认不显示
      suggestions: [],
      keyqords: '',
      card_info_index: 0,
      card_info: '',
      recommend: [
        {
          'title': '修真聊天群',
          'brief_introduction': '意外加群，然而……群里每一个群员，竟然全部是修真者，能移山倒海、的那种！',
          'fans': 3836850
        },
        {
          'title': '修炼了金钟罩，金钟罩+1',
          'brief_introduction': '你修炼了九阳神功，感觉不足，强化为九阳神功+1',
          'fans': 16004
        },
        {
          'title': '漫威世界当医生',
          'brief_introduction': '来到美漫世界，在危机四伏之中，经营一家小医馆',
          'fans': 25952
        },
        {
          'title': '穿异界山野，开始求生之旅',
          'brief_introduction': '穿越异界山野，打造梦想家园，品杯香茗，观湖光山色，种几亩山田……岂不快',
          'fans': 9743
        },
        {
          'title': '穿越到怪异恒生的诡秘世界',
          'brief_introduction': '穿越变身小沙弥，谈陌发现自己脑海中竟然多了个进度条！',
          'fans': 25154
        },
        {
          'title': '有加隆才是真大佬',
          'brief_introduction': '在魔法界里做条有梦想的咸鱼',
          'fans': 31886
        },
        {
          'title': '烂柯棋缘',
          'brief_introduction': '一觉醒来，成了一个破旧山神庙中的半瞎乞丐。',
          'fans': 31886,
          'img': 'https://bookcover.yuewen.com/qdbimg/349573/1015990091/90'
        },
        {
          'title': '漫威世界的光之巨人',
          'brief_introduction': '以奥特曼之力降临漫威世界，吊打灭霸！',
          'fans': 31886,
          'img': 'https://bookcover.yuewen.com/qdbimg/349573/1015910502/90'
        }
      ], // 编辑推荐 列表
      textWidth: ''// 滚动字幕宽度
    }
  },
  components: {
    Navlist,
    Login
  },
  created () {
    this.$axios.get('api/novels')
      .then(res => {
        // console.log(res.data)
        this.hot_novels = res.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    ...mapMutations(['clearStatus']),
    showLogin: function () {
      if (this.show === 0) {
        this.show = !this.show
      }
    },
    hideLogin: function (data) {
      this.show = 1 ? data : this.show
    },
    exit: function () {
      console.log('退出')
      this.clearStatus()
    },
    querySearch (queryString, cb) {
      var suggestions = this.suggestions
      var results = queryString ? suggestions.filter(this.createFilter(queryString)) : suggestions
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (suggestion) => {
        return (suggestion.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    handleSelect (item) {
      console.log(JSON.stringify(item) + '1231232')
      console.log(this.keyqords)
    },
    // handleIconClick (ev) {
    //   console.log(ev)
    // },
    cardInfo: function (val) { /* val为 Carousel Events@change传递的参数 详见\node_modules\element-ui\packages\carousel\src\main.vue的activeIndex(val, oldVal)方法 */
      this.card_info_index = val
      this.card_info = this.cards[this.card_info_index]
    },
    marquee: function () { // 广播内容横向滚动方法
      let textWidth = parseInt(this.textWidth)
      console.log(textWidth)
      let aff = document.getElementById('affiche_text')
      let copy = document.getElementById('copy')
      copy.innerText = '滚动广播内容~滚动广播内容~滚动广播内容~滚动广播内容'// 文字副本填充
      let i = 0
      setInterval(function () {
        i = i - 1
        // 如果位移超过(展示内容+展示内容的copy+两者之间的间隔)宽度，则回到起点
        if (-i >= (textWidth * 2 + 16)) {
          i = 0
        }
        aff.style.transform = 'translateX(' + i + 'px)'
        // aff.animate({'left': i + 'px'}, 20)
      }, 50)
    }
  },
  mounted () { // 页面加载完成后执行
    this.$axios.get('api/novels/suggestions')
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          this.suggestions.push({'value': res.data[i].novelName, 'author': res.data[i].author})
        }
        // console.log(this.suggestions)
        // this.suggestions = res.data
      })
      .catch(error => {
        console.log(error)
      })
    this.card_info = this.cards[this.card_info_index]
    this.textWidth = document.getElementById('node').getBoundingClientRect().width
    this.marquee()
  }
}
</script>

<style scoped>
  a:hover{
    cursor: pointer;
  }
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
    width: 1200px;
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
  .box-center img{
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
  .box-top{
    float: left;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100px;
    border-bottom:1px solid #f1f1f1f1;
  }
  .search{
    position: relative;
    width: 405px;
    height: 50px;
    border: 1px #dbdbdb solid;
    margin: 30px auto;
    padding: 0;
  }
  .search /deep/ .el-input__inner{   /* element-ui样式为全局定义 vue默认全局样式覆盖局部样式
                                    深度选择器改变子组件的el-input样式*/
    position: absolute;
    float: left;
    border:1px solid hsla(0,0%,0%,0);
    background-clip: padding-box; /*   背景被裁剪到内边距框 */
    outline: none;
    height: 30px;
    width:355px;
    margin:-4px 0 0 -203px;
  }
  /*.search /deep/ .el-autocomplete-suggestion li{*/
    /*float: left;*/
  /*}*/
  /*.search /deep/ .el-popper .popper__arrow{*/
    /*display: none;*/
  /*}*/
  .name{
    float: left;
    width: fit-content;
    margin-right: 15px;
  }
  .aut{
    float: left;
    width:fit-content;
    font-size: 12px;
    color: #b3b3b3;
  }
  .search>.search-btn {
    position: absolute;
    border:none;
    float: right;
    width: 51px;
    height: 50px;
    text-align: center;
    background-color: #bf2c24;
    cursor: pointer;
    margin-left: 152px;
  }
  .search-btn:hover{
    background-color: #ed4259;
  }
  /*.arrow{*/
    /*display: inline-block;*/
    /*border-left:4px solid transparent ;*/
    /*border-right:4px solid transparent ;*/
    /*border-top:5px solid #e3e3e3 ;*/
    /*width: 0;*/
    /*height: 0;*/
    /*margin-top: -1px;*/
    /*margin-left: 6px;*/
    /*margin-right: -14px;*/
    /*vertical-align: middle;*/
  /*}*/
  .carousel-box{
    float: left;
    width: 724px;
    padding-left: 10px;
  }
  .carousel-box /deep/ .el-carousel{
    width: inherit;
  }
  .carousel-box /deep/ .el-carousel__item{
    width: fit-content;
    cursor: pointer;
  }
  .carousel-box /deep/ .el-carousel__button{
    font-size: 14px;
    margin: 0;
    width: 144px;
    height:35px;
    color: white;
    overflow: hidden;
  }
  .carousel-box /deep/ .el-carousel__indicators--labels .el-carousel__indicator:last-of-type{
    border: none;
  }
  .carousel-box /deep/ .el-carousel__indicators--labels .el-carousel__indicator{
    padding: 0;
    margin: 0;
    border-right: white 1px solid;
  }
  .carousel-box /deep/ .el-carousel__indicators--outside button{
    background-color: #bf2c24;
  }
  .el-carousel__item img{
    height: 100%;
    width: 100%;
  }
  .adv-box{
    float: left;
    height: 175px;
    padding: 0;
    /*border: 1px solid;*/
    margin-left: 10px;
  }
  ul{
    list-style: none;
  }
  ul,li{
    margin: 0;
    padding: 0;
  }
  i{
    margin: 0;
    font-style: normal;
  }
  .adv{
    position: relative;
    margin: 0;
    float: left;
    width: 241px;
    height: 177px;
    overflow: hidden;
  }
  .adv:hover{
    box-shadow: -5px 5px 20px #bfbeba
  }
  .adv img{
    width: 98%;
    height:98%;
  }
  .op-tag {
    position: absolute;
    z-index: 5;
    right: 4px;
    bottom: 4px;
    width: 24px;
    height: 14px;
    background: url(".././assets/op_tag.png") no-repeat;
  }
  .right {
    display: inline-block;
    width: 233px;
    height: fit-content;
  }
  .notice{
    width: 233px;
    height:301px;
    margin: 8px 0 0 5px;
    padding: 12px 0;
    background: #f7f6f2;
    border: 1px #dbdbdb solid;
    overflow: hidden;
  }
  .notice h4{
    margin: 0;
    padding: 0;
    font-weight: bold;
  }
  .notice h4:hover{
    cursor: pointer;
    color: #bf2c24;
  }
  .content{
    text-align: left;
    margin: 10px 5px 0 5px;
    font-size: 14px;
  }
  .content:hover{
    color: #bf2c24;
  }
  .content i{
    margin: 0;
    font-style: normal;
  }
  .games{
    text-align: left;
    margin: 10px 5px 0 14px;
    font-size: 14px;
  }
  .games:hover span{
    color: #bf2c24;
  }
  .games i{
    font-size: 12px;
    background: #bf2c24;
    color: white;
    padding: 3px 7px;
    margin-right: 10px;
  }
  .broadcast{
    margin: 15px 5px 0 14px;
    text-align: left;
  }
  .broadcast i{
    float: left
  }
  .broadcast-contain{
    display: block;
    position: relative;
    float: left;
    margin: -2px 0 0 3px;
    font-size: 14px;
    height: 16px;
    width: 184px;
    /*white-space:nowrap; !* 文字不换行*!*/
    overflow: hidden;
  }

  .affiche_text {
    float: left;
    position: absolute;
    width: 800%;
    /*line-height: 30px;*/
    display: block;
    word-break: keep-all;
    white-space: nowrap;
  }
  /*.affiche_text:hover{*/
     /*transform:translateX(0px) ;*/
  /*}*/
  .affiche_text div{
    float: left;
  }
  .node{ /* 用于获取滚动字幕的内容的宽度 不能设置display：none 否则获取到的宽度为0*/
    font-size: 14px;
    position: absolute;
    z-index: -999;
    top: -999999px;
  }
  .right-ad{
    position: relative;
    margin: 2px 0 0 5px;
    width:235px ;
    height: 166px;
  }
  .right-ad img{
    margin-top: 8px;
    width: 100%;
    height: 100%;
  }
  .right-ad .op-tag {
      right: 4px;
      bottom: -5px;
    }
  .box-bottom{
    height: 660px;
    width: 1200px;
    margin: 40px 0 10px 0;
    padding: 0;
    /*border: 1px solid black;*/
  }
  .bot-left{
    width:218px;
    float: left;
    padding: 0;
    margin:  0;
  }
  .bot-left h4,.bot-right h4, .bot-center h4{
    width:218px;
    margin: 0;
    padding: 5px 0;
    border-bottom:1px solid black ;
    text-align: left;
  }
  .bot-left h4>span,.bot-right h4>span,.bot-center h4>span{
    display: none;
    font-size: 10px;
    color: rgba(0, 0, 245, 0.63);
  }
  .bot-left h4:hover span, .bot-right h4:hover span, .bot-center h4:hover span{
    display:inline-block;
  }
  .hot-list{
    width:218px;
    float: left;
    font-size: 14px;
    border-top: 1px #dbdbdb solid ;
    margin:  0;
    padding: 5px 0;
  }
  .hot-list:first-of-type{
    border: none;
  }
  .hot-list a:hover, i:hover a{
    color:red;
  }
  .hot-list i{
    color: #8c8c8c;
    /*text-align: left;*/
    float: left;
    margin: 2px 0 0 -8px;
  }
  .hot-list span{
    padding: 0;
    float: left;
    font-weight: 300;
    margin:3px 0 0 -3px;
  }
  .author{
    padding: 0;
    font: 8px/24px PingFangSC-Regular,'-apple-system',Simsun;
    float: right;
    overflow: hidden;
    text-align: right;
    white-space: normal;
    text-overflow: ellipsis;
    color: #b3b3b3;
  }
  .bot-center{
    float: left;
    width: 692px;
    margin-left: 51px;
  }
  .bot-center h4{
    width:650px;
  }
  .bot-center a:hover{
    color: red;
  }
  .center-top{
    float: left;
    width: 620px;
    border-bottom: 1px #dbdbdb solid ;
    /*border: solid 1px black;*/
    padding: 30px 0 5px 30px;
  }
  .card{
    float: left;
    width: 223px;
    /*border: solid 1px black;*/
  }
  .card /deep/ .el-carousel__item--card{
    width: 50%;
  }
  .card /deep/ .el-carousel__arrow {
    height: 30px;
    width: 30px;
    background-color: rgba(15, 18, 30, 0.42);
    font-size: 20px;
    color:white;
  }
  .card /deep/ .el-carousel__arrow:hover{
    color: #bf2c24;
  }
  .card /deep/ .el-carousel__arrow--right {
     right:0;
   }
  .card /deep/ .el-carousel__arrow--left {
    left:0;
  }
  .card /deep/ .el-carousel__button{
    padding: 0;
    margin: 0;
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }
  .card /deep/ .el-carousel__button{
    border: #bf2c24  solid 1.5px;
    background: rgba(255, 255, 255, 0);
  }
  .card-info{
    float: left;
    width: 350px;
    height: 160px;
    margin: 16px 0 0 42px;
    padding: 0;
    /*border: solid 1px black;*/
  }
  .card-info h4{
    width: 350px;
    margin: -7px 0 0 0 ;
    padding: 0;
    border: none;
    font-size: 18px;
  }
  .introduction{
    width: 350px;
    height: 80px;
    margin: 15px 0 6px 0;
    padding: 0 ;
    text-align: left;
    font-style: inherit;
    font-size: 14px;
    line-height: 28px;
    /*border: 1px solid black;*/
  }
  .details_btn{
    background: #bf2c24;
    border:1px solid #bf2c24;
    width:  98px;
    height: 26px;
    border-radius: 20px;
    font-size: 15px;
    color:#fff;
    text-align: center;
    margin: 3px 0 0 0;
    padding: 3px 0 0 0;
  }
  .details_btn:hover{
    color:#fff;
    border:1px solid #ed4259;
    background:#ed4259
  }
  .details_btn:hover a{
    color: #fff;
  }
  .center-bot{
    width: 650px;
    height: 366px;
    /*border: 1px solid black;*/
    margin-top: 1px;
    float: left;
  }
  .center-bot li{
    float: left;
    width: 210px;
    height:122px;
    margin: 15px 0;
    padding: 0;
    text-align: left;
  }
  .center-bot li:nth-child(3n+2){
    padding: 0 10px;
  }
  .center-bot li:nth-child(1),  .center-bot li:nth-child(2),  .center-bot li:nth-child(3){
    border-bottom: 1px #dbdbdb solid;
    margin-top: 30px;
  }
  /*.center-bot a:hover{*/
    /*color: red;*/
  /*}*/
  .fans{
    float: left;
    width: 215px;
    display: block;
    color:#bf2c24 ;
    margin: 3px 0;
  }
  .fans i{
    font-size: 12px;
    margin-left: 3px;
  }
  .introduce{
    font-size: 12px;
    color: #8c8c8c;
  }
  .one{
    float: left;
    width: 290px;
    height: 75px;
    background: #f7f6f2;
    margin-top: -13px;
    padding: 10px;
  }
  .one:hover{
    box-shadow: -5px 5px 20px #bfbeba
  }
  .one b{
    margin-bottom: 10px;
    color: #fc6c28;
    float: left;
    width: 230px;
    text-align: left;
  }
  .one .introduce{
    font-size: 12px;
    color: #8c8c8c;
    width: 230px;
    text-align: left;
    float: left;
  }
  .one:first-of-type{
    margin-right: 25px;
  }
  .one .img{
    float: left;
    width: 50px;
    height: 70px;
    margin: -28px 0 0 8px;
    overflow: hidden;
  }
  .img img{
    width: 100%;
    height: 100%;
  }
  .img img:hover{
    transition: all 1s;
    transform: scale(1.2); /* 鼠标放到图片上的时候图片按比例放大1.5倍   */
  }
  .bot-right{
    width:232px;
    float: right;
    padding: 0;
    margin:  0;
  }
  .bot-right .hot-list{
    width: 232px;
  }
  .bot-right h4{
    width:232px;
  }
  .bot-adv{
    position: relative;
    float: left;
    margin-top: 20px;
    height: 80px;
    width: 1200px
  }
  .bot-adv img{
    width: 100%;
    height: 100%;
  }
  .bot-adv .op-tag {
    right: 4px;
    bottom:4px;
  }
</style>
