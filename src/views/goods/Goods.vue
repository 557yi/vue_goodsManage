/**
 * 基础菜单 商品管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.deptName" placeholder="输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.deptNo" placeholder="输入商品ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="id" label="商品ID" width="300">
      </el-table-column>
      <el-table-column sortable prop="name" label="商品名称" width="300">
      </el-table-column>
      <el-table-column sortable prop="category" label="商品分类" width="300">
      </el-table-column>
      <el-table-column sortable prop="price" label="商品价格" width="300">
      </el-table-column>
      <el-table-column sortable prop="num" label="商品数量" width="300">
      </el-table-column>
      <el-table-column sortable prop="status" label="商品状态" width="300">
      </el-table-column>
      <el-table-column sortable prop="createdAt" label="商品创建时间" width="300">
      </el-table-column>
      <el-table-column sortable prop="updatedAt" label="修改时间" width="300">
        <!-- <template slot-scope="scope">
          <div>{{scope.row.editTime|timestampToTime}}</div>
        </template> -->
      </el-table-column>
      <!-- <el-table-column sortable prop="editUser" label="修改人" width="300">
      </el-table-column> -->
      <el-table-column align="center" label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="商品名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="discription">
          <el-input size="small" v-model="editForm.discription" auto-complete="off" placeholder="请输入商品描述"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="category">
          <el-input size="small" v-model="editForm.category" auto-complete="off" placeholder="请输入商品分类id"></el-input>
        </el-form-item>
        <el-form-item label="商品图片路径" prop="imgurl">
          <el-input size="small" v-model="editForm.imgurl" auto-complete="off" placeholder="请输入商品图片路径"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input size="small" v-model="editForm.price" auto-complete="off" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input size="small" v-model="editForm.num" auto-complete="off" placeholder="请输入商品数量"></el-input>
        </el-form-item>
        <el-form-item label="商品折扣价" prop="discountPrice">
          <el-input size="small" v-model="editForm.discountPrice" auto-complete="off" placeholder="请输入商品折扣价"></el-input>
        </el-form-item>
        <el-form-item label="商品折扣开始时间" prop="discountBegin">
          <el-input size="small" v-model="editForm.discountBegin" auto-complete="off" placeholder="请输入商品折扣开始时间"></el-input>
        </el-form-item>
        <el-form-item label="商品折扣结束时间" prop="discountEnd">
          <el-input size="small" v-model="editForm.discountEnd" auto-complete="off" placeholder="商品折扣结束时间"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deptList, deptSave, deptDelete } from '../../api/userMG'
import{GoodsList,GoodsSave,GoodsDelete,GoodsListsearch} from '../../api/basisMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '添加',
      editForm: {
        name:'',
          category:0,
          discription:'',
          imgurl:"",
          price:0,
          num:0,
          discountPrice:0,
          discountBegin:0,
          discountEnd:0,
      },
      editID:0,
      // rules表单验证
      rules: {
        deptName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        deptNo: [{ required: true, message: '请输入商品ID', trigger: 'blur' }]
      },
      formInline: {
        page: 1,
        limit: 10,
        varLable: '',
        varName: '',
        token: localStorage.getItem('logintoken')
      },
      // 删除部门
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
    }
  },
  // 注册组件
  components: {
    Pagination
  },
  /**
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
  created() {
    this.getdata(this.formInline)
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 获取公司列表
    getdata(parameter) {
      this.loading = true
      // 模拟数据开始
      let res = {}
      GoodsList({
        page:this.formInline.page,
        PageSize:  this.formInline.limit
      }).then((resp)=>{
        console.log(resp)
        console.log(resp.data.records.length)
        res = {
        code: 0,
        msg: null,
        count: resp.data.records.length,
        Tdata: resp.data.records
      }
      
      this.loading = false
      this.listData = res.Tdata
      this.pageparm.currentPage = this.formInline.page
      this.pageparm.pageSize = this.formInline.limit
      this.pageparm.total = res.count
 for(let i = 0;i < res.Tdata.length;i++){
        if(res.Tdata[i].status = 1){
          res.Tdata[i].status = "上线"
        }
        if(res.Tdata[i].status = 0){
          res.Tdata[i].status = "下线"
        }
        if(res.Tdata[i].status = 2){
          res.Tdata[i].status = "草稿"
        }
        if(res.Tdata[i].status = 3){
          res.Tdata[i].status = "审核"
        }
        if(res.Tdata[i].status = 4){
          res.Tdata[i].status = "审核成功"
        }


      }
    
      })
      console.log(res.Tdata)
     

      
      // 模拟数据结束

      
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getdata(this.formInline)
      console.log(this.formInline.page,this.formInline.limit)
    },
    // 搜索事件
    search() {
      let res;
      if(this.formInline.deptName.length>0){
  GoodsListsearch({
        page:this.formInline.page,
        PageSize:  this.formInline.limit,
        name:this.formInline.deptName
      }).then((resp)=>{
        console.log(resp)
        console.log(resp.data.records.length)
        res = {
        code: 0,
        msg: null,
        count: resp.data.records.length,
        Tdata: resp.data.records
      }
      
      this.loading = false
      this.listData = res.Tdata
      this.pageparm.currentPage = this.formInline.page
      this.pageparm.pageSize = this.formInline.limit
      this.pageparm.total = res.count
 for(let i = 0;i < res.Tdata.length;i++){
        if(res.Tdata[i].status = 1){
          res.Tdata[i].status = "上线"
        }
        if(res.Tdata[i].status = 0){
          res.Tdata[i].status = "下线"
        }
        if(res.Tdata[i].status = 2){
          res.Tdata[i].status = "草稿"
        }
        if(res.Tdata[i].status = 3){
          res.Tdata[i].status = "审核"
        }
        if(res.Tdata[i].status = 4){
          res.Tdata[i].status = "审核成功"
        }


      }
    
      })}else{ this.getdata(this.formInline)}
     
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      console.log(index)
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = '修改'
        this.editForm.deptId = row.deptId
        this.editForm.deptName = row.deptName
        this.editForm.deptNo = row.deptNo
      } else {
        
        this.editID= this.listData[index].id
        this.title = '添加'
        this.editForm.deptId = ''
        this.editForm.deptName = ''
        this.editForm.deptNo = ''
      }
    },
   

    // 编辑、增加页面保存方法
    submitForm(editData) {
      console.log(this.editForm)
      this.$refs[editData].validate(valid => {
        if (valid) {
        GoodsSave({
          name:this.editForm.name,
          category:this.editForm.category,
          discription:this.editForm.discription,
          imgurl:this.editForm.imgurl,
          price:this.editForm.price,
          num:this.editForm.num,
          discountPrice:this.editForm.discountPrice,
          discountBegin:this.editForm.discountBegin,
          discountEnd:this.editForm.discountEnd,
         id:this.editID
        })
            .then(res => {
              console.log(res)
              this.editFormVisible = false
              this.loading = false
              if (res.code==200) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '商品保存成功！'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.editFormVisible = false
              this.loading = false
              this.$message.error('商品保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },


    // 删除公司
    deleteUser(index, row) {
    
      this.editID= this.listData[index].id
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      
        .then(() => {
          GoodsDelete(this.editID)
            .then(res => {
              if (res.code==200) {
                this.$message({
                  type: 'success',
                  message: '商品已删除!'
                })
                this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('商品删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false
    }
  }
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>

 
 