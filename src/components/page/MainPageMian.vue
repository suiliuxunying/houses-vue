<template>
  <div >
    <el-carousel :interval="4000" type="card" height="350px">
      <el-carousel-item  key="1">
        <img src="../../assets/fang1-1.jpg" alt="">
        <h3>1</h3>
      </el-carousel-item>
      <el-carousel-item  key="2">
        <img src="../../assets/fang3-1.jpg" alt="">
        <!--<h3>{{ item }}</h3>-->
      </el-carousel-item>
      <el-carousel-item  key="3">
        <img src="../../assets/fang2-1.jpg" alt="">
        <!--<h3>{{ item }}</h3>-->
      </el-carousel-item>
    </el-carousel>
    <div style="
             border: 2px solid rgb(59, 124, 126);
             margin:0 25% ;
      "></div>
    <p>
      <h1 style="
            height: 60px;
            font-size: 45px;
            color: cadetblue;
            font-family: 'Adobe Arabic';
            text-align: center;
            margin: 20px auto;
        ">家 之 所 在 ~ 最懂你的寻屋之旅</h1>
      <div style="
             border: 2px solid rgb(59, 124, 126);
             margin:0 25% ;
      "></div>
      <p style="
              font-size: 14px;
              margin: 0px 10%;
              line-height: 24px;
              text-align: center;
              padding: 10px 0;
              font-weight: 550;
              color: #3b7c7e;"
        >集买房、卖房，租房功能于一体，随时随地任性找房。
          IM匿名咨询让您放心，消息动态推送让您省心，
          服务承诺让您安心，数据百科锦囊让您感受贴心漫漫找房路，我们努力为您想更多。
      </p>
    </p>
    <el-row :gutter="24" style="margin: 0">
      <el-col :span="8">
        <el-card shadow="hover">
          <a href="" style="text-decoration:none;">
          <img src="../../assets/1.png" alt="" style="display: block;
    margin: 0 auto;">
          <h3 style="text-align: center;">租房</h3>
            <h5 style="text-align: center;">属于你的称心如意</h5>
          </a>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <a href="" style="text-decoration:none;">
            <img src="../../assets/2.png" alt="" style="display: block;
    margin: 0 auto;">
            <h3 style="text-align: center;">找房</h3>
            <h5 style="text-align: center;">属于你的称心如意</h5>
          </a>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <a href="" style="text-decoration:none;">
            <img src="../../assets/3.png" alt="" style="display: block;
    margin: 0 auto;">
            <h3 style="text-align: center;">买房</h3>
            <h5 style="text-align: center;">属于你的称心如意</h5>
          </a>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import Axios from 'axios';
  export default {
      name: 'MAinPageMain',
    data(){
        return{
          currentDate: new Date(),
          imageList:[
            {
              imageurl:'../../assets/fang1.jpg',
              title:'先这样的标题吧',
              other:'先这样的其他内容吧'
            },
            {
              imageurl:'../../assets/fang2.jpg',
              title:'先这样的标题吧',
              other:'先这样的其他内容吧'
            },
            {
              imageurl:'../../assets/fang3.jpg',
              title:'先这样的标题吧',
              other:'先这样的其他内容吧'
            }
          ],
        }
    }
  }
</script>

<style scoped>
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

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
