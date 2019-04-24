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
        <el-button type="success" plain @click="addFormDialog=true">添加用户</el-button>
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
        label="qq邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column label="用户开关">
        <template slot-scope="scope">
          <!-- 一个操作开关-->
          <el-switch v-model="scope.row.mg_state" @change="UserState(scope.row)">用户开关</el-switch> 
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="showFormDialog(scope.row)"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="showDeleDialog(scope.row)"></el-button>
          <el-button size="mini" type="warning" icon="el-icon-check" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加用户对话框 -->
  <el-dialog title="添加账户" :visible.sync="addFormDialog">
      <!-- ref="addUserForm"将表单命名为addUserForm，在点击确定按钮时，将该form表单作为参数传进去 -->
    <el-form :model="addForm" label-width="80px" :rules="rules" ref="addUserForm">
      <el-form-item label="用户名" prop="username">  <!--prop为校验字段 必须写 -->
        <el-input v-model="addForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="mobile">
        <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addFormDialog = false">取 消</el-button>
      <el-button type="primary" @click="addUserSubmit('addUserForm')">确 定</el-button>
    </div>
  </el-dialog>
    <!-- 编辑用户对话框 -->
  <el-dialog title="编辑账户" :visible.sync="editFormDialog">
      <!-- ref="editUserForm"将表单命名为editUserForm，在点击确定按钮时，将该form表单作为参数传进去 -->
    <el-form :model="editForm" label-width="80px" :rules="rules" ref="editUserForm">
      <el-form-item label="用户名" prop="username">  <!--prop为校验字段 必须写 -->
        <el-input v-model="editForm.username" autocomplete="off" :disabled="true" size="small"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="mobile">
        <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editFormDialog = false">取 消</el-button>
      <el-button type="primary" @click="editUserSubmit('editUserForm')">确 定</el-button>
    </div>
  </el-dialog>
    <!-- 底边分页部分 -->
    <el-row class="page">
      <el-col :span="24">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入在路由中定义好的函数方法
import {getUserList,changeUserState,addUsername,getUserId,editUserSubmit,deleUser} from '../../api'  //或者写为: @/api
export default {
  data() {
    return {
      userList: [],
      total: 0,
      pagesize: 10, //每页几条数据，默认一条 
      pagenum: 1,  //当前页
      query: '',
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      editForm: {
        username: '',
        email: '',
        mobile: '',
        id: 0
      },
      addFormDialog: false,
      editFormDialog: false,
      //添加用户表单的校验规则
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确却的邮箱格式', trigger: 'blur,change'}
        ],
        mobile: [
          {required: true, message: '电话不能为空'}
        ]
      }
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
    },
    //改变用户状态
    UserState(row){
      console.log(row)
      changeUserState({uId: row.id, type: row.mg_state}).then(res => {
        console.log(res)
        if(res.meta.status === 200){
          this.$message({
            type: 'success',
            message: '更改用户状态成功啦'
          })
        }else{
          this.$message({
            type: 'warning',
            msg: res.meta.msg
          })
        }
      })
    },
    //添加用户
    addUserSubmit(formName){
      this.$refs[formName].validate(valide => {
        if(valide){
          //这里执行添加用户的方法
          addUsername(this.addForm).then(res => {
            console.log(res)
            if(res.meta.status === 201){
              this.$message({
                type:'success',
                message: '添加用户成功啦!'
              })
            }
            this.addFormDialog = false
            this.initList()
          })
        }
      })
    },
    //显示编辑对话框
    showFormDialog(row){
      this.editFormDialog = true
      // console.log(row) 点击编辑按钮时执行此方法
      getUserId(row.id).then(res => {
        // console.log(res)
        this.editForm.username = res.data.username
        this.editForm.email = res.data.email
        this.editForm.mobile = res.data.mobile
        this.editForm.id = res.data.id  //将id也保存到数据中，方便线面获取
      })
    },
    //编辑用户信息后提交
    editUserSubmit(formName){
      this.$refs[formName].validate(valide => {
        if(valide){
          editUserSubmit(this.editForm).then(res => {
            console.log(res)
            if(res.meta.status === 200){
              this.$message({
                type: 'success',
                message: '更新数据成功了!'
              })
              this.editFormDialog = false
              this.initList()
            }else{
              this.$message({
                type: 'warning',
                msg: res.meta.msg
              })
            }
          })
        }
      })
    },
    //显示删除对话框
    showDeleDialog(row){
      // console.log(row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 执行删除操作
          deleUser(row.id).then(res => {
            console.log(res)
            if(res.meta.status === 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.initList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })          
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