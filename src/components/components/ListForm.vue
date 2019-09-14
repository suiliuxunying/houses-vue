<template>
  <el-card class="box-card" style="text-align: left;" >
   <el-form ref="form" :model="form" label-width="80px" label-position="left" size="mini">

     <el-form-item label="省　　份" >
       <!--<el-input v-model="form.name"></el-input>-->
       <area-cascader v-model="form.areaCode" :data="pca" size="small"></area-cascader>
     </el-form-item>



     <el-form-item label="小　　区">
       <el-select
         clearable
         filterable
         style="width: 350px"
         v-model="form.communityId"
         placeholder="请 选 择 希 望 的 小 区">
         <el-option
           v-for="(item,index) in fData.communityList" :label="item.name" :value="item.id" :key="index"></el-option>
       </el-select>
     </el-form-item>

     <el-form-item label="面　　积">
       <el-checkbox-group v-model="form.area">
         <el-checkbox v-for="(item,index) in fData.areaList" :label="index" :key="index">{{item}}</el-checkbox>
       </el-checkbox-group>
     </el-form-item>

     <el-form-item label="价　　格">
       <el-checkbox-group v-model="form.price">
         <el-checkbox v-show="type" v-for="(item,index) in fData.priceList" :label="index" :key="index">{{item}}</el-checkbox>
         <el-checkbox v-show="!type" v-for="(item,index) in fData.priceListRent" :label="index" :key="index+5">{{item}}</el-checkbox>
       </el-checkbox-group>
     </el-form-item>

     <el-form-item label=" 自定价格">
       <el-switch v-model="form.userDefined"></el-switch>
     </el-form-item>

     <el-form-item label="单位　万" v-if="type">
       <div class="block" >
         <el-slider
           v-model="form.userDefinedPrice"
           range
           show-stops
           :max="5">
         </el-slider>
       </div>
     </el-form-item>

     <el-form-item label="单位　千" v-else>
       <div class="block" >
         <el-slider
           v-model="form.userDefinedPrice"
           range
           show-stops
           :max="10">
         </el-slider>
       </div>
     </el-form-item>

     <el-form-item label="卧　　室">
       <el-checkbox-group v-model="form.beds">
         <el-checkbox v-for="(item,index) in fData.bedsList" :label="index" :key="index">{{item}}</el-checkbox>
       </el-checkbox-group>
     </el-form-item>

     <el-form-item label="卫生间数">
       <el-checkbox-group v-model="form.baths">
         <el-checkbox v-for="(item,index) in fData.bathsList" :label="index" :key="index" >{{item}}</el-checkbox>
       </el-checkbox-group>
     </el-form-item>

     <el-form-item label="特　　征">
       <el-checkbox-group v-model="form.tags">
         <el-checkbox v-for="(value,key) in fData.tagsList" :label="key" :key="key">{{value}}</el-checkbox>
       </el-checkbox-group>
     </el-form-item>

     <el-form-item>
       <el-button type="primary" @click="onSubmit">立即搜索</el-button>
       <el-button  @click="resetForm('form')">重置</el-button>
       <!--<el-button>取消</el-button>-->
     </el-form-item>

   </el-form>

  </el-card>

</template>

<script>
  //三级省市区选择需要
  import { AreaCascader } from "vue-area-linkage"
  import { pca, pcaa } from 'area-data';

  import Axios from 'axios';
  export default {
    props:['type'],
    name: 'ListForm',
    data() {
      return {
        pca: pca,
//        pcaa: pcaa,
        fData:{
          communityList:[
            {name:"花园小区",id:1},
            {name:"汇迁小区",id:2},
            {name:"不知道名字的小区",id:3},
          ],
          areaList:["50 以 下","50-100","100-150","150 以 上"],
          priceList:["10000 以 下","20000-10000","30000-20000","30000 以 上"],
          priceListRent:["1000 以 下","2000-1000","3000-2000","3000 以 上"],
          bathsList:[" 公 卫"," 一 卫"," 两 卫"," 更多"],
          bedsList:[" 一 卧"," 两 卧"," 三 卧"," 更多"],
          tagsList:["靠近地铁" ,"坐北朝南","高速网络","合租"],
        },
        form: {
          areaCode: [],
          communityId: '',
          area: [],
          price:[],
          userDefined: false,
          userDefinedPrice: [0, 0],
          tags:[],
          baths:[],
          beds:[],
          type:this.type,
        }
      }
    },
    mounted() {
      this.getCommunityList();
      this.getTagsList();
      this.onSubmit();
    },
    methods: {
      getCommunityList(){
        //必不可少
        var _this = this;//很重要！！
        console.log('getCommunityList!');
        Axios({
          method:'post',
          baseURL:'/api',
          url:'/getCommunityList',
        }).then(function (response) {
          console.log("getCommunityList response:");
          console.log(response.data);
//          得到data数组的单项数据
//          console.log(response.data[1]);
          _this.fData.communityList=response.data;
          _this.fData.communityList.push({name:" ",id:''},)
//          console.log(response.data[0].cityCode);
//          _this.form.areaCode.push(response.data[0].cityCode);

        })
          .catch(function (error) {

            console.log("error:");
            console.log(error);
          });
      },
      getTagsList(){
        var _this = this;//很重要！！
        Axios({
          method:'post',
          baseURL:'/api',
          url:'/getTags',
        }).then(function (response) {
          console.log(response.data);
          _this.fData.tagsList=response.data;
        }).catch(function (error) {
          console.log("error:");
          console.log(error);
        });      },
      onSubmit() {
        console.log('submit!');
        //按理说“this.$data.form”==“this.form” 不知道为啥不行了
        console.log(this.$data.form);
        this.$emit("submit",this.$data.form);
      },
      resetForm(formName) {
        this.form={
          areaCode: [],
            communityId: '',
            area: [],
            price:[],
            userDefined: false,
            userDefinedPrice: [0, 0],
            tags:[],
            baths:[],
            beds:[],
            type:this.type,
        }
      }
    }
  }
</script>

<style>
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 3px;
  }
  .el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label {
    line-height: 23px;
  }
  .area-select .area-selected-trigger {
    position: relative;
    display: block;
    font-size: 12px;
    cursor: pointer;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0px 20px 0px 12px;
  }
  .area-select.small {
    width: 348px;
    height: 26px;
    height: auto;
  }
</style>
