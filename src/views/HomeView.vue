<template>
  <div class="home">
    <el-container class="go_shopping">
      <el-header style="padding: 0">
        <cart_header>
          <template #title="scope"><h2>我的购物车</h2></template>
          <template #default="scope"><router-link to="/Order">我的订单</router-link></template>
        </cart_header>
      </el-header>
      <el-main style="min-width: 1227px;overflow-y: hidden">
        <cart_select_block></cart_select_block>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Cart_header from "@/components/cart_header";
import Cart_select_block from "@/components/cart_select_block";
import Card from "@/components/card";

export default {
  name: 'HomeView',
  components: {
    Card,
    Cart_select_block,
    Cart_header
  },
  async created() {
    const res = await this.$http.get('/goods/list')
    this.$store.commit('get_data',res)
  }
}
</script>

<style>
.home{
  min-width: 1226px;
  background: #f5f5f5;
}

</style>
