<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <div class="logo"></div>
        <!-- 侧边栏 -->
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-admin"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>            
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">用户列表</span>
                </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
//引入请求用户列表的接口
import {getUserList} from '@/api'
export default {
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
  mounted(){
    let params = {params: {query: '', pagenum: 1, pagesize: 1}} //由于请求函数需要传递一个参数
    getUserList(params).then(res => {
      console.log(res)
    })
  }
}
</script>
<style lang="scss" scoped>
  .home {
    height: 100%;
    .el-menu-admin:not(.el-menu--collapse){
      width: 200px;
      min-height: 400px;
    }
    .el-col-12{
      width: 100%;
    }
    .el-container{
      height: 100%;
    }
    .el-aside{
      background-color: #545c64;
    }
    .el-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #545c64;
    }
    .logo {
      height: 60px;
      background: url('../assets/logo.png');
      //把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。
      background-size: cover;  
      background-color: #989898;
    }
    .toggle-btn{
      font-size: 36px;
      color: #989898;
      cursor: pointer;
      line-height: 60px;
    }
    .header-title{
      font-size: 28px;
      color: #fff;
    }
    .logout-btn{
      color: orange;
    }
  }
</style>

