<template>
  <div class="role">
    <!-- 头部面包线 -->
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">角色管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 按钮 -->
    <el-button type="info" plain>添加角色</el-button>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      class="margin-15"
      border
      :data="rolesData"
      style="width: 100%"
      row-key="id">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="firstChildren in scope.row.children" :key="firstChildren.id">
            <el-col :span="3">
              <el-tag closable @close="deleteRight(scope.row, firstChildren.id)">
                {{firstChildren.authName}}
              </el-tag>
              <i class="el-icon-arrow-right" v-if="firstChildren.children.length !==0"></i>
            </el-col>
            <el-col :span="21">
              <el-row v-for="secondChildren in firstChildren.children" :key="secondChildren.id">
                <el-col :span="4">
                  <el-tag closable type="success" @close="deleteRight(scope.row, secondChildren.id)">
                    {{secondChildren.authName}}
                  </el-tag>
                  <i class="el-icon-arrow-right" v-if="secondChildren.children.length !==0"></i>
                </el-col>
                <el-col :span="20">
                      <el-tag closable type="warning" v-for="thirdChildren in secondChildren.children" :key="thirdChildren.id" @close="deleteRight(scope.row, thirdChildren.id)">
                        {{thirdChildren.authName}}
                      </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length === 0">
            <el-col :span="24">该角色没有权限，请分配权限</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="40px">
      </el-table-column>
      <el-table-column
        label="角色名称"
        prop="roleName"
        width="140px">
      </el-table-column>
      <el-table-column
        label="角色描述"
        prop="roleDesc"
        width="140px">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" plain></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
          <el-button size="mini" type="warning" icon="el-icon-check" plain title="授权角色" @click="roleRightDialog(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 授权角色对话框 -->
    <el-dialog title="授权角色" :visible.sync="dialogRoleVisible">
      <div class="treeContainer">
        <el-tree 
          :data="rightData" 
          show-checkbox 
          ref="tree"
          node-key="id"
          :default-expand-all="true"
          :default-checked-keys="selectedRights"
          :props="defaultProps">
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRoleVisible= false">取 消</el-button>
        <el-button type="primary" @click="submitRight">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {getRoleList, deleteRoleRight, getRightList, addRoleRight} from '@/api'
export default {
  data() {
    return {
      loading: false,
      rolesData: [],
      dialogRoleVisible: false,
      rightData: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      selectedRights: [],  //保存已经选择的项目的id
      currentRole: {}  //保存点击的角色
    }
  },
  created(){
    this.initRoleList()
  },
  methods: {
    //初始化授权列表
    initRoleList(){
      this.loading = true
      getRoleList().then(res => {
        //  console.log(res)
        if(res.meta.status === 200){
          this.rolesData = res.data
          this.loading = false
        }     
      })
    },
    deleteRight(row, rightId){
      //console.log(role.id, rightId)  //roleId 获取的是这个角色的数据
      deleteRoleRight({roleId: row.id,  rightId: rightId}).then(res => {
        console.log(res)  //这里返回的数据就是删除之后的数据
        if(res.meta.status === 200){
          row.children = res.data
        }else{
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
      })
    },
    roleRightDialog(row){
      this.dialogRoleVisible = true
      this.currentRole = row   //row 代表当前的角色，把他储存到currentRole中
      getRightList({type: 'tree'}).then(res => {
        if(res.meta.status === 200){
          // console.log(res);
          this.rightData = res.data
        }else{
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
      })
      //遍历之前，清空已选择的权限
      this.selectedRights.length = 0
      //取出当前角色的所有权限，然后遍历到他的第三个children，取出他里面的所有项的id，放到selectedRight中
      this.currentRole.children.forEach(first => {
        if(first.children && first.children.length !== 0){
          first.children.forEach(second => {
            if(second.children && second.children.length !== 0){
              second.children.forEach(third => {
                this.selectedRights.push(third.id) 
              })
            }
          })
        }
      })
    },
    //为角色添加权限
    submitRight(){
      //this.$refs.tree.getCheckedKeys() 获取当前角色现有的权限， join 将其转化为字符串并且用逗号隔开
      let rids = this.$refs.tree.getCheckedKeys().join(',')
      console.log(rids);
      addRoleRight(this.currentRole.id, {rids: rids}).then(res => {
        if(res.meta.status === 200){
          this.$message({
            type: 'success',
            message: '授权成功啦' 
          })
          this.dialogRoleVisible = false
          this.initRoleList()
        }
      })   
    }
  }
}
</script>
<style lang="scss" scoped>
  .role{
    .el-tag{
      margin-left: 10px;
      margin-bottom: 10px;
    }
    .treeContainer {
      height: 300px;
      overflow: auto;
    }
  }
</style>