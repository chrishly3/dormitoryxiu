<template>
  <div class="app-container">
    维修单列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.repairUserName" placeholder="维修员姓名" @input="inputFunction()"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.repairType" placeholder="维修项目" @input="inputFunction()"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getListOrder()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
      
    </el-form>

        <!-- 表格 -->
    <el-table
      :cell-style="cellStyle"
      :header-cell-style="rowClass"
      :data="list"
      style=""
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="repairDateTime" label="申请上门时间" width="150" />
      <el-table-column prop="repairUserName" label="维修员姓名" width="150" />
      <el-table-column prop="repairDoorNum" label="房间号" width="150" />
      <el-table-column prop="repairType" label="维修项目" width="150" />
      <el-table-column prop="repairMessage" label="损坏原因以及维修建议"  width="200"/>
      <el-table-column label="维修状态" width="150" >
        <template slot-scope="scope">

         <!--  {{ scope.row.userType===1?'管理员':'普通用户' }} -->
          <el-tag type="danger" effect="dark" v-if="scope.row.repairStatus==0">未处理</el-tag>
          <el-tag type="warning" effect="dark" v-if="scope.row.repairStatus==1">处理中</el-tag>
          <el-tag type="success" effect="dark" v-if="scope.row.repairStatus==2">已处理</el-tag>
          
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/order/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

   <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="pageSize"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getListOrder"
    />
  </div>
  
</template>

<script>
import order from '@/api/order'
export default {
   //定义变量和初始值
    data() {
        return {
            listLoading: true, // 是否显示loading信息
            list:null, //每页数据list集合
            total:0, //总记录数
            page:1,//当前页
            pageSize:4,//每页显示记录数
            searchObj:{
              repairUserName:"",
              repairType:"",

            }//条件封装对象
        }
    },
     //在页面渲染之前调用，调用具体的某个方法
    created () {
        //调用方法
        this.getListOrder()
      
    },
    methods:{

    cellStyle({row,column,rowIndex,columnIndex}){
          return "text-align:center";
        },
    rowClass({row,rowIndex}){
          return "text-align:center"
        },
         //2 删除的方法
      removeDataById(id) {
          this.$confirm('此操作将永久删除该报修单信息, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              //调用方法进行删除
              //return 表示后面then还会执行
              return order.deleteOrderId(id)
          }).then(() => {
               //刷新整个页面
              this.getListOrder()
              this.$message({
                   type: 'success',
                   message: '删除成功!'
               })
           }).catch(() => {
              //判断点击取消，还是删除失败
              if (response === 'cancel') {
                   this.$message({
                       type: 'info',
                       message: '已取消删除'
                   })
               } else {
                   this.$message({
                       type: 'error',
                       message: '删除失败'
                  })
              }           

            })
        },
      inputFunction(){
         if(this.searchObj.userName==""){
           this.getListOrder()
         }
       },
       getListOrder(page=1) {
          this.page = page
            this.listLoading = true
            order.getOrderPageList(this.page,this.pageSize,this.searchObj)
                .then(response => { //如果请求成功，返回状态码20000，执行then里面操作
                    console.log(response)
                   //每页数据
                   this.list = response.data.data.items.list
                   //总记录数
                   this.total = response.data.data.items.total

                   console.log(response.data.data.items.list)

                   this.listLoading = false
                }) 
                .catch(response => { //如果请求失败，执行catch里面操作
                    console.log(response)
                })
        },
    },
    

     
  
}
</script>