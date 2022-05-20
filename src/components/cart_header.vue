<template>
  <div class="cart_head">
    <figure>
      <img src="@/assets/logo-header.png" alt="小米头顶图标">
    </figure>
    <div>
      <h2>我的购物车</h2>
      <nav>
        <router-link to="#">登录</router-link>
        <span>|</span>
        <router-link to="#">注册</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "cart_header"
}
</script>

<style scoped>
.cart_head{
  font-size: 12px;
  border-bottom: 2px solid #ff6700;
  background: #fff;
  color: #b0b0b0;
  display: flex;
  z-index: 20;
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
</style>