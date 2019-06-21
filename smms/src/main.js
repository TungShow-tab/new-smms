import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import axios from "axios"

router.beforeEach((to,from,next)=>{
  let token=window.localStorage.getItem("token");
  if(token){
    next();
  }else{
    if(to.path === "/login"){
      next();
    }else{
      return next({path:"/login"});
    }
  }
});



Vue.prototype.$echarts = echarts 
Vue.prototype.axios = axios;

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(echarts)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
