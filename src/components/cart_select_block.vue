<template>
  <div class="select_body">
    <el-container>
      <el-main class="show_none" v-if="visible">
        <div class="inform">
          <h2>您的购物车还是空的!</h2>
          <p>登录后将显示您加入的商品</p>
          <el-button id="login">登录</el-button>
          <el-button id="shopping">加入购物车</el-button>
        </div>
      </el-main>
      <el-main v-else>
        <el-table>
          <el-table-column label="test"></el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <hr>
        <div id="command">
          <span>为你推荐</span>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "cart_select_block",
  computed:{
    ...mapGetters(['visible'])
  }
}
</script>

<style scoped lang="less">
.select_body{
  min-width: 1227px;
}
.show_none {
  margin: 65px 0 130px;
  color: #b0b0b0;
  height: 273px;
  background: url(https://cdn.cnbj1.fds.api.mi-img.com/staticsfile/cart/cart-empty.png) no-repeat 313px 0;
  overflow: hidden;
}
.show_none .inform{
  margin-left: 678px;
  width: 356px;
  text-align:left;
}
.show_none h2{
  font-size: 36px;
  margin: 70px 0 0 0;
}
.show_none p{
  margin: 0 0 20px;
  font-size: 20px;
  color: #b0b0b0;
}
button{
  width: 172px;
  height: 50px;
  border-radius: 10px;
}
#login{
  background: #ff6700;
  border-color: #ff6700;
  color: #fff;
}
#shopping{
  background-color: #f5f5f5;
  color: #ff6700;
  border: #FF6700 solid 1px;
}
span{
  line-height: 40px;
  text-align: center;
  display: block;
  background-color: #f5f5f5;
  margin: 0;
  font-size: 30px;
  font-weight: 400;
  color: #757575;
}
#command{
  margin-top: -30px;
  margin-left: 512px;
  height: 100px;
  width: 420px;
}
</style>