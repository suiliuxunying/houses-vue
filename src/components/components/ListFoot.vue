<template>
  <div class="footRoot">
    <p class="footRootp">
      <a href="">关于我们</a>
      <a href="">友情链接</a>
      <a href="">联系我们</a>
      <a href="">加入我们</a>
      <a href="">隐私声明</a>
      <a href="">网站声明</a>
      <label >官方电话：###-###-###</label>
    </p>
    <hr style="margin: 0 0 20px 0">
    <p class="footerP">
      丽水学院工学院计算机152班张少华毕业设计作品  |   网络经营许可证 晋ICP备#######号-#   |   @copyCopyright@copy2019-#### 张少华所有 | 营业执照
    </p>
    <!--<hr>-->
    <p class="footerP">
    违法和不良信息举报电话：###-######## 违法和不良信息举报邮箱：jubaoyouxiang@##.com
    </p>
    <!--<hr>-->
    <p class="footerP">
    晋公网安备 ##############号
    </p>
    <p class="footerP">
      　
    </p>

  </div>
</template>

<script>
  import ListFoot from '../components/ListFoot.vue'
  import Axios from 'axios';
  export default {
      name: 'ListFoot'
  }
</script>

<style scoped>
  .footRoot{
    margin-top: 20px;
    padding: 20px 15% 40px;

    /*height: 100px;*/
    background-color: cadetblue;
  }
  .footRootp{
    padding: 20px 0px;
    margin: 0px;
  }
  .footRoot p a{
    font-size: 15px;
    text-decoration:none;
    color: white;
    margin:20px 20px 20px 20px;
  }
  .footRoot p label{
    color: aquamarine;
    display: block;
    font-size: 16px;
    float: right;
  }
  .footerP{
    padding: 0px;
    margin: 0px;
    font-size: 13px;
    line-height: 24px;
    color: darkslategray;
  }
</style>
