<template>
  <el-container>
    <el-main>
      <div>
        <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
          <h3 class="login-title">欢迎登录</h3>
          <el-form-item label="账号" prop="username">
<!--            <el-input type="text" placeholder="请输入账号" v-model="form.username"/>-->
                <myInput v-model="form.username" placeholder="请输入账号"></myInput>
          </el-form-item>
          <el-form-item label="密码" prop="password">
<!--            <el-input type="password" placeholder="请输入密码" v-model="form.password"/>-->
            <myInput v-model="form.password" placeholder="请输入密码"></myInput>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="onsubmit">登录</el-button>
            <el-button type="primary" v-on:click="onregion">注册</el-button>
          </el-form-item>
        </el-form>

        <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <span>请输入账号和密码</span>
          <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </span>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import myInput from "@/components/myInput";
export default {
  name: "Login_Register_View",
  components:{
    myInput
  },
  data(){
    return{
      form : {
        username : "",
        password : ""
      },
      rules:{
        username:[
          {required:true,message:"账号不可为空",trigger:"blur"}
        ],
        password:[
          {required:true,message:"密码不可为空",trigger:"blur"}
        ]
      },
      dialogVisible : false
    }
  },
  methods:{
    async onsubmit(){
      //http://202.193.52.12:8080/cart/listByUser?userId=250f423a093f41319127a57b9bc0e5a8
      const {data:useid} = await this.$http.post('/user/login?name='+this.form.username+'&password='+this.form.password)
      this.$store.commit('get_useid', {useid : useid,usename :this.form.username})
      const {data :data} = await this.$http.post('/cart/listByUser?userId='+useid)
      this.$store.commit('get_select',data)
      //http://202.193.52.12:8080/order/listByUser?userId=250f423a093f41319127a57b9bc0e5a8
      const {data : arr} = await this.$http.post('/order/listByUser?userId='+useid)
      // var temp_obj = {
      //   id : '',
      //   orderTime : '',
      //   children : ''
      // }
      // var temp_arr = []
      // for(const item of arr){
      //     temp_obj.id = item.id
      //     temp_obj.orderTime = item.orderTime
      //     temp_obj.children = item.orderDetail
      //     console.log(temp_arr)
      //     temp_arr.push(temp_obj)
      // }
      this.$store.commit('get_order',arr)
      this.$message({
        message: '恭喜你，登录成功',
        type: 'success'
      });
      this.$router.push('/goods')
    },
    async onregion(){
      const result = await this.$http.post('/user/register?name='+this.form.username+'&password='+this.form.password)
      this.$message({
        message: '恭喜你，注册成功',
        type: 'success'
      });
    }
  }
}
</script>

<style scoped lang="less">
el-main{
  min-width: 1145px;
}
.login-box{
  border:1px solid #DCDFE6;
  width: 350px;
  margin:180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}
.login-title{
  text-align:center;
  margin: 0 auto 40px auto;
  color: #303133;
}
.el-button--primary {
  margin-right: 40px;
}
</style>