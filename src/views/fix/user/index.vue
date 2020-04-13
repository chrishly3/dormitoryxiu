<template>
  <div class="app-container">
    用户列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.userName" placeholder="用户名" @input="inputFunction()"/>
      </el-form-item>
      




     <el-select v-model="searchObj.dd" value-key="value" @change="changeType()">
          <el-option :label="item.value" :value="item" v-for="(item) in enterpriseList" :key="item.id"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="getListUser()">查询</el-button>
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

      <el-table-column prop="userStunum" label="学号" width="150" />

      <el-table-column prop="userName" label="姓名" width="150" />

      <el-table-column label="用户类型" width="150" >
        <template slot-scope="scope">

         <!--  {{ scope.row.userType===1?'管理员':'普通用户' }} -->
          <el-tag type="success" effect="dark" v-if="scope.row.userType==0">管理员</el-tag>
          <el-tag type="warning" effect="dark" v-if="scope.row.userType==1">维修员</el-tag>
          <el-tag type="danger" effect="dark" v-if="scope.row.userType==2">学生用户</el-tag>
          
        </template>
      </el-table-column>

      <el-table-column prop="userPhone" label="手机号码" width="150"/>

      <!-- <el-table-column label="账号是否存在" width="150" >
        <template slot-scope="scope">

          {{ scope.row.def===1?'账号已删':'账号可用' }}
          
        </template>
      </el-table-column> -->

      

      <!-- <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
 -->
   
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/user/edit/'+scope.row.id">
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
      @current-change="getListUser"
    />
  </div>
</template>

<script>
import userinfo from '@/api/userinfo'

export default {
    //定义变量和初始值
    data() {
        return {
            listLoading: true, // 是否显示loading信息
            list:null, //每页数据list集合
            total:0, //总记录数
            page:1,//当前页
            pageSize:4,//每页显示记录数
            enterpriseList : [{
                  value: '请选择',
                  id: '3'
              },{
                  value: '管理员',
                  id: '0'
              }, {
                  value: '维修员',
                  id: '1'
              }, {
                  value: '学生',
                  id: '2'
              },
              ],
            searchObj:{
              userName: "",
              userType:"",
              dd:"请选择"
            }//条件封装对象
        }
    },
   
    //在页面渲染之前调用，调用具体的某个方法
    created () {
        //调用方法
         if(this.searchObj.dd.id == 3){
          this.searchObj.userType ="";
        }
        this.getListUser()
      
    },
    //写具体的方法调用
    methods: {

      changeType(){
        if(this.searchObj.dd.id == 3){
          this.searchObj.userType ="";
        }else{
        this.searchObj.userType=this.searchObj.dd.id;
        }
        this.getListUser()    
      },
        cellStyle({row,column,rowIndex,columnIndex}){
          return "text-align:center";
        },
        rowClass({row,rowIndex}){
          return "text-align:center"
        },
        getListUser(page=1) {
            this.page = page
            this.listLoading = true
            userinfo.getUserPageList(this.page,this.pageSize,this.searchObj)
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
        getUser(){
           userinfo.getUser()
                .then(response => { //如果请求成功，返回状态码20000，执行then里面操作
                   this.list = response.data.data.items
                  
                }) 
                .catch(response => { //如果请求失败，执行catch里面操作
                    console.log(response)
                })

        },


        //2 删除的方法
        removeDataById(id) {
            this.$confirm('此操作将永久删除该用户账号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用方法进行删除
                //return 表示后面then还会执行
                return userinfo.deleteUserId(id)
            }).then(() => {
                //刷新整个页面
                this.getListUser()
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
           this.getListUser()
         }
       },
        resetData() {//查询全部用户
          if(this.searchObj.dd.id == 3){
             this.searchObj.userType ="";
           }
            this.searchObj.userName = "";
            this.searchObj.userType = "";
            this.searchObj.dd ="请输入";
            this.getListUser();
        },
   
    }
}
</script>
