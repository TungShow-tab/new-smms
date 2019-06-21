<template>
    <div class="PersonalCenter">
        <h2>个人中心</h2>
        <h3>账号:&emsp;&emsp;    {{ accountInfor.username }}</h3>
        <h3>密码:&emsp;&emsp;   {{ accountInfor.password }}</h3>
        <h3>用户组:&emsp;&emsp;    {{ accountInfor.usergroup }}</h3>
        <h3>最近登录时间:&emsp;&emsp;    {{accountInfor.ctime | filterCtime  }}</h3>
    </div>
</template>

<script>
// 引入请求函数
import { getInfo } from '@/api/account'

// 引入事件处理模块
import moment from 'moment'
import qs from 'qs'
export default {
    data() {
        return {
            accountInfor: {}
        }
    },
    methods: {
        getUserInfo() {
            // 发送请求 获取用户信息
            let username = window.localStorage.getItem('username')
            let params = {
                username
            }
            this.axios
            .post("http://172.16.12.238:5555/account/accountInfor",qs.stringify(params))
                .then(response => {
                    this.accountInfor = response.data.data[0]  
                    console.log(this.accountInfor)           
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    created() {
        this.getUserInfo();
    },
    filters: {
        filterCtime(ctime) {
            return moment(ctime).format('YYYY-MM-DD HH:mm:ss')
        }
    }
}  
</script>

<style lang="less">
    .PersonalCenter{
       background: rgba(235, 235, 235, 0.479);
       padding: 50px 0;
        color: #5835ac;
        font-weight: normal;
        text-align: left;
        h2{
            padding-left: 700px;
            line-height: 30px;
        }
        h3{
            padding-left: 600px;
            line-height: 30px;
        }
    }
</style>