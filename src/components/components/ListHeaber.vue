<template>
  <!--template下只能放一个组件-->
  <div class="hander">
  <el-menu router  :default-active ="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="MainPageMain" style="font-size: 28px;margin-right:0px;" >🏤</el-menu-item>
    <el-menu-item index="ListPageRent" >房屋租赁</el-menu-item>
    <el-menu-item index="ListPage">在售房屋</el-menu-item>
    <!--<el-menu-item index="3">小区</el-menu-item>-->
    <!--<el-menu-item index="4">成交</el-menu-item>-->
    <el-menu-item index="5"><a href="https://www.ele.me" target="_blank">房价预测</a></el-menu-item>

    <el-menu-item v-show="state" index="user"  style="float:right;">
      <el-button type="text" @click="userTo">👨‍{{userData.avatar}}的主页</el-button>
    </el-menu-item>
    <el-menu-item v-show="!state" index="Login"  style="float:right;" >
      登录/注册
    </el-menu-item>

    <!--disabled-->
    <!--<el-menu-item index="User"  style="float:right;"-->
    <!--&gt;用户中心</el-menu-item>-->
    <!--<div style="height:100%;float:right;">新增服务1</div>-->
    <el-submenu index="7" style="float:right;">
      <template slot="title">更多服务</template>
      <el-menu-item index="2-1">关于我们</el-menu-item>
      <el-menu-item index="2-2">意见反馈</el-menu-item>
      <el-menu-item index="2-3">联系我们</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title" >新增服务</template>
        <el-menu-item index="2-4-1">服务1</el-menu-item>
        <el-menu-item index="2-4-2">服务2</el-menu-item>
        <el-menu-item index="2-4-3">服务3</el-menu-item>
      </el-submenu>
    </el-submenu>

  </el-menu>
  <div class="line"></div>
  </div>
</template>

<script>
  export default {
    props:['userData','userState'],
    name:'ListHeader',
    data() {
      return {
        state:false,//0:未登录 1：登录
        activeIndex: 'MainPageMain',
      };
    },
    watch:{
      userState:function (val,oldVal) {
        console.log("handerGetUser:");
        console.log(val);
        if(val==1){
          this.$data.state=true;
          this.$data.activeIndex='MainPageMain';
        }else if(val==0){
          this.$data.state=false;
          this.$data.activeIndex='Login';
        }



      }
    },
    methods: {
      handleSelect(key, keyPath) {
//        console.log(" keyPath key,:");
//        console.log(keyPath);
//        console.log(key);
        this.$data.activeIndex = key;
      },
      userTo(){
//        this.$emit('',this)
      }
    }
  }
</script>
