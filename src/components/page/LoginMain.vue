<template>
  <div >
    <el-tabs type="border-card" stretch style="margin: 0px 25%">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-edit"></i> 登录</span>
        <el-form :model="loginFrom" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

          <el-form-item label="" size="mini">
            <label style="font-size: 15px;font-weight: 700;color: red;">{{loginFrom.mgs}}</label>
          </el-form-item>
          <el-form-item label="账号(邮箱)" prop="email">
            <el-input v-model="loginFrom.email"></el-input>
          </el-form-item>
          <el-form-item label="密　　　码" prop="pass">
            <el-input type="password" v-model="loginFrom.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">提交</el-button>
            <el-button @click="resetLoginForm('loginFrom')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-edit"></i> 注册</span>

          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="" size="mini" >
              <label style="font-size: 15px;font-weight: 700;color: red;">{{ruleForm.mgs}}</label>
            </el-form-item>

            <el-form-item
              prop="email"
              label="邮箱(账号)"
              :rules="[
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ]"
            >
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="avatar">
              <el-input v-model="ruleForm.avatar"></el-input>
            </el-form-item>

            <el-form-item label="年龄" prop="age">
              <el-input v-model.number="ruleForm.age"></el-input>
            </el-form-item>

            <el-form-item label="电话" prop="phone">
              <el-input v-model.number="ruleForm.phone"></el-input>
            </el-form-item>

            <el-form-item label="个人简介">
              <el-input type="textarea" v-model="ruleForm.aboutme"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>

          </el-form>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Axios from 'axios';
  export default {
      name: 'Login',
    data(){
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        //延时
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var checkPhone = (rule, value, callback) => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        }
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
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return{
          check:false,
          user:{aboutme: "",
            avatar: "",
            createTime: "",
            email: "",
            enable: true,
            id: "",
            name: "",
            password:"",
            phone: "",
            type: true},
          loginFrom:{
            email:'',
            pass:'',
            mgs:''
          },
          ruleForm: {
            mgs:'',
            age:'',
            phone:'',
            checkPass: '',
            name: '',
            password:'',
            email:'',
            aboutme:'',
            avatar:'',
          },
          rules: {
            password: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            age: [
              { validator: checkAge, trigger: 'blur' }
            ],
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
        }
    },
    methods: {
      login(){
        let _this = this;//很重要！！
        Axios({
          method:'post',
          baseURL:'/api',
          url:'/emailLogin',
          data:this.$data.loginFrom,
        }).then(function (response) {
          console.log(response);
//          _this
          if(response.data.state==1){
            _this.$data.loginFrom.mgs="密码错误！！请重新输入密码！！";
            _this.$data.loginFrom.pass='';
          }else if(response.data.state==2){
            _this.$data.loginFrom.mgs="账号错误！！请重新输入！！";
            _this.$data.loginFrom.email='';
          }
          else{
//            转到主页
            console.log("登录成功！！");
            _this.$data.user=response.data;
            _this.open(response.data.user);
            _this.$emit("getUser",response.data.user);
            _this.$router.push({path:'MainPageMain'});

          }
        }).catch(function (error) {
          console.log("error:");
          _this.$data.loginFrom.mgs="网络故障~请重试~";
          console.log(error);
        });
      },
      open(user) {
          const h = this.$createElement;

          this.$notify({
            title: '亲爱的'+user.avatar+'用户：',
            message: h('i', { style: 'color: teal'}, '非常欢迎您的到来，我会提供最好的服务~')
          });
        },
      register(){
        let _this = this;//很重要！！
        Axios({
          method:'post',
          baseURL:'/api',
          url:'/register',
          data:this.$data.ruleForm
        }).then(function (response) {
          console.log("register");
          console.log(response);
//          _this
          if(response.data.state!=1){
            _this.$data.ruleForm.mgs="系统错误，注册失败。。";
          }
          else{
//            转到主页
            console.log("注册成功！！");
            _this.$data.user=response.data;
            _this.open(response.data.user);
            _this.$emit("getUser",response.data.user);
            _this.$router.push({path:'MainPageMain'});

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
            this.register();
          } else {
           this.$data.ruleForm.mgs="请按要求填好信息！！";
//           alert("请按要求填好信息！！");
            console.log('error submit!!');
//            this.register();
           // return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      resetLoginForm(formName) {
//        this.$nextTick(()=>{
//          if (this.$refs[formName] !== undefined) {
//            this.$refs[formName].resetFields();
//          }
//        })
        this.loginFrom={
          email:'',
            pass:'',
            mgs:''
        }
      }
    }
  }
</script>

<style scoped>

</style>
