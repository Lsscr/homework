<template>
  <el-container>
    <el-header>
      <card_header>
        <template #title="scope"><h2>订单列表</h2></template>
        <template #default="scope"><router-link to="/">我的购物车</router-link></template>
      </card_header>
    </el-header>
    <el-main>
      <h3>我的个人订单信息</h3>
      <el-table
          :data="$store.state.order_list"
          style="width: 100%;margin-bottom: 20px;"
          tooltip-effect="dark"
          row-key="id">
        <el-table-column type="expand">
          <template v-slot="props">
            <el-table label-position="left" inline class="demo-table-expand" border :data="props.row.orderDetail">
              <el-table-column label="订单 ID" prop="OrderDetailid"></el-table-column>
              <el-table-column label="商品 ID" prop="goodsId"></el-table-column>
              <el-table-column label="商品名字" prop="goodsName"></el-table-column>
              <el-table-column label="商品数量" prop="nums"></el-table-column>
              <el-table-column label="交易价格" prop="dealPrice"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
            type="index"
            label="索引"
            sortable
            width="100">
        </el-table-column>
        <el-table-column
            prop="id"
            label="订单 ID"
            sortable>
        </el-table-column>
        <el-table-column
            prop="orderTime"
            label="订单 Time">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import card_header from "@/components/cart_header";
export default {
  name: "order",
  components: {card_header},
  created() {
    console.log(this.$store.state.order_list)
  }
}
</script>

<style scoped lang="less">
.el-main{
  margin-top: 100px;
}
</style>