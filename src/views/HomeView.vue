<template>
  <div class="home">
    <el-container class="go_shopping">
      <el-header style="padding: 0">
        <cart_header></cart_header>
      </el-header>
      <el-main style="min-width: 1227px">
        <cart_select_block></cart_select_block>
      </el-main>
      <el-footer height="auto">
        <div style="width: 1270px;margin-left: 100px">
          <card v-for="item in this.$store.state.data" :key="item.id" :name="item.name" :img_path="item.pthumbnail"  :price="item.price1"></card>
        </div>
      </el-footer>
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
    const {data:res} = await this.$http.get('/goods/list')
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
