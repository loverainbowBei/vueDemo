<template>
  <div class="categories">
     <!-- 面包线头部 -->
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 添加按钮 -->
    <el-row>
      <el-col :span="24">
        <el-button type="success" plain @click="addCate">添加分类</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <tree-grid
      v-loading="loading"
      class="margin-15"
      :treeStructure="true"
      :columns="columns"
      :data-source="dataSource"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
      row-key="id">
    </tree-grid>
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
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="addCateDialog">
      <el-form :model="addForm" label-width="80px" :rules="rules" ref="addCateForm">
        <el-form-item label="分类名称" prop="cat_name">  <!--prop为校验字段 必须写 -->
          <el-input v-model="addForm.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类别">
          <el-cascader :options="options" v-model="selectedOptions" @change="handleChange" :props="props"></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCateDialog = false">取 消</el-button>
        <el-button type="primary" @click="addCateSubmit('addCateForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script> 
import TreeGrid from '../../components/TreeGrid/TreeGrid'
import {getCategories, addCategories} from '../../api/index'
export default {
  data () {
    return {
      dataSource: [],
      total: 0,
      loading: false,
      pagesize: 10, //每页几条数据，默认一条 
      pagenum: 1,  //当前页
      addCateDialog: false,  //点击添加分类弹出对话框
      options: [],   //级联选择器中的数据
      selectedOptions: [],  //级联选择器中选中的数据 
      props: {    //配置级联选择器要展示的数据字段
        value: 'cat_id',
        label: 'cat_name'
      }, 
      addForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      columns: [
        {
          text: '分类名称',
          dataIndex: 'cat_name',
          width: ''
        },
        {
          text: '是否有效',
          dataIndex: 'cat_deleted',
          width: ''
        },
        {
          text: '排序',
          dataIndex: 'cat_level',
          width: ''
        }
      ],
      rules: {   //表单验证
        catename: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
      }
    }
  },
  created(){
    this.initCateList()
  },
  methods: {
    deleteCategory (cid) {
      console.log(cid)
    },
    editCategory (cid) {
      console.log(cid)
    },
      handleSizeChange(val) {  // 分页中的事件
      console.log(`每页 ${val} 条`);
      this.pagesize = val
      this.initCateList()
     },
      handleCurrentChange(val) {   //分页中的事件
      console.log(`当前页: ${val}`);
      this.pagenum = val
      this.initCateList()
    },
    handleChange(value) {   //对话框的选中事件
      console.log(value);
    },
    addCate(){    //点击添加商品分类按钮事件
      this.addCateDialog = true
       getCategories({type: '2'}).then(res => {
         if(res.meta.status === 200){
           console.log(res);
           this.options = res.data
         }
       })
    },
    addCateSubmit(formName){
      this.$refs[formName].validate(valied => {
        if(valied){
          if(this.selectedOptions.length === 0){
            this.addForm.cat_pid = 0
            this.addForm.cat_level = 0
          }else if (this.selectedOptions.length === 1){
            this.addForm.cat_pid = this.selectedOptions[this.selectedOptions.length - 1]
             this.addForm.cat_level = 1
          }else {
            this.addForm.cat_pid = this.selectedOptions[this.selectedOptions.length - 1]
            this.addForm.cat_level = 2
          }
          addCategories(this.addForm).then(res => {
            if(res.meta.status === 201){
              // console.log(res);
              this.addCateDialog = false
              this.$message({
                type: 'success',
                message: '添加分类成功！'
              })    
              this.addForm.cat_name = '',
              this.selectedOptions = []
            }
          })
        }
      })

    },
    initCateList(){
      this.loading = true
      getCategories({type: '3', pagesize: this.pagesize, pagenum: this.pagenum}).then(res => {
        // console.log(res);
        if(res.meta.status === 200) {
          this.total = res.data.total
          this.dataSource = res.data.result
          this.loading = false
        }
      })
    }
  },
  components: {
    TreeGrid    //注册该组件
  }
}
</script>
<style lang="scss" scoped>
  .page {
    padding: 10px 0px 10px 6px;
    background-color: #d3dce6; 
  }
</style>

