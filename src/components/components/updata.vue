<template>
  <div >
    <!--<h1>hahahahah</h1>-->
    <el-upload  multiple

     name="multipartfiles"
    ref="upload"
    :limit="limit"
    :action="imageAction"
    list-type="picture-card"
    :data="uploadData"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :before-upload="beforeUpload"
    :before-remove="beforeRemove"
    :on-exceed = "onExceed"
    :on-rrror="uploadError"
    :on-success="uploadSuccess"
                :on-change="onChange"
    :auto-upload="true">
    <!--<i class="el-icon-upload"></i>-->
      <i class="el-icon-plus"></i>
    <div class="el-upload__tip" slot="tip">只能上传'jpg/png/gif'，最多五张</div>
    <div class="el-upload__tip" slot="tip" style="color: red;">{{message.error}}</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>


  </div>
</template>

<script>
  import Axios from 'axios';
  export default {
    name:'updata',
    data () {
      return {
        imageAction:'http://localhost:9090/house/save',
        limit: 2,
        imagsName:[],
        fileList: [],
        uploadData:{},
        dialogImageUrl: '',//预览用
        dialogVisible: false,//预览用
        message:{error:'',}
      }
    },
    methods: {
      // 当设置了取消自动上传的时候，调用此方法开始上传
      // submitUpload () {
      //   this.$refs.upload.submit()
      // },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        if (file.status === 'success') {
          //图不够不删了
          //this.delete(file.name);
          this.$data.imagsName=[];
          for(let i=0;i<fileList.length;i++){
            this.$data.imagsName.push(fileList[i].name);
          }
        }
        this.putimagsname();
        console.log("删除图片伪成功：");
        console.log(this.$data.imagsName);
      },
//      预览
      handlePreview(file) {
        console.log("预览");
        console.log(file);
        if (file.status === 'success') {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        } else {
          console.log("预览：" + file.status);
          this.$data.message.error("预览：" + file.status);
        }
      },
//      超数量
      onExceed(files, fileList) {
        console.log('提示：只能上传' + this.$data.limit + '张图片！');
        this.$data.message.error('提示：只能上传' + this.$data.limit + '张图片！');
      },
//     图片上传前
      beforeUpload(file) {
        if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
          this.message.error('只支持jpg、png、gif格式的图片！');
          return false;
        }
        this.$data.uploadData.uid = file.uid;
      },

      uploadSuccess(response, file, fileList) {
//        this.fileIds = response.fileIds;
        console.log('上传图片成功');
        //console.log(response, file, fileList);
        this.$data.imagsName.push(response);
        console.log(this.$data.imagsName);
        this.putimagsname();

      },

      beforeRemove(){},
      onChange() {},

      uploadError(response, file, fileList) {
        this.$data.message.error('上传图片失败！');
        console.log('上传图片失败');
        console.log(response, file, fileList);
      },

      delete(fileName) {
        let _this = this;//很重要！！
        Axios({
          method: 'post',
          baseURL: '/api',
          url: '/delete',
          data:{"fileName":fileName},
        }).then(function (response) {
          console.log(response);
          console.log("删除成功！！");
        }).catch(function (error) {
          console.log("删除error:");
          console.log(error);
        });

      },
      putimagsname(){
        console.log("putimagsname");
        this.$emit("getImagsName",this.$data.imagsName);
//        this.$emit("submit",this.$data.form);
      }
    },
  }
</script>

<style scoped>

</style>
