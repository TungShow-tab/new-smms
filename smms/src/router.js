import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",redirect: '/Login'
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('./views/Login/Login.vue')
    },
    { 
      path: '/home',  
      component: () => import('./views/Home/Home.vue'), // 父组件
      redirect: '/home/systeminfo',
      children: [ // 子组件
        // 系统信息
        {
          path: '/home/systeminfo',
          component: () => import('./views/SystemInfo/SystemInfo.vue'),
        },
        // 账号管理
        {
          path: '/home/accountmanage',
          component: () => import('./views/AccountManage/AccountManage.vue'),
        },
        {
          path: '/home/accountadd',
          component: () => import('./views/AccountAdd/AccountAdd.vue'),
        },
        {
          path: '/home/passwordmodify',
          component: () => import('./views/PasswordModify/PasswordModify.vue'),
        },
        // 商品管理
        {
          
          path: '/home/goodsmanage',
          component: () => import('./views/GoodsManage/GoodsManage.vue'),
        },
        {
          name:"GoodsAdd",
          path: '/home/goodsadd',
          component: () => import('./views/GoodsAdd/GoodsAdd.vue'),
        },
        // 统计管理
        {
          path: '/home/selltotal',
          component: () => import('./views/SellTotal/SellTotal.vue'),
        },
        {
          path: '/home/stocktotal',
          component: () => import('./views/StockTotal/StockTotal.vue'),
        },
        {
          path: '/home/personalCenter',
          component: () => import('./views/PersonalCenter/PersonalCenter.vue'),
        },

      ]
    }
  ]
})
