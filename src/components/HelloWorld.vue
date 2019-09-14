<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <!--<area-select v-model="selected" :data="pcaa"></area-select>-->
    <router-view/>

    <!--<updata>  </updata>-->

  </div>
</template>

<script>
  import { AreaCascader } from "vue-area-linkage"
  import updata from '../components/components/updata.vue'
  import { pca, pcaa } from 'area-data';
export default {
  name: 'HelloWorld',
  components:{
    updata,
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selected: [], //数组对应的就是选中的那个省市区。根据type来确定是省市区汉字的数组还是编码组成的数组。
      //selected[0]省。selected[1]市。selected[2]区。
      pca: pca,
      pcaa: pcaa
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
