import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../components/page/mainpage.vue'
import HelloWorld from '../components/HelloWorld.vue'
import DataTest from '../components/DataTest.vue'
import ListPage from '../components/page/ListPage.vue'
import MainPageMain from '../components/page/MainPageMian.vue'
import Login from '../components/page/LoginMain.vue'
import User from '../components/page/userMain.vue'
import House from '../components/page/House.vue'
import addHouse from '../components/page/addHouse.vue'
import editHouse from '../components/page/editHouse.vue'
import ListPageRent from '../components/page/ListPageRent.vue'
Vue.use(Router);

export default new Router({
   mode:'history',
  routes: [
    {
      path: '/a',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[
        {
          path:"datatest", //不能加“/”
          name:"DataTest",
          component:DataTest,
        },
      ]
    },

    {
      path:"/house",
      name:"MainPage",
      component:MainPage,
      children:[
        {
          path:"ListPage", //不能加“/”
          name:"ListPage",
          component:ListPage,
        },
        {
          path:"ListPageRent", //不能加“/”
          name:"ListPageRent",
          component:ListPageRent,
        },
        {
          path:"MainPageMain", //不能加“/”
          name:"MainPageMain",
          component:MainPageMain,
        },
        {
          path:"Login", //不能加“/”
          name:"Login",
          component:Login,
        },
        {
          path:"User", //不能加“/”
          name:"User",
          component:User,
        },
        {
          path:"House", //不能加“/”
          name:"House",
          component:House,
        },
        {
          path:"addHouse", //不能加“/”
          name:"addHouse",
          component:addHouse,
        },
        {
          path:"editHouse", //不能加“/”
          name:"editHouse",
          component:editHouse,
        },

      ]
    },
  ]
})
