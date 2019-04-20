<template>
  <div>
    <!-- 面包线头部 -->
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 搜索框 -->
    <el-row>
      <el-col :span="24">
          <!-- 给组件绑定事件修饰符的话，需要加一个native,以为事件修饰符是针对原生dom,而这里是组件直接使用不起作用,例如在input框中按回车 @keydown.enter="执行函数"  @keydown.native.enter="执行函数" -->
        <el-input placeholder="请输入内容" class="searchButton" v-model="query" @keydown.native.enter="initList">
          <el-button slot="append" icon="el-icon-search" @click="initList()"></el-button>
        </el-input>
        <el-button type="success" plain>成功按钮</el-button>
      </el-col>
    </el-row>
    <!-- 表格内容部分 -->
    <el-table
      :data="userList"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮件"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column label="用户开关">
        <template slot-scope="scope">
          <el-switch v-model="value3">用户开关</el-switch>    <!-- 一个操作开关-->
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" plain></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
          <el-button size="mini" type="warning" icon="el-icon-check" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 底边分页部分 -->
    <el-row class="page">
      <el-col :span="24">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getUserList} from '../../api'  //或者写为: @/api
export default {
  data() {
    return {
      userList: [],
      value3: true,
      total: 0,
      pagesize: 1, //每页几条数据，默认一条 
      pagenum: 1,  //当前页
      query: ''
     }
  },
  mounted(){  //在mounted钩子函数中调用initList
    this.initList()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val
      this.initList()
     },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val
      this.initList()
    },
    initList(){
      getUserList(
        {
          params: {query: this.query , pagenum: this.pagenum, pagesize: this.pagesize}}
        ).then(res => {
          console.log(res)
          this.userList = res.data.users
          this.total = res.data.total
      })
    }
  }
}
</script>

<style lang="scss">
  .searchButton {
    width: 300px;
  }
  .el-table {
    margin: 10px 0;
  }
  .page {
    padding: 10px 0px 10px 6px;
    background-color: #d3dce6; 
  }
</style>