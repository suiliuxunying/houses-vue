<template>
  <el-container>
    <el-header><ListHeader :userData="user" :userState="userState"></ListHeader ></el-header>
    <el-container>
      <el-main>
        <keep-alive>

          <router-view
            :userData="user"
            :userState="userState"
            :house="house"
            @getUser="getUser"
            @getHouse="getHouse"
            @exit="exit"
            @into="into"
          />

        </keep-alive>

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
    data(){
      return{
        user:{},
        userState:0,
        house:{},
      }
    },
    components:{
      ListHeader,
      ListFoot,
    },
    name: 'MainPage',
    methods:{
      into(house){
        console.log("主页house:");
        console.log(house);
        this.$data.house=house;
      },
      getUser(user){
        console.log("user:");
        console.log(user);
        this.$data.user=user;
        this.$data.userState=1;
      },
      exit(user){
        console.log("exit:user:");
        console.log(user);
        this.open();
        this.$data.user=user;
        this.$data.userState=0;
      },
      open() {
        const h = this.$createElement;
        this.$notify({
          title: '亲爱的'+this.$data.user.avatar+'用户：',
          message: h('i', { style: 'color: teal'}, '欢迎下次再来~')
        });
      },
      getHouse(house){
        this.$data.house=house;
      }
    },

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
