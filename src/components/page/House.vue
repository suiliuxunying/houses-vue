<template>
  <div >
    <div class="top">
      <el-card class="box-card" style="margin:10px 15% 0px;min-width: 900px">
        <div slot="header" class="clearfix">
          <el-button type="primary" icon="el-icon-back" plain circle @click="gotoBack"></el-button>

          <el-button v-if="ifMaster"
          style="float: right;margin-top: 5px"
          type="success" plain  @click="contact(userState,house.id)">修改信息</el-button>
          <el-button v-else
          style="float: right;margin-top: 5px"
          type="success" plain  @click="contact(userState,house.id)">联系房主</el-button>
          <span style="margin: 10px 35%;font-size: 34px;" >房屋介绍</span>

          <el-dialog
            title="" :visible.sync="centerDialogVisible" width="40%" center>
            <div v-if="userState==1">
              <p style="margin: 10px auto;font-size: 20px">房　　主 ：  {{master.name}}</p>
              <p style="margin: 10px auto;font-size: 20px">联系邮箱 ：  {{master.email}}</p>
              <p style="margin: 10px auto;font-size: 20px">联系电话 ：  {{master.phone}}</p>
              <span slot="footer" class="dialog-footer"> 　 </span>
            </div>
            <div v-else>
              <span></span>
              <span>您还未登录，请先登录！</span>
              <span slot="footer" class="dialog-footer"> 　 </span>
            </div>

          </el-dialog>

        </div>
        <div style="float: left; width: 65%">
          <el-carousel indicator-position="outside" height="450px">
            <el-carousel-item v-for="(item,index) in house.images.toString().split(',')" :key="index">
              <!--<h3>{{ item }}</h3>-->
              <el-image
                :src='"../../../static/imgs"+item'
                style="width: 100%"
                ></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class='leftHouse' style="float: left; width: 32%;padding:0 10px ">
          <p style="margin-top: 0px"><el-button v-show="!house.type" style="margin:0 10px 0 0" type="warning">出租信息</el-button>
            <el-button v-show="house.type" style="margin:0 10px 0 0" type="warning">出售信息</el-button></p>

          <p><el-tag  style="margin:0 10px 0 0">标题</el-tag><span>{{house.name}}</span></p>
          <p><el-tag style="margin:0 10px 0 0">面积</el-tag><span>{{house.area}}平方米</span></p>
          <p><el-tag style="margin:0 10px 0 0">卧室</el-tag><span>{{house.beds}}个</span>
            <el-tag style="margin:0 10px 0 10px">卫生间</el-tag><span>{{house.baths}}个</span></p>
          <p><el-tag style="margin:0 10px 0 0">价格</el-tag><span>{{house.price}}￥/月</span></p>
          <p><el-tag style="margin:0 10px 0 0">特征</el-tag><span>{{house.tags}}</span></p>
          <p><el-tag style="margin:0 10px 0 0">简绍</el-tag><span>{{house.remarks}}</span></p>
          <!--<p><el-tag style="margin:0 10px 0 0">上架时间</el-tag><span>{{house.createTime-dateTime()}}</span></p>-->
        </div>
        <!--<div v-for="(item,index) in house.images.toString().split(',')" :key="index" class="text item">-->
          <!--{{'列表内容 ' + item }}-->

        <!--</div>-->
      </el-card>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios';
  export default {
    name: 'House',
    props:["house","user-Data","user-State"],
    data(){return{
      centerDialogVisible: false,
      ifMaster:false,
      master:{
        id:111111111,
      },
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
    }},
    computed:{

    },
    watch:{
      house:function(val ,oldVal) {
        console.log("val");
        console.log(val);
        console.log("master");
        console.log(this.$data.master);
        this.getData(val.id);
        console.log("master");
        console.log(this.$data.master);
      }

    },
    methods:{
      contact(userState,houseID){
        this.$data.centerDialogVisible=true;
        if(userState==1){
          //已经登陆 查
          this.getData(houseID);
        }
        else {
          console.log("未登录！！！");
        }
      },
      gotoBack(){
        this.$router.go(-1);
      },
      getData(houseID){
        let data=houseID;
        let _this = this;//很重要！！
        Axios({
          method:'post',
          baseURL:'/api',
          url:'/getMaster',
          data:{'houseId':data},
        }).then(function (response) {
          console.log(response);
          _this.$data.master=response.data;
          console.log(_this.userData.id+":"+response.data.id);
          if(_this.userData.id==response.data.id)
          _this.$data.ifMaster=true;
          console.log(_this.$data.ifMaster);
        }).catch(function (error) {
          console.log("error:");
          console.log(error);
        });

      }

    }
  }
</script>

<style scoped>
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .leftHouse p{

  }
  .leftHouse p el-tag{
    font-size: 15px;
  }
  .leftHouse p span{
    font-size: 18px;
  }
  .el-carousel__container {
    height: 450px !important;
  }
</style>
