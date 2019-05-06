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
          <el-button size="mini" type="warning" icon="el-icon-check" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {getRoleList, deleteRoleRight} from '@/api'
export default {
  data() {
    return {
      loading: false,
      rolesData: []
    }
  },
  created(){
    this.loading = true
     getRoleList().then(res => {
      //  console.log(res)
      if(res.meta.status === 200){
        this.rolesData = res.data
        this.loading = false
      }     
    })
  },
  methods: {
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
  }
</style>