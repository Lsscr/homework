<template>
  <el-container>
    <el-main id='building'>
      <div>
        <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
          <img src="@/assets/logo-header.jpg" alt="我的头顶图标" id="tx">
          <h3 class="login-title" style="display: inline-block">欢迎登录</h3>
          <el-form-item label="账号" prop="username">
<!--            <el-input type="text" placeholder="请输入账号" v-model="form.username"/>-->
                <myInput type="text" v-model="form.username" placeholder="请输入账号"></myInput>
          </el-form-item>
          <el-form-item label="密码" prop="password">
<!--            <el-input type="password" placeholder="请输入密码" v-model="form.password"/>-->
            <myInput type="password" v-model="form.password" placeholder="请输入密码"></myInput>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="onsubmit" :loading="loading">登录</el-button>
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
      useid : "",
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
      dialogVisible : false,
      loading : false
    }
  },
  methods:{
    async onsubmit(){
      this.loading = true
      window.sessionStorage.setItem("name",this.form.username)
      await this.$http.post('/user/login?name='+this.form.username+'&password='+this.form.password).then(res => {
        this.useid = res
        this.$store.commit('get_useid', {useid : res,usename :this.form.username})
        window.sessionStorage.setItem("useid",res)
        this.$notify({
          title: "成功",
          message: "登录成功",
          type: "success",
          duration : 2000,
        });
      }).catch(err => {
        this.$notify({
          title: "失败",
          message: err.message,
          type: "error",
          duration : 2000,
        });
      })
      await this.$http.post('/cart/listByUser?userId='+this.useid).then(res => {
        this.$store.commit('get_select',res)
      }).catch(err => {
        this.$notify({
          title: "失败",
          message: err.message,
          type: "error",
          duration : 2000,
        });
      })
      await this.$http.post('/order/listByUser?userId='+this.useid).then(res => {
        this.$store.commit('get_order',res)
      }).catch(err => {
        this.$notify({
          title: "失败",
          message: err.message,
          type: "error",
          duration : 2000,
        });
      })
      this.loading = false
      this.$router.push('/goods')
    },
    async onregion(){
      const result = await this.$http.post('/user/register?name='+this.form.username+'&password='+this.form.password).then()
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
img#tx{
  float: left;
  width: 48px;
  height: 48px;
  margin: -10px -50px 0 35px;
  border-radius: 20px;
}
#building{
  margin:0;
  padding:0;
  border:0;
  background:url("https://img2.baidu.com/it/u=3896059421,3668345783&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=400");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
</style>