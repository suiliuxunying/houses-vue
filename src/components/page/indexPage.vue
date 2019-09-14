<template>
  <el-container>
    <el-header><ListHeader></ListHeader></el-header>
    <el-container>
      <el-main>

      </el-main>
    </el-container>
    <el-footer><ListFoot></ListFoot></el-footer>
  </el-container>
</template>

<script>
  import ListHeader from '../components/ListHeaber.vue'
  import ListFoot from '../components/ListFoot.vue'
  import Axios from 'axios';
  export default {
    components:{
      ListHeader,
      ListFoot,
    },
//    name: 'ListPage'
  }
</script>

<style>
  .el-header, .el-footer {
    /*background-color: #B3C0D1;*/
    color: #333;
    /*text-align: center;*/
    /*line-height: 60px;*/
    margin: 0px;
    padding:0px;
  }
  .el-footer{
    margin: 0;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    /*text-align: center;*/
    /*line-height: 200px;*/
  }

  .el-main {
    background-color: #ffffff;
    color: #333;
    padding: 10px 0 0 0;
    margin: 0;
    /*text-align: center;*/
    /*line-height: 160px;*/
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
