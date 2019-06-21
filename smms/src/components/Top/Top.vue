<template>
    <div class="top">
        <el-header>
        <el-row>
            <el-col :span="12">
                <div  class="title">
                    <i class="el-icon-menu"></i>
                    罗德岛管理系统
                </div>

            
            </el-col>
            <el-col :span="12">
                <div class="top-right">
                    <el-row>
                        <el-col :span="18">
                            欢迎您， 
                            <el-dropdown @command="handleCommand">
                            <span class="username el-dropdown-link">
                                {{ username }} &emsp;!&emsp;<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="PersonalCenter">干员档案</el-dropdown-item>
                                <el-dropdown-item command="logout">离开基建</el-dropdown-item>
                            </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                        <el-col :span="6">
                            <div class="avatar">
                                <img width="100%" height="100%" :src="avatarUrl" alt="">
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        </el-header>
    </div>

</template>
<script>
export default {
    data () {
        return {
            username: "",
            avatarUrl: 'http://localhost:8080/ava.jpg'
        }
    },
    methods:{
        handleCommand(command) {
            //如果点退出
            if(command ==="logout"){
                window.localStorage.removeItem("token");
                this.$message({
                    type:"success",
                    message:"退出成功"
                });
                setTimeout(()=>{
                    this.$router.push("/login")
                },1000)

            }else if (command ==="PersonalCenter"){
                 this.$router.push("/home/PersonalCenter")
            }
        },
      
    },
  
    created(){
        this.username = window.localStorage.getItem("username")
    }
}
</script>
<style lang="less">

        .top {
            .el-header {
                line-height: 60px;
            border-bottom: 2px solid rgba(226, 226, 226, 0.49);
            .title {
                color: #fff;
                text-align: left;
                font-size: 20px;
                font-weight: normal;
            }
            .top-right {
                color: #fff;
                text-align: right;
                .username {

                    font-size: 16px;
                    color: #ff9500;
                }
                .avatar {
                    width: 52px;
                    height: 52px;
                    margin-top: 4px;
                    margin-left: 30px;
                    border-radius: 50%;
                    img {
                        border-radius: 50%;
                        
                    }
                }
            }
        }
    }

</style>


