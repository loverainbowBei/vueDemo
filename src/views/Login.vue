<template>
  <div class="login">
    <el-form ref="form" :model="form" class="container" :rules="rules">
      <el-form-item>
        <div class="logo">
          <img src="../assets/avatar.jpg" alt="logo">
        </div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="账号" prefix-icon="myicon myicon-user" type="text"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码" prefix-icon="myicon myicon-key" type="password" @keydown.native.enter="loginSubmit('form')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="loginSubmit('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//引入接口函数
import {checkUser} from '@/api'

  export default {
    data() {
      return {
        form: {
          uesrname:'',
          password:''
        },
        rules: {
          username: [
            { required: true, message: '请输入账户名称', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      loginSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          //验证通过执行 this.form为参数
          if (valid) {
            checkUser(this.form).then(res => {
             //  如果登录成功跳转至首页，失败弹出提示信息
              if(res.meta.status === 200){            
                localStorage.setItem('mytoken', res.data.token) //登录成功后把token 保存到localStorage中,
                this.$store.commit('setUsername', res.data.username)  //将username保存到vuex的state中
                this.$router.push({name: 'Home'})
              }else{
                this.$message({
                  type: 'error',
                  message: res.meta.msg
                })
              }
            }) 
          } else {
            console.log('验证失败');
            return false;
          }
        });
      },
    }
  }
</script>
<style lang="scss" scoped>
  .login {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #2f4050;
  }
  .container {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    padding: 0px 30px 15px 40px;
    margin: 150px auto;
    background: white;
  }
  .logo {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 120px;
    margin-top: 60px;
    box-sizing: border-box;
    border-radius: 50%;
    border: 10px solid #fff;
    box-shadow: 0 1px 5px #ccc;
    overflow: hidden;
  }
  .login-btn{
    width: 100%;
  }
</style>

