<template>
  <div>
    <el-button class="item-button"plain @click="into">
      <div class="lefteb">
        <img :src="'../../../static/imgs'+itemData.images.toString().split(',')[0]" class="image">
      </div>
      <div class="mideb">
        <h1 style="font-size:30px">{{itemData.name}}</h1>
        <p><el-tag type="success">{{itemData.remarks}}</el-tag></p>
        <p>
          <el-tag type="info">{{itemData.area}}平米</el-tag>
          <el-tag type="info">{{itemData.beds}}卧</el-tag>
          <el-tag type="info">{{itemData.baths}}卫</el-tag>
          <!--<el-tag type="info">{{itemData.rating}}</el-tag>-->
        </p>
        <p>
          <el-tag style="margin-right: 6px" type="warning" v-for="(item,index) in itemData.tags.toString().split(',')" :key="index">{{item}}</el-tag>
          <!--<el-tag type="warning">{{itemData.tags}}</el-tag>-->
        </p>
      </div>
      <div class="righteb">
        <h1 v-show="itemData.type" style="font-size: 30px;line-height: 169px;color: red;">{{itemData.price}}￥/平米</h1>
        <h1 v-show="!itemData.type" style="font-size: 35px;line-height: 169px;color: red;">{{itemData.price}}￥/月</h1>
      </div>

    </el-button>
  </div>
</template>

<script>
  import Axios from 'axios';
  export default {
//mounted(){
//      console.log("itemdata:");
//      console.log(this.$data.itemData);
//    },
    props:['item-data','type'],
    data(){
      return{
        tags:['eee','eee','eee'],
      }
    },
      name: 'ListItem',
    watch:{
      itemData:function (val,oldVal) {
//        console.log("listItem:");
//        两个是一样的
//        console.log(val);
          let a=val.tags;
          this.$data.tags=a;
//        console.log(this.$data.tags);
      }
    },
    methods:{
      into(){
//        console.log("itemData:");
//        console.log(this.itemData);
        this.$emit("into",this.itemData);
        this.$router.push({path:'House'});
      }
    }

  }
</script>

<style>
  .el-tag{
    font-size: 20px;
  }
  .item-button {
    display: block;
    width: 100%;
    text-align: left;
    padding: 0px;
    border: 0px solid #d5d6dc;
    border-bottom-width:3px ;
    margin-bottom: 20px;
  }
  .lefteb{
    /*background-image: url(../../assets/fang1.jpg);*/
    /*background-position:center;*/
    /*background-repeat:no-repeat;*/
    /*background-attachment:fixed;*/
    float: left;
    border-radius: 4px;
    width: 300px;
    height: 234px;
    margin-right: 30px;
  }
  .image {
    width: 100%;
    border-radius: 4px;
  }
  .mideb{
    float: left;
    min-width: 250px;
    height: 234px;
    margin-right: 10px;
  }
  .mideb p,h1{
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;/*规定段落中的文本不进行换行 */
    width: 520px;/*需要配合宽度来使用*/
    /*border: 1px solid red;*/
    /*font-size: 30px;*/
  }
  .righteb{
    float: right;
    border-radius: 4px;
    width: 190px;
    min-width: 170px;
    height: 234px;
  }


</style>
