<template>
  <div class="right">
    <!-- 头部面包线 -->
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">角色管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 表格内容部分 -->
    <el-table v-loading="loading" :data="rightList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          <!-- fmtLevel过滤器对前面的数据进行过滤，即把数字0,1,2 换成一级 二级 三级  -->
          <span>{{scope.row.level | fmtLevel}}</span> 
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {getRightList} from '@/api'
export default {
  data () {
    return {
      loading: false,
      rightList: []
    }
  },
  // 定义过滤器
  filters: {
    fmtLevel(level){
      switch(level){
        case '0': return '一级';
        break;
        case '1': return '二级';
        break;
        case '2': return '三级';
        break;
      }
    }
  },
  created(){
    getRightList({type:'list'}).then(res => {
      // console.log(res);
      if(res.meta.status === 200){
        this.rightList = res.data
      }
    })
  }
}
</script>
<style lang="scss" scoped>

</style>
