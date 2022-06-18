<template>
  <el-container>
    <el-header>
      <card_header>
        <template #title="scope"><h2>我的订单列表</h2></template>
        <template #default="scope"><router-link to="/">我的购物车</router-link></template>
      </card_header>
    </el-header>
    <el-main>
      <h3>我的个人历史订单信息</h3>
      <div id="table" style="flex-direction: row;display: flex">
        <el-table
            :data="$store.state.order_list"
            ref="table_form"
            :row-style="tableRowClassName"
            :expand-row-keys="expands"
            style="width: 100%;margin-bottom: 20px;"
            tooltip-effect="dark"
            row-key="id">
          <el-table-column type="expand">
            <template v-slot="props">
              <item v-for="obj in props.row.orderDetail" :key="obj.OrderDetailid" :name="obj.goodsName" :price="obj.nums.slice(13)" :id="obj.goodsId" :orderId="obj.OrderDetailid" :num="obj.nums.slice(0,1)"></item>
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
              label="订单 Time">
            <template v-slot="scope">
              {{scope.row.orderTime | dataFormat}}
            </template>
          </el-table-column>
        </el-table>
        <div>
          <h4>订单时间轴</h4>
          <el-timeline>
          <el-timeline-item
              v-for="(item, index) in $store.state.order_list"
              :key="index"
              :timestamp="item.orderTime | dataFormat">
            订单ID {{item.id}}
          </el-timeline-item>
        </el-timeline></div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import card_header from "@/components/cart_header";
import item from "@/components/item";
export default {
  name: "order",
  components: {card_header,item},
  data(){
    return{
      expands : [],
    }
  },
  methods : {
    tableRowClassName({row, rowIndex}) {
      if(rowIndex=== 0){
        this.$refs.table_form.toggleRowExpansion(row,true)
      }
      if ((rowIndex+1)%2 === 0) {
        if ((rowIndex+1)%4 === 0) {
            return {'background': '#f0f9eb'};
          }
        return {'background': 'oldlace'};
      }
      return '';
    },
  }
}
</script>

<style scoped lang="less">
.el-main{
  margin-top: 45px;
  padding-top: 55px;
  background: #f5f5f5;
}
::v-deep #table{
  display: flex;
  width: 93%;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>