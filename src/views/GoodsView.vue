<template>
  <el-container class="show-goods" style="background: #f5f5f5;flex-direction: column">
    <cart_header>
      <template #title="scope"><h2>商品列表</h2></template>
      <template #default="scope"><router-link to="/">我的购物车</router-link></template>
    </cart_header>
    <div id="command">
      <span>精品推荐</span>
    </div>
    <div style="min-width: 1270px;margin-left: 22px">
      <card v-for="item in this.$store.state.data" :key="item.id" :name="item.name" :img_path="item.pthumbnail"  :price="item.price1" :id="item.id"></card>
    </div>
  </el-container>
</template>

<script>
import card from '@/components/card'
import Cart_header from "@/components/cart_header";
export default {
  name: "GoodsView",
  components: {
    Cart_header,
    card
  },
}
</script>

<style scoped lang="less">
#command{
  margin-top: 30px;
  margin-left: 512px;
  height: 100px;
  width: 420px;
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
</style>