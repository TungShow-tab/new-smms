
<template>
  
  <div class="login" :style="bgImg" >
    <div @click="change()" id = "CBg">更 换 壁 纸</div>
    <div class="login-form">
      <h3 ><span class="el-icon-s-home"></span>罗德岛系统-登陆</h3>
      <el-form
              :model="loginForm"
              status-icon
              :rules="rules"
              ref="loginForm"
              label-width="100px"
              class="demo-ruleForm"
      >
        <el-form-item label="Doctor" prop="username">
          <el-input v-model.number="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <button type="button" @click="submitForm('loginForm')" class="myBtn">访问基建</button>
          <button type="button" @click="resetForm('loginForm')" class="myBtnR">重置访问</button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  // 引入工具函数
  import { pwdReg } from '@/utils/reg';

  // 引入请求函数
  import { checkLogin } from '@/api/login'

    import qs from "qs";

    export default {
        data() {
            const password = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("Doctor记得输入密码"));
                } else if (value.length < 3 || value.length > 6) {
                    callback(new Error("Doctor的密码长度3-6位"));
                } else {
                    if (this.loginForm.checkPass !== "") {
                        this.$refs.loginForm.validateField("checkPass");
                    }
                    callback();
                }
            };

            const checkPwd = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("Doctor还要输入一次密码"));
                } else if (value !== this.loginForm.pass) {
                    callback(new Error("Doctor是不是忘记了密码呢"));
                }
                callback();
            };
            return {
                loginForm: {
                    username: "",
                    pass: "",
                    checkPass: ""
                },
                rules: {
                    username: [
                        { required: true, message: "Doctor的名字不对哦", trigger: "blur" },
                        { min: 3, max: 5, message: "Doctor的名字长度在 3 到 5 位", trigger: "blur" }
                    ],
                    pass: [{ required: true, validator: password, trigger: "blur" }],
                    checkPass: [{ required: true, validator: checkPwd, trigger: "blur" }]
                },
                bgImg: {backgroundImage: 'url(' + 'http://172.16.12.238:8080/10.jpg' + ')', backgroundSize:'100%'},
                num: 0,
                
            };
        },
       methods: {
          submitForm(formName) {
              this.$refs[formName].validate((valid) => {
              if (valid) {
                
                let params = {
                      username: this.loginForm.username,
                      password: this.loginForm.pass
                  };
                  // console.log(params)
                  checkLogin(params)
                  .then(res => {
                                let { error_code, reason,token,username} = res;
                                if (error_code === 0) {
                                    window.localStorage.setItem("token",token);
                                    window.localStorage.setItem("username",username);
                                    this.$router.push("/home/systeminfo");
                                    this.$message({
                                        type: "success",
                                        message: reason
                                    });
                                } else {
                                    this.$message.error(reason);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
              } else {
                  console.log("error submit!!");
                  return false;
              }
              });
          },
          resetForm(formName) {
              this.$refs[formName].resetFields();
          },
         
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
    }
</script>
<style lang=less>
  @import url("./Login.less");
</style>
