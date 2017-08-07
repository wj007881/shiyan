<template>
    <div class="login-wrap">
        <div class="ms-title">教师登录系统</div>
        <div class="ms-login">
         <el-button type="primary" @click="adlogin">管理员</el-button><el-button type="primary" @click="tealogin">教师</el-button><el-button type="primary" @click="stulogin">学生</el-button>
          <br/>
          <br/>
            <el-form :model="ruleForm" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username" id="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" id="password"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click='submitForm' id="btn_login">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import VueRouter from 'vue-router';
const router = new VueRouter();

    export default {
        data: function(){
            return {
                 ruleForm: {
                    username: '',
                    password: ''
                }
             }
    },
         methods: {
            submitForm:function() {
               axios.post("http://172.16.186.93:3000/tea_login",{
                   'code':this.ruleForm.username,
                   'password':this.ruleForm.password
               })
                .then((response)=> {
                   
                    if(response.data.success == true){
                        this.$store.commit("changeState",{
                          loginID:this.ruleForm.username  
                        })
                        router.push( '/teacher' );
                        return;
                    } if(response.data.description == 3){
                        alert('请检查密码');
                        return;
                    } if(response.data.description == 4){
                        alert('请检查用户名');
                        return;
                    }
                          }) 
                        },
                            adlogin:function(){
                                this.$router.push('/ad_login');
                        },
                            tealogin:function(){
                                this.$router.push('/tea_login');
                        },
                            stulogin:function(){
                                this.$router.push('/stu_login');
                        },
}
    }
</script>

<style scoped>
   
    .ms-title{
        position: absolute;
        width: 100%;
        text-align: center;
        top:20%;
        font-size: 30px;
        margin-top:-20px;
    }

    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:200px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background:#475669;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>