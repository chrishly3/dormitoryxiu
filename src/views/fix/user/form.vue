<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="用户名称" >
          <el-col :span="4">
        <el-input v-model="userinfo.userName" />
        </el-col>
      </el-form-item>
      <el-form-item label="用户权限" >
        <el-select v-model="userinfo.userType" clearable placeholder="请选择" :span="4" @change="changeType()">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="0" label="管理员"/>
          <el-option :value="1" label="维修员"/>
          <el-option :value="2" label="学生"/>
        </el-select>
      </el-form-item>
      <el-form-item label="学号"  v-if="isUser">
          <el-col :span="4">
        <el-input v-model="userinfo.userStunum"/>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号码">
          <el-col :span="4">
        <el-input v-model="userinfo.userPhone"/>
          </el-col>
      </el-form-item>
      <el-form-item label="初始密码">
          <el-col :span="4">
        <el-input v-model="userinfo.userPassword"/>
          </el-col>
      </el-form-item>

     

      <el-form-item>
        <el-button  type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import userinfo from '@/api/userinfo'

import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

const defaultForm = {
    id:"",
    userName:"",
    userType:"",
    userStunum:"",
    userPhone:"",
    userPassword:""
}

export default {
    //声明使用的额外组件
    components: {ImageCropper,PanThumb},
    data() {
        return {//设置teacher对象初始值
            //BASE_API: process.env.BASE_API, // 接口API地址
            //imagecropperShow:false,
            //imagecropperKey:0,
            userinfo: defaultForm,
            isUser:true
        }
    },
    watch: {
        $route(to, from) {
            console.log('watch $route')
            this.init()
        }
    },
    created () {
        this.init()
    },
    methods: {
        changeType(){
            
        },
        /* cropSuccess(data) {
            console.log(data)
            this.imagecropperShow = false
            //获取后台返回图片地址，显示到页面中
            this.userinfo.avatar = data.imgurl
            //重新加载上传组件
            this.imagecropperKey = this.imagecropperKey + 1
        },

        // 关闭上传组件
        close() {
            //点击×，关闭弹框
            this.imagecropperShow = false
            this.imagecropperKey = this.imagecropperKey + 1
        }, */

        init() {
            //在页面加载之前，判断路由里面是否有id值
            //如果有id值，调用方法根据id查询
            //从路由里面获取值
            if(this.$route.params && this.$route.params.id) {//修改数据回显
                const id = this.$route.params.id
                //调用方法根据id查询
                this.getUserById(id)
            } else {//添加
                //表单数据清空
                this.userinfo = { ...defaultForm }
            }
        },
        //实现添加和修改使用同一个表单
        //预留做修改
        saveOrUpdate() {
            debugger
            console.log(this.userinfo)
            console.log(this.userinfo.id)
            
             //this.saveUserInfo()
            //判断点击保存，执行添加操作 还是修改操作
            if(!this.userinfo.id) {
                //调用添加的方法
                alert(1);
                this.saveUserInfo()
            } else {
                this.updateUserInfo()
            }
        },

        //根据id查询
        getUserById(id) {
            debugger
            userinfo.getUserId(id)
                .then(response => {
                    this.userinfo = response.data.data.user
                })
                console.log(this.userinfo)
        },
        //添加用法的方法
        saveUserInfo() {
            //调用后台接口的方法实现添加
            userinfo.saveUserInfo(this.userinfo)
                .then(() => {
                    //请求之后，添加之后，提示用户,
                    return this.$message({
                        type: 'success',
                        message: '添加成功!'
                    })
                }).then(() => {
                    //回到列表页面中，通过路由跳转回到列表页面中(path即是路由中定义的那个路径)
                    this.$router.push({path: '/user'})
                })
                .catch(() => {
                    this.$message({
                        type: 'success',
                        message: '添加失败!'
                    })
                })
        },
        //修改用户的方法
        updateUserInfo() {
            userinfo.updateUserInfoId(this.userinfo.id,this.userinfo)
                .then(() => {
                    //请求之后，添加之后，提示用户,
                    return this.$message({
                        type: 'success',
                        message: '修改成功!'
                    })
                }).then(() => {
                    //路由跳转
                    this.$router.push({path: '/user'})
                }).catch(() => {
                    this.$message({
                        type: 'success',
                        message: '修改失败!'
                    })
                })
        }
    }
}

</script>

