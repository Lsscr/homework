<template>
  <div class="cart_head">
    <figure>
      <img src="@/assets/logo-header.jpg" alt="我的头顶图标">
    </figure>
    <div>
      <slot name="title">默认头顶插槽</slot>
      <nav v-if="islogin">
        <router-link to="/Login_Register">登录</router-link>
        <span>|</span>
        <router-link to="/Login_Register">注册</router-link>
      </nav>
      <nav v-else>
        <span>{{this.$store.state.use.usename}}</span>
        <span>|</span>
        <span><slot name="default">跳转链接插槽</slot></span>
      </nav>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "cart_header",
  computed:{
    ...mapGetters(['islogin'])
  }
}
</script>

<style scoped lang="less">
.cart_head{
  font-size: 12px;
  border-bottom: 2px solid #ff6700;
  background: #fff;
  color: #b0b0b0;
  display: flex;
  height: 100px;
}
.cart_head figure img{
  width: 48px;
  height: 48px;
  margin-left: 127px;
  margin-top: 13px;
  border-radius: 20px;
}
.cart_head div{
  position: relative;
  width: 1126px;
}
.cart_head h2{
  float: left;
  line-height: 48px;
  margin-bottom: 0;
  font-size: 28px;
  font-weight: 400;
  color: #424242;
}
.cart_head div nav{
  font-size: smaller;
  margin-top: 8px;
  float: right;
}
span{
  margin: 0 5px 0 5px;
}
</style>