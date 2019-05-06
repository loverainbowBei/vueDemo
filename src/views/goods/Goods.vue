<template>
  <div class="goods">
    <!-- 面包线头部 -->
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 搜索框 -->
    <el-row>
      <el-col :span="24">
          <!-- 给组件绑定事件修饰符的话，需要加一个native,以为事件修饰符是针对原生dom,而这里是组件直接使用不起作用,例如在input框中按回车 @keydown.enter="执行函数"  @keydown.native.enter="执行函数" -->
        <el-input placeholder="请输入搜索内容" class="searchButton">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain @click="addGoods">添加商品</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    addGoods(){
      this.$router.push({name: 'addGoods'})
    }
  },
}
</script>
<style lang="scss" scoped>
  .goods{
    .searchButton{
      width: 500px;
    }
  }
</style>
