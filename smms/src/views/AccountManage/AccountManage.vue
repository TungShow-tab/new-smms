<template>
    <div class="account-manage">
        <el-main>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>干员管理</span>
                </div>
                <div class="text item">
                    <el-table
                            ref="multipleTable"
                            :data="AccoutManagement"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection">
                        </el-table-column>

                        <!--用户名-->
                        <el-table-column
                                prop="username"
                                label="用户名">
                        </el-table-column>

                        <!--用户组-->
                        <el-table-column
                                prop="usergroup"
                                label="用户组"
                                show-overflow-tooltip>
                        </el-table-column>

                        <!--添加时间-->
                        <el-table-column
                                label="日期">
                            <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
                        </el-table-column>

                        <!--修改删除-->
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        type="Info"
                                        size="mini"
                                        @click="handleEdit(scope.row.id)">

                                    <i class="el-icon-edit"></i>编辑
                                </el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.row.id)">
                                    <i class="el-icon-delete"></i>删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="demonstration" style="padding-top: 30px;height: 50px;">
                        <el-pagination
                                style="height: 30px"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[1, 3, 5, 10]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>

                    <div class="bottomButtom">
                        <el-button @click="batchDelete()">批量删除</el-button>
                        <el-button @click="cancelSelect()">取消选择</el-button>
                    </div>


                    <!--修改的弹出框-->
                    <el-dialog title="用户名修改" width="800px" :visible.sync="flag">
                        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="editForm.username"></el-input>
                            </el-form-item>
                            <el-form-item label="用户组" prop="usergroup">
                                <el-select v-model="editForm.usergroup" placeholder="用户组">
                                    <el-option label="超级管理员" value="超级管理员"></el-option>
                                    <el-option label="普通管理员" value="普通管理员"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>

                        <!--分页-->

                        <div slot="footer" class="dialog-footer">


                            <el-button type="primary" @click="saveNewmsg('editForm')">确 定</el-button>
                            <el-button @click="flag=false">取 消</el-button>


                        </div>
                    </el-dialog>
                </div>
            </el-card>
        </el-main>
    </div>
</template>

<script>
import moment from "moment";
import qs from "qs";
// 引入封装的请求函数
import { batchDelete, accountEdit, accountDel, saveEdit, getDataByPage } from '@/api/account'
    export default {
         created(){
            // this.getAccount();
            this.getAccountbyPage();
        },
        data() {
            return {
                AccoutManagement: [],
                multipleSelection: [],
                flag:false,
                editForm:{
                    username:"",
                    usergroup:""
                },
                editFormRules: {
                    username:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '用户名长度在 3 到 5 位', trigger: 'blur' }
                    ],
                    usergroup:[
                        {required: true, message:"请选择用户组", trigger: 'change' }
                    ]
                },
                editId:"",
                selectedAccount:[],
                accoutManagement:1,
                currentPage:1,
                total:5,
                pageSize:3,
            }
        },
        methods:{
            // getAccount(){
            //     this.axios.get("http://172.16.12.238:5555/account/accountList")
            //         .then(response =>{
            //             this.AccoutManagement = response.data
            //         })
            //         .catch(err=>{
            //             console.log(err)
            //         })
            // },
            getAccountbyPage(){
                 let params = {
                    pageSize : this.pageSize,
                    currentPage : this.currentPage
                 }
               
                getDataByPage(params)
                    .then(res =>{
                        let {total,data} =res
                        this.total =total;
                        this.AccoutManagement =data;
                        if(!data.length && this.currentPage !==1){
                            this.currentPage -= 1;
                            this.getAccountbyPage();
                        }
                    })
                    .catch(err =>{
                        console.log(err)
                    })
            },
             handleSizeChange(val) {
                this.pageSize = val;
                this.getAccountbyPage();
            },
            handleCurrentChange(val) {
                this.currentPage =val;
                this.getAccountbyPage();
            },
            handleSelectionChange(val) {
                //被选中的
                this.selectedAccount = val;
            },

            handleEdit(id) {
                // 弹出模态框
            this.visible = true;
            // 保留id 这个id就是要修改的数据的id
            this.editId = id;

                 accountEdit({ id })
                    .then(res =>{
                        let result =res;
                        //回填表单
                        this.editForm.username = result[0].username;
                        this.editForm.usergroup = result[0].usergroup;
                        this.flag = true;
                })
                    .catch(err =>{
                        console.log(err)
                    })

            },
            handleDelete(id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   accountDel({ id })
                        .then(res =>{
                            let {error_code,reason}= res;
                            if(error_code ===0){
                                this.$message({
                                    type:"success",
                                    message:"删除数据成功"
                                });
                                this.getAccountbyPage();
                            }else{
                                this.$message.error("删除数据失败")
                            }
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '已取消删除'
                    });
                });

            },
            saveNewmsg(formName){
                this.$refs[formName].validate((valid) => {
                        if (valid) {
                            let params ={
                                username:this.editForm.username,
                                usergroup:this.editForm.usergroup,
                                editId:this.editId
                            };
                            saveEdit(params)
                                .then(res => {
                                    // console.log(response.data);
                                    let {error_code,reason}= res;
                                    if(error_code ===0){
                                        this.$message({
                                            type:"success",
                                            message:"修改用户名成功"
                                        });
                                        this.getAccountbyPage();
                                    }else{
                                        this.$message.error("修改用户名失败")
                                    }
                                    this.flag = false;
                                })
                                .catch(err =>{
                                    console.log(err);
                                    this.$message({
                                        type: 'warning',
                                        message: '已取消删除'
                                    });
                                });
                        }
                });
            },
            cancelSelect() {
                this.$refs.multipleTable.clearSelection();
            },
            handleSelectionChange(val) {
                //被选中的
                this.selectedAccount = val;
            },
            batchDelete(){
                let selectedId = this.selectedAccount.map(v =>v.id );
                //console.log(selectedId)
                if(!selectedId.length){
                    this.$message.error("请选择要删除数据，再操作");
                    return;
                }this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   let params =  { selectedId }

                     // 发送请求 把"id们"发送给后端
                    batchDelete(params)
                        .then(res =>{
                            let {error_code,reason} = res;
                            if(error_code ===0){
                                this.$message({
                                    type:"success",
                                    message:reason
                                });
                                this.getAccountbyPage();
                            }else{
                                this.$message.error(reason)
                            }
                        })
                        .catch(res =>{
                            console.log(err)
                        })

                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '已取消删除'
                    });
                });



            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getAccountbyPage();
            },
            handleCurrentChange(val) {
                this.currentPage =val;
                this.getAccountbyPage();
            }
        },
        filters:{
            filterCtime(ctime){
                return moment(ctime).format("YYYY/MM/DD HH:mm:ss")
            }
        }
    }
</script>

<style lang="less">
@import url("./AccountManage.less");
    
</style>