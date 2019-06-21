<template>
    <el-aside width="200px">
        <p class="title">罗德岛管理系统</p>
        <el-menu
                 active-text-color="rgb(255, 255, 255)"
                 background-color="rgba(255, 0, 22, 0.09)"
                 unique-opened
                 :default-active="this.$route.path"
                 router
        >
            <el-submenu :index="(i+1) + ''" v-for="(nav, i) in Nav" :key="i">
                    <template slot="title">
                        <i :class="nav.iconCls"></i>
                        <span>{{ nav.navTitle }}</span>
                    </template>

                    <el-menu-item 
                        v-for="(subNav, i) in nav.children"
                        :key="i"
                        :index="subNav.path"
                        >
                        {{ subNav.navSubTitle }}
                    </el-menu-item>
            </el-submenu>   
        </el-menu>
    </el-aside>
</template>

<script>
    export default {
        name: "Nav",
         data() {
            return {
                Nav: [ // 左侧导航数据
                    // 导航1
                    {
                        iconCls: 'el-icon-s-tools',
                        navTitle: '基建管理',
                        children: [
                            { path: '/home/systeminfo', 'navSubTitle': '基建信息' }
                        ]
                    },
                     // 导航2
                    {
                        iconCls: 'el-icon-s-order',
                        navTitle: '角色管理',
                        children: [
                            { path: '/home/accountmanage', 'navSubTitle': '干员管理' },
                            { path: '/home/accountadd', 'navSubTitle': '添加干员' },
                            { path: '/home/passwordmodify', 'navSubTitle': '密码修改' },
                        ]
                    },
                     // 导航3
                    {
                        iconCls: 'el-icon-s-goods',
                        navTitle: '贸易管理',
                        children: [
                            { path: '/home/goodsmanage', 'navSubTitle': '订单管理' },
                            { path: '/home/goodsadd', 'navSubTitle': '添加订单' }
                        ] 
                    },
                     // 导航4
                    {
                        iconCls: 'el-icon-tickets',
                        navTitle: '统计管理',
                        children: [
                            { path: '/home/selltotal', 'navSubTitle': '环境状态' },
                            
                        ]   
                    },
                    {
                        iconCls: 'el-icon-sold-out',
                        navTitle: '出货管理',
                        children: [
                            
                            { path: '/home/stocktotal', 'navSubTitle': '商品出库' },
 
                        ]   
                    },
                    {
                        iconCls: 'el-icon-user-solid',
                        navTitle: '个人中心',
                        children: [
                            
                            { path: '/home/PersonalCenter', 'navSubTitle': '用户详情' },
 
                        ]   
                    },
                   
                ]
            }
        }
    }
</script>

<style lang="less">
    .el-aside {
        background-color: rgba(235, 235, 235, 0.109);
        color: #fff;
        text-align: center;
        line-height: 200px;

        .title{
            margin: 0;padding: 16px 0;
            line-height: 30px;
        }
        .el-submenu__title{
            color: #fff;
            background: none!important;
        }

        .el-submenu{
            background: none!important;
        }
        .el-menu-item.is-active{
            color: #fff;
            background-color: rgba(226, 226, 226, 0.49)
        }
        .el-menu-item{
            color: #919191;
            background: none!important;
        }

        .el-menu .el-menu--inline{
            background: none!important;
        }
        .el-menu {
            background: none!important;
            border-right: 0;

        }
    }
</style>