<template>
    <div class="password-modify">
       <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">修改干员密码</span>
            </div>
            <div class="text item">
                <el-form ref="passwordmodify"
                         :model="passwordmodify"
                         label-width="80px"
                         status-icon
                         :rules="passwordmodifyRules"
                >
                    <el-form-item label="原密码：" prop="oldpwd">
                        <el-input v-model="passwordmodify.oldpwd"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码：" prop="newpwd">
                        <el-input v-model="passwordmodify.newpwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码：" prop="checknewpwd">
                        <el-input v-model="passwordmodify.checknewpwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('passwordmodify')">提交</el-button>
                        <el-button @click="resetForm('passwordmodify')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    import qs from "qs";
    import router from "../../router";
     export default {
        data() {
            const password = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error("请输入新密码"))
                } else if (value.length < 3 || value.length > 6) {
                    callback(new Error("密码长度3-6位"))
                } else if (value === this.passwordmodify.oldpwd) {
                    callback(new Error("与原密码相同"))
                }
                else {
                    if (this.passwordmodify.checknewpwd !== '') {
                        this.$refs.passwordmodify.validateField('checknewpwd')
                    }
                    callback();
                }
            };

            const checkPwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error("请再次输入新密码"))
                } else if (value !== this.passwordmodify.newpwd) {
                    callback(new Error("两次密码不一致"))
                }
                callback();
            };

             const checkoldpwd = (rule, value, callback) => {
                let username = window.localStorage.getItem("username");
                this.axios.get(`http://172.16.12.238:5555/account/checkoldpwd?oldPwd=${value}&username=${username}`)
                    .then(response => {
                        let {error_code, reason} = response.data;
                        if (error_code === 0) {
                            callback();
                        } else {
                            callback(new Error(reason));
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            };
            return {
                passwordmodify: {
                    oldpwd: "",
                    newpwd: "",
                    checknewpwd: ""
                },
                passwordmodifyRules: {
                    oldpwd: [
                        {required: true, validator: checkoldpwd, trigger: 'blur'}
                    ],
                    newpwd: [
                        {required: true, validator: password, trigger: 'blur'}
                    ],
                    checknewpwd: [
                        {required: true, validator: checkPwd, trigger: 'blur'}
                    ],
                }
            };

        },
        methods: {
            submitForm(formName) {
                
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        let params = {
                            username: window.localStorage.getItem("username"),
                            oldpwd: this.passwordmodify.oldpwd,
                            newpwd: this.passwordmodify.newpwd,
                        };
                        console.log(params)
                        this.axios.post("http://172.16.12.238:5555/account/savenewpwd", qs.stringify(params))
                            .then(response => {
                                let {error_code, reason} = response.data;
                                if (error_code === 0) {
                                    this.$message({
                                        type: "success",
                                        message: reason
                                    });
                                    window.localStorage.removeItem("token");
                                    this.$router.push("/Login");
                                } else {
                                    callback(new Error(reason));
                                }

                            }).catch(err => {
                            console.log(err)
                        })

                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="less">
 @import url("./PsswordModify.less");
</style>