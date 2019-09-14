<template>
  <div>
    <el-card class="box-card" style="margin:10px 13% 0px">
      <div slot="header" class="clearfix" style="height: 32px;">
        <span>个人中心：</span>
        <el-button v-if="state" style="float: right;" @click="edit" type="text">修改信息</el-button>
        <el-button v-else style="float: right;" @click="exitEdit" type="text">取消信息</el-button>
        <el-button style="float: right;   margin:  0 20px;" type="primary" @click="exit">退出登陆</el-button>
        <el-button style="float: right;   margin:  0 0px;" type="success" @click="addHouse">添加房产信息</el-button>
      </div>

        <span slot="label"><i class="el-icon-edit"></i>修改</span>

        <el-form :model="userData" :disabled = "state" status-icon :rules="rules" ref="userData" label-width="100px" class="demo-ruleForm">

          <el-form-item label="" size="mini" v-show="!state">
            <label  style="font-size: 15px;font-weight: 700;color: red;">{{ruleForm.mgs}}</label>
          </el-form-item>

          <el-form-item
            v-show="state"
            prop="email"
            label="邮箱(账号)"
            :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' }]"
          >
            <el-input v-model="userData.email"></el-input>
          </el-form-item>

          <el-form-item v-show="state" label="姓名" prop="name">
            <el-input v-model="userData.name"></el-input>
          </el-form-item>

          <el-form-item label="昵称" prop="avatar">
            <el-input v-model="userData.avatar"></el-input>
          </el-form-item>

          <!--<el-form-item label="年龄" prop="age">-->
            <!--<el-input v-model.number="ruleForm.age"></el-input>-->
          <!--</el-form-item>-->

          <el-form-item label="电话" prop="phone">
            <el-input v-model.number="userData.phone"></el-input>
          </el-form-item>

          <el-form-item label="个人简介">
            <el-input type="textarea" v-model="userData.aboutme"></el-input>
          </el-form-item>

          <el-form-item v-show="!state">
            <el-button type="primary" @click="submitForm('userData')">提交</el-button>
            <el-button @click="resetForm('userData')">重置</el-button>
          </el-form-item>
        </el-form>
    </el-card>


    <el-tabs type="border-card" stretch style="margin:10px 13% 0px" v-model="activeName" @tab-click="handleClick">

      <el-tab-pane  name=0>
        <span slot="label"><i class="el-icon-edit"></i> 我的收藏</span>

        <ListItem v-for="(item,index) in data.houseListCollect"
                  :itemData="item"
                  :key ="index"

                  @into="into"
        ></ListItem>

      </el-tab-pane>

      <el-tab-pane name=1>
        <span slot="label"><i class="el-icon-edit"></i> 我的房产</span>

        <ListItem v-for="(item,index) in data.houseListMy"
                  :itemData="item"
                  :type="item.type"
                  :key ="index"
                  @into="into"
        ></ListItem>

      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
  import 'vue-area-linkage/dist/index.css'; // v2 or higher
  import ListItem from '../components/ListItem.vue'
  import pcaa from 'area-data/pcaa';
  import Axios from 'axios';
  export default {
//    props:['user-data','user-state'],
    props:{'user-data':
    undefined,
//      {
//              type:object ,
//              default: () => {
//                return {
//
//                }
//                }
//          },
      'user-state':undefined  },
      name: 'User',
    components:{
      ListItem,
    },
    mounted() {
      if(this.userData!=null){
        console.log("userData!=null");
        this.getData(this.userData.id);
      }else {
        console.log("userData!=null");
      }
    },
    data(){
      var checkPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入电话'));
        }
        callback();
      };
      var checkName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓名'));
        }
        callback();
      };
      var checkAvatar = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入昵称'));
        }
        callback();
      };
        return{
          data:{},
          activeName: 0,
          state:true,
          rules: {
            phone: [
              { validator: checkPhone, trigger: 'blur' }
            ],
            name: [
              { validator: checkName, trigger: 'blur' }
            ],
            avatar: [
              { validator: checkAvatar, trigger: 'blur' }
            ]
          },
          ruleForm: {"mgs": "请按要求填好信息！！",},
        }
    },
    watch:{
      userData:function (val,oldVal) {
        console.log("edit userData:");
//        console.log(val);
        this.$data.ruleForm=val;
        console.log(this.$data.ruleForm);
        if(val!=null){
          this.getData(val.id);
        }
      },
      deep: true
    },
    methods:{
      addHouse(){
        this.$router.push({path:'addHouse'});
      },
      //获取我的房产数据
      getData(id){
        let _this = this;//很重要！！
        let data={'userId':id};
        Axios({
          method:'post',
          baseURL:'/api',
          url:'/getHouses',
          data:data,
        }).then(function (response) {
          console.log(response);
          _this.data=response.data;
        }).catch(function (error) {
          console.log("error:");
          console.log(error);
        });
      },

      into(house){
        console.log("house:");
        console.log(house);
        this.$emit("into",house);
      },
      handleClick(tab, event) {
        //    console.log(tab.name);
//        this.$data.rank=tab.name;
      },
      exit(){
        this.$emit("exit",{});
        this.$router.push({path:'login'});
      },
      edit(){
        this.$data.ruleForm.mgs='';
        console.log('edit!!');
        this.$data.state=false;
      },
      exitEdit(){
        console.log('edit!!');
        this.$data.state=true;
        this.resetForm('userData')
      },
      submit(){
        let _this = this;//很重要！！
        console.log("传输:userData:");
        console.log(_this.userData);
        Axios({
          method:'post',
          baseURL:'/api',
          url:'/edit',
          data:_this.userData
        }).then(function (response) {
          console.log("register");
          console.log(response);
//          _this
          if(response.data.state!=1){
            _this.$data.ruleForm.mgs="系统错误，修改失败。。";
          }
          else{
//            转到主页
            alert("修改成功！！");
//            console.log("修改成功！！");
            _this.$data.user=response.data;
            _this.$emit("getUser",response.data.user);
            _this.exitEdit();
            _this.$router.push({path:'user'});

          }
        }).catch(function (error) {
          console.log("error:");
          _this.$data.ruleForm.mgs="网络故障~请重试~";
          console.log(error);
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
//            alert('submit!');
            this.submit();
          } else {
            this.$data.userData.mgs="请按要求填好信息！！";
//           alert("请按要求填好信息！！");
            console.log('error submit!!');
//            this.register();
            // return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

  .el-input.is-disabled .el-input__inner {
    color: #1b305b;
  }
  .el-textarea.is-disabled .el-textarea__inner {
    color: #2a4b6e;
  }
</style>
