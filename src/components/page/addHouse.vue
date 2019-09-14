<template>
  <div >
    <el-card class="box-card" style="text-align: left;margin:10px 13% 0px" >
      <el-form ref="form" :model="form" label-width="80px" label-position="left" >

        <el-form-item label="房产名称">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>

        <el-form-item label="省　　份" >
          <!--<el-input v-model="form.name"></el-input>-->
          <area-cascader v-model="form.areaCode" :data="pca" size="large" style="width:350px;height: 40px;line-height: 30px;"></area-cascader>
        </el-form-item>
        <el-form-item label="小　　区">
          <el-select
            style="width: 350px"
            v-model="form.communityId"
            placeholder="请 选 择 希 望 的 小 区">
            <el-option v-for="(item,index) in fData.communityList" :label="item.name" :value="item.id" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="面　　积">
          <el-input-number v-model="form.area" @change="handleChange" :min="0" :max="10000" label="面　　积"></el-input-number>
          <el-tag type="success">平方米</el-tag>
        </el-form-item>

        <el-form-item label="类　　型">
          <el-radio-group v-model="form.type" >
            <el-radio label='1'  border>出租</el-radio>
            <el-radio label='2'  border>售卖</el-radio>
          </el-radio-group>

        </el-form-item>

        <el-form-item label=" 智能估价">
          <el-switch v-model="form.evaluate"></el-switch>
        </el-form-item>

        <el-form-item label="" v-if="form.evaluate">
          <div class="block" >
            <el-button type="primary">点击估价</el-button>
            <el-input-number v-model="form.price" @change="handleChange" :min="0" :max="100000" label="价　　格"></el-input-number>
            <el-tag v-show="form.type==1" type="success">￥/月</el-tag>
            <el-tag v-show="form.type==2" type="success">￥/平米</el-tag>
          </div>
        </el-form-item>

        <el-form-item label="价　　格" v-else>
          <el-input-number v-model="form.price" @change="handleChange" :min="100" :max="100000" label="价　　格"></el-input-number>
          <el-tag v-show="form.type==1" type="success">￥/月</el-tag>
          <el-tag v-show="form.type==2" type="success">￥/平米</el-tag>
        </el-form-item>

        <el-form-item label="卧　　室">
          <el-radio-group v-model="form.beds">
            <el-radio v-for="(item,index) in fData.bedsList" :label="index" :key="index">{{item}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="卫生间数">
          <el-radio-group v-model="form.baths">
            <el-radio v-for="(item,index) in fData.bathsList" :label="index" :key="index" >{{item}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="特　　征">
          <el-checkbox-group v-model="form.tags">
            <el-checkbox v-for="(value,key) in fData.tagsList" :label="key" :key="key">{{value}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="房产描述">
          <el-input type="textarea" v-model="form.describe"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">

          <updata @getImagsName="getImagsName"></updata>

        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button type="primary" @click="resetForm(form)">重置</el-button>
          <!--<el-button>取消</el-button>-->
        </el-form-item>

      </el-form>

    </el-card>
  </div>
</template>

<script>

  import { AreaCascader } from "vue-area-linkage"
  import { pca, pcaa } from 'area-data';
  import Axios from 'axios';
  import updata from '../components/updata.vue'
  export default {
    name: 'addHouse',
    props:["house","user-Data","user-State"],
    components:{updata,},
    data() {
      return {
        pca: pca,
        myHouse:this.house,
        fData:{
          communityList:[
            {name:"花园小区",id:1},
            {name:"汇迁小区",id:2},
            {name:"不知道名字的小区",id:3},
          ],
          areaList:["50 以 下","50-100","100-150","150 以 上"],
          priceList:["1000 以 下","2000-1000","3000-2000","3000 以 上"],
          bathsList:[" 公 卫"," 一 卫"," 两 卫"," 更多"],
          bedsList:[" 一 卧"," 两 卧"," 三 卧"," 更多"],
          tagsList:["靠近地铁" ,"坐北朝南","高速网络","合租"],
        },
        form: {
          name:'优质房产',
          areaCode: ['110000','110101'],
          communityId: 1,
          area: 100,
          price:1000,
          evaluate: false,
          evaluatePrice: '',
          tags:['1','2'],
          baths:1,
          beds:2,
          describe:'提供优质房产，有需要欢迎致电，绝佳的服务，低廉的价格，还要等什么呢！',
          type:'1',
          imagsName:[],
        },
      };
    },
    mounted() {
      this.getCommunityList();
      this.getTagsList();
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
        console.log(this.$data.form);
        this.getData(this.$data.form);
      },
      getData(house){
//        let data={'house':house,'userId':99};
        let data={'house':house,'userId':this.userData.id};
        let _this = this;//很重要！！
        Axios({
          method:'post',
          baseURL:'/api',
          url:'/insertHouse',
          data:data,
        }).then(function (response) {
          console.log(response);
          _this.$data.myHouse = response.data;
          _this.$emit("getHouse",response.data);
          _this.$router.push({path:'House'});

        }).catch(function (error) {
          console.log("error:");
          console.log(error);
        });

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        console.log(this.$data.form);
      },
      handleChange(value) {
//        console.log(value);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      getImagsName(imagsName){
        this.$data.form.imagsName=imagsName;
        console.log("this.$data.form.imagsName");
        console.log(this.$data.form.imagsName);
      },
    }
  }
</script>

<style scoped>
  .area-select.large {
    width: 347px;
    /* padding: 0px 0px 10px 0px; */
  }
</style>
