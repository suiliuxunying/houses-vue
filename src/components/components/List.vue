<template>
  <div class="main">
    <!--一行说明 + 标签页-->

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tag >点击  按钮  切换排序规则,(默认由底到高) >></el-tag>

      <el-button type="primary" icon="el-icon-sort" circle @click="ifUpM"></el-button>
      <el-tab-pane label='默认列表' name=0 >

        <ListItems :dataFromForm="dataFromForm" :state="state" :type="type" :rank="0" :ifUp="ifUp" @into="into"></ListItems>

      </el-tab-pane>
      <el-tab-pane label='按价格排序' name=1 disabled>
        <!--<ListItems :dataFromForm="dataFromForm" :state="state" :rank="0" :ifUp="ifUp" @into="into"></ListItems>-->
      </el-tab-pane>
      <el-tab-pane label="按面积排序" name=2 disabled>
        <!--<ListItems :dataFromForm="dataFromForm" :state="state" :rank="1" :ifUp="ifUp" @into="into"></ListItems>-->
      </el-tab-pane>
      <el-tab-pane label="按时间排序" name=3 disabled>
        <!--<ListItems :dataFromForm="dataFromForm" :state="state" :rank="2" :ifUp="ifUp" @into="into"></ListItems>-->
      </el-tab-pane>
      <el-tab-pane label="按名称排序" name=4 disabled>
        <!--<ListItems :dataFromForm="dataFromForm" :state="state" :rank="3" :ifUp="ifUp" @into="into"></ListItems>-->
      </el-tab-pane>
      <el-tab-pane label="推荐信息" name=5 >
        <ListItems :dataFromForm="dataFromForm" :state="state" :rank="3" :ifUp="ifUp" @into="into"></ListItems>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Axios from 'axios';
  import ListItems from '../components/ListItems.vue';
  export default {
    components:{
      ListItems,
    },
    props:['data-From-Form','state','type'],
    name: 'List',
    data() {
      return {
        ifUp:0,
        rank:0,
        activeName: 0
      };
    },

    methods: {
      into(house){
//        console.log("house:");
//        console.log(house);
        this.$emit("into",house);
      },
      handleClick(tab, event) {
//        console.log(tab.name);
        this.$data.rank=tab.name;
      },
      ifUpM(){
        let ifUp= this.$data.ifUp;
        if(ifUp==1) this.$data.ifUp=0;
        else this.$data.ifUp=1;
        console.log("ifup: ");
//        console.log(ifUp);
      }
    }
  };
</script>

<style  scoped>
  .main{
    margin:20px 0 0px 0px;
    background-color: #fff;
    padding: 0px 0px;
  }
  .el-tag{
    display: inline-block;
    font-size: 20px;
    font-style: inherit;
    margin-bottom: 10px;
  }
  .el-button.is-circle {
    border-radius: 50%;
    padding: 7px;
  }
</style>
