<template>
  <div class="index" :style="bgImg">
    <el-container>
      <!--导航组件-->
      <Nav>
        
      </Nav>
      <div @click="change()" id = "changeBg">更 换 壁 纸</div>

      <el-container>
        <!--头部组件-->
        <el-header>
          <Top></Top>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>

        <!--尾部组件-->
        <el-footer>
          <Bottom></Bottom>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    //注册自定义导航组件
    import Nav from "@/components/Nav/Nav.vue";
    import Top from "@/components/Top/Top.vue";
    import Bottom from "@/components/Bottom/Bottom.vue";

    export default {
        components: {
            Nav,
            Top,
            Bottom
        },
       data(){
         return {
              bgImg: {backgroundImage: 'url(' + 'http://172.16.12.238:8080/10.jpg' + ')', backgroundSize:'100%'},
              num: 0,
         }
       },
       
        methods: {
         
          change(){
            
              let newNum = this.num++;

              if(this.num === 10){
                
                this.num = 0
                
              }
              //console.log(newNum)
              let nextImg = [
                {backgroundImage: 'url(' + 'http://172.16.12.238:8080/1.jpg' + ')', backgroundSize:'100%'},
                {backgroundImage: 'url(' + 'http://172.16.12.238:8080/2.jpg' + ')', backgroundSize:'100%'},
                {backgroundImage: 'url(' + 'http://172.16.12.238:8080/3.jpg' + ')', backgroundSize:'100%'},
                {backgroundImage: 'url(' + 'http://172.16.12.238:8080/4.jpg' + ')', backgroundSize:'100%'},
                {backgroundImage: 'url(' + 'http://172.16.12.238:8080/5.jpg' + ')', backgroundSize:'100%'},
                {backgroundImage: 'url(' + 'http://172.16.12.238:8080/6.jpg' + ')', backgroundSize:'100%'},
                {backgroundImage: 'url(' + 'http://172.16.12.238:8080/7.jpg' + ')', backgroundSize:'100%'},
                {backgroundImage: 'url(' + 'http://172.16.12.238:8080/8.jpg' + ')', backgroundSize:'100%'},
                {backgroundImage: 'url(' + 'http://172.16.12.238:8080/9.jpg' + ')', backgroundSize:'100%'},
                {backgroundImage: 'url(' + 'http://172.16.12.238:8080/10.jpg' + ')', backgroundSize:'100%'},
              ]
   
              this.bgImg = nextImg[newNum];

          }
        },
    
    };
</script>
<style lang="less">
 @import url("./Home.less");
</style>
