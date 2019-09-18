<template>
  <div class="footer">
    <div class="box-center cf">
      <div class="footer-text">
        <p>网警提示：网络刷单是违法 切莫轻信有返利，网上交友套路多 卖惨要钱需当心，电子红包莫轻点 个人信息勿填写，仿冒客服来行骗 官方核实最重要，招工诈骗有套路 预交费用需谨慎，低价充值莫轻信 莫因游戏陷套路，连接WIFI要规范 确认安全再连接，抢购车票有章法 确认订单再付款，白条赊购慎使用 提升额度莫轻信，网购预付有风险 正规渠道很重要 如网民接到962110电话，请立即接听。</p>
      </div>
      <div class="friend-link">
        <em><cite>友情链接：</cite></em>
        <a href="//www.qidian.com">起点中文网</a>
        <a href="//www.qdmm.com" target="_blank">起点女生网</a>
        <a href="http://chuangshi.qq.com" target="_blank">创世中文网</a>
        <a href="http://yunqi.qq.com" target="_blank">云起书院</a><!--<a href="http://www.rongshuxia.com" target="_blank">榕树下</a>-->
        <a href="//www.hongxiu.com" target="_blank">红袖添香</a>
        <a href="//www.readnovel.com" target="_blank">小说阅读网</a>
        <a href="//www.xs8.cn" target="_blank">言情小说吧</a>
        <a href="http://www.xxsy.net" target="_blank">潇湘书院</a>
        <a href="http://www.tingbook.com" target="_blank">天方听书网</a>
        <a href="http://www.lrts.me" target="_blank">懒人听书</a>
        <a href="http://yuedu.yuewen.com" target="_blank">阅文悦读</a>
        <a href="//www.yuewen.com/app.html#appqq" target="_blank">QQ阅读</a>
        <a href="//www.yuewen.com/app.html#appqd" target="_blank">起点读书</a>
        <a href="//www.yuewen.com/app.html#appzj" target="_blank">作家助手</a>
        <a href="//www.webnovel.com" target="_blank" title="Qidian International">起点国际版</a>
      </div>
      <div class="footer-menu dib-wrap">
        <a href="//www.qidian.com/about/intro" target="_blank">关于起点</a>
        <a href="//www.qidian.com/about/contact" target="_blank">联系我们</a>
        <a href="//join.yuewen.com" target="_blank">加入我们</a>
        <a href="//www.qidian.com/help/index/2" target="_blank">帮助中心</a>
        <a href="http://123.206.70.240/online/?cid=0&amp;uid=10&amp;code=YqtVgwbCUDmXYl2sWcl8xw==" class="advice" target="_blank">提交建议</a>
        <!--<a href="http://bbs.qidian.com" target="_blank">起点论坛</a>--><!--<a href="http://comic.qidian.com" target="_blank">动漫频道</a>-->
        <a href="//jubao.yuewen.com" target="_blank">举报中心</a>
      </div>
      <div class="copy-right">
        <p><span>Copyright <i>&copy;</i>2002-2019 www.xxxx.com All Rights Reserved</span>版权所有 xxxxxxxx信息科技有限公司</p>
        <p>网站备案/许可证号：<a href="http://beian.miit.gov.cn/publish/query/indexFirst.action" target="_blank">xB2-20080046-1</a>&nbsp;出版经营许可证：新出发x批字第 Uxx18 号&nbsp;网络文化经营许可证：x网文[2015]00xx-031 新出网证（x）字 x10</p>
        <p>请所有作者发布作品时务必遵守国家互联网信息管理办法规定，我们拒绝任何色情小说，一经发现，即作删除！举报电话：010-59357051</p>
        <p>本站所收录的作品、社区话题、用户评论、用户上传内容或图片等均属用户个人行为。如前述内容侵害您的权益，欢迎举报投诉，一经核实，立即删除，本站不承担任何责任</p>
        <p>联系方式 总机 021-xx705xx 地址：中国（xx）xxxxxxxxx路6xx号x号楼1xx、2xx室</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'copyright'
}
</script>

<style scoped>
  .footer {
    text-align: center;
    background: #fafafa;
  }
  a:hover{
    color: red;
  }
  .footer .box-center {
    background: #fafafa;
  }
  .cf {
    zoom: 1;
  }
  .box-center {
    width: 1200px;
    margin-right: auto;
    margin-left: auto;
  }
  .footer .footer-text {
    padding: 20px 26px 0;
  }
  .footer .footer-text p {
    font-size: 12px;
    line-height: 20px;
    text-align: left;
    color: #1a1a1a;
  }
  .footer .friend-link {
    font-size: 0;
    overflow: hidden;
    padding-top: 20px;
    padding-bottom: 2px;
  }
  .footer .friend-link em {
    font-family: PingFangSC-Regular,'-apple-system',Simsun,monospace;
    margin-right: 8px;
    color: #1a1a1a;
  }
  .footer .friend-link a, .footer .friend-link cite, .footer .friend-link em {
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
  }
  .footer .friend-link a:hover,.footer .footer-menu a:hover{
    color: red;
  }
  cite, em, i {
    font-style: normal;
  }
  .footer .footer-menu a, .footer .friend-link a {
    font-family: PingFangSC-Regular,'-apple-system',Simsun,monospace;
    font-size: 12px;
    line-height: 27px;
    margin-right: 16px;
    color: #1a1a1a;
  }
  .footer .friend-link a, .footer .friend-link cite, .footer .friend-link em {
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
  }
  a {
    margin: 0;
    padding: 0;
    text-decoration: none;
    color: #262626;
  }
  .footer .footer-menu {
    padding: 0 0 4px;
  }
  .dib-wrap {
    font-size: 0;
  }
  .footer .copy-right {
    padding-bottom: 16px;
  }
  .footer .copy-right p {
    font: 12px/20px PingFangSC-Regular,'-apple-system',Simsun;
    overflow: hidden;
    height: 20px;
    color: #a6a6a6;
  }
  p {
    word-wrap: break-word;
    word-break: break-all;
  }
  .copy-right i{
    font-size: 16px;
    padding: 0;
    margin:0 3px 0 -3px;
  }
</style>
