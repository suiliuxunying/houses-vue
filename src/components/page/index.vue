<template>
  <div >

  </div>
</template>

<script>
  import Axios from 'axios';
  export default {
//      name: 'App'
   methods:{
     getdata(){

       let _this = this;//很重要！！
       Axios({
         method:'post',
         baseURL:'/api',
         url:'/getCommunityList',
       }).then(function (response) {
          console.log(response);
//          _this
       }).catch(function (error) {
           console.log("error:");
           console.log(error);
         });

     }

   }
  }
</script>

<style scoped>

</style>
