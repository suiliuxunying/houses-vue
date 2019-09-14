<template>

        <div class="list" style="margin:10px 15% 0px">
          <ListForm @submit="getFormData" :type="type"></ListForm>
          <List :dataFromForm="dataFromForm" :state="state" :type="type" @into="into"></List>
        </div>

</template>

<script>
  //import { Button, Select } from 'element-ui';
  import ListForm from '../components/ListForm.vue'
  import List from '../components/List.vue'
  import Axios from 'axios';
    export default {
      components:{
        List,
        ListForm,
      },
      data(){
        return{
          dataFromForm:[],
          state:true,
          type:true,
        }
      },
      name: 'ListPage',

      methods:{
        into(house){
          console.log("house:");
          console.log(house);
          this.$emit("into",house);
        },
        getFormData(dataFromForm){
          console.log("datafromform:");
          console.log(dataFromForm);

          this.$data.dataFromForm = dataFromForm;
          this.$data.state = !this.$data.state;

//          setTimeout((dataFromForm)=>{
//            this.$data.dataFromForm =[];
//          },30);
        }
      }
    }
</script>

<style>

</style>
