<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="维修员名称" >
          <el-col :span="4">
        <el-input v-model="order.repairUserName" />
        </el-col>
      </el-form-item>
      <el-form-item label="申请上门时间" >
        <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
            v-model="order.repairDateTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
            </el-date-picker>
        </div>
      </el-form-item>
     

      
      <el-form-item label="房间号">
          <el-col :span="4">
        <el-input v-model="order.repairDoorNum"/>
        </el-col>
      </el-form-item>


      <el-form-item label="维修项目">
          <el-col :span="4">
        <el-input v-model="order.repairType"/>
          </el-col>
      </el-form-item>
      <el-form-item label="损坏原因">
          <el-col :span="4">
        <el-input v-model="order.repairMessage"/>
          </el-col>
      </el-form-item>
      <el-form-item label="报修单状态" >
        <el-select v-model="order.repairStatus" clearable placeholder="请选择" :span="4" @change="changeType()">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="0" label="未处理"/>
          <el-option :value="1" label="处理中"/>
          <el-option :value="2" label="已处理"/>
        </el-select>
      </el-form-item>



      <el-form-item>
        <el-button  type="primary" @click="saveOrUpdate">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>



<script>
import order from '@/api/order'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

const defaultForm = {
    repairUserName:"",
    repairType:"",
    repairDoorNum:"",
    repairType:"",
    repairMessage:""
}

  export default {
    data() {
      return {
        order:defaultForm
      };
    },
    watch: {
        $route(to, from) {
            console.log('watch $route')
            this.init()
        }
    },
    created(){
      this.init()
    },
    methods:{
      init() {
            //在页面加载之前，判断路由里面是否有id值
            //如果有id值，调用方法根据id查询
            //从路由里面获取值
            if(this.$route.params && this.$route.params.id) {//修改数据回显
                const id = this.$route.params.id
                //调用方法根据id查询
                this.getOrderById(id)
            } else {//添加
                //表单数据清空
                this.userinfo = { ...defaultForm }
            }
        },
        changeType(){
            
        },
      //提交维修单方法
        saveOrder() {
            //调用后台接口的方法实现添加
            order.saveOrder(this.order)
                .then(() => {
                    //请求之后，添加之后，提示用户,
                    return this.$message({
                        type: 'success',
                        message: '添加成功!'
                    })
                }).then(() => {
                    //回到列表页面中，通过路由跳转回到列表页面中(path即是路由中定义的那个路径)
                    this.$router.push({path: '/order'})
                })
                .catch(() => {
                    this.$message({
                        type: 'success',
                        message: '添加失败!'
                    })
                })
        },

        saveOrUpdate() {
             //this.saveOrder()
            //判断点击保存，执行添加操作 还是修改操作
            if(!this.order.id) {
                //调用添加的方法
                this.saveOrder()
            } else {
                this.updateOrder()
            }
        },

        //根据id查询
        getOrderById(id) {
            order.getOrderId(id)
                .then(response => {
                    this.order = response.data.data.order
                })
        },

        updateOrder() {
            order.updateOrderId(this.order.id,this.order)
                .then(() => {
                    //请求之后，添加之后，提示用户,
                    return this.$message({
                        type: 'success',
                        message: '修改成功!'
                    })
                }).then(() => {
                    //路由跳转
                    this.$router.push({path: '/order'})
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
