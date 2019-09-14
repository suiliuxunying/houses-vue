<template>
  <div>

    <ListItem v-for="(item,index) in data" :itemData="item" :key="index" @into="into"></ListItem>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      style="margin: 0 auto;text-align: center;"
      background
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>

  </div>
</template>

<script>
  import Axios from 'axios';
  import ListItem from '../components/ListItem.vue';
  export default {

    components:{
      ListItem,
    },
    props:['data-From-Form','rank','if-Up' ,'state'],
    name: 'ListItemsRent',
    data(){
      return{
        currentPage:1,
        data:[],
        pageSize:4,
        total:1,
      };
    },
    watch:{
      state:function (val,oldVal) {
//        console.log("listItems:");
//        console.log(val);
        if(val.length!=0) this.onSubmit();
      },
      ifUp:function (val,oldVal) {
//        console.log(" ifUp listItems:"+oldVal);
//        console.log(val);
        this.onSubmit();
      }
    },
    methods:{

      into(house){
        console.log("house:");
        console.log(house);
        this.$emit("into",house);
      },
//      查询！！
      onSubmit() {
        console.log('submit!');
        //按理说“this.$data.form”==“this.form” 不知道为啥不行了
        let _this=this;
        console.log("rank:");
        console.log(_this.rank);
        console.log("from:");
        Axios({
          method:'post',
          baseURL:'/api',
          url:'/searchHousePaga',
          data:{
            "form":_this.dataFromForm,//表单
            "rank":_this.rank,//排序方式
            "ifUp":_this.ifUp,//正序逆袭
            "rows":_this.pageSize,//一页多少
            "page":_this.currentPage//当前页
          }
        }).then(function (response) {
          console.log("response:");
          console.log(response);
          _this.$data.total=response.data.total;
          _this.$data.data=response.data.rows;
        }).catch(function (error) {
          console.log("error:");
          console.log(error);
        });
      },

      handleCurrentChange(val) {
//        console.log(`当前页: ${val}`);
        this.$data.currentPage=val;
        this.onSubmit();
      }
    },

  };
</script>

<style  scoped>

</style>
