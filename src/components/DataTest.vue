<template>
  <div id="test">
<h1>{{msg}}</h1>
    <el-button type="primary" @click="onSubmit">按钮</el-button>
    {{response}}
  </div>
</template>
<script>

  import { Button, Select } from 'element-ui';
  import Axios from 'axios';
  import updata from './components/updata.vue'

  export default {
    name: 'DataTest',
      data () {
      return {
        response:{},
        msg: 'datatest',
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
        }
      }
    },
    mounted() {
//      this.onSubmit();
    },
    methods:{
      getdata(){
        this.msg="hahaha!";
        // Optionally the request above could also be done as
        Axios({
          method:'get',
          baseURL:'/api',
          url:'/user/1',
        }).then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      onSubmit() {
        console.log('submit!');
        //按理说“this.$data.form”==“this.form” 不知道为啥不行了
        let _this=this;
        Axios({
          method:'post',
          baseURL:'/api',
          url:'/searchHousePaga',
          data:{"ifUp":1,"form":_this.$data.form,"rank":1}
        }).then(function (response) {
          console.log("response:");
          _this.$data.response=response;
          console.log(response);
          _this.$data.data=response.data;
        }).catch(function (error) {
          console.log("error:");
          console.log(error);
        });
      },
    }
  }
</script>
