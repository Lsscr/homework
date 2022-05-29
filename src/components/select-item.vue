<template>
  <div class="show-goods">
    <el-table
        ref="multipleTable"
        :data="this.$store.state.selected"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          width="120">
        <template v-slot="scope"><img :src="'http://202.193.53.235:8080/'+scope.row.thumbnail" :alt="name"></template>
      </el-table-column>
      <el-table-column
          label="名字"
          width="380">
        <template v-slot="scope"><div class="item-name" :id="scope.row.cardid">{{scope.row.name}}</div></template>
      </el-table-column>
      <el-table-column
          prop="price"
          width="140"
          label="单价">
      </el-table-column>
      <el-table-column
          width="310"
          align="center"
          label="数量">
        <template v-slot="scope">
          <el-input-number v-model="scope.row.num" @change="handleChange" :min="1" :max="99"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
          width="120"
          label="小计">
        <template v-slot="scope">
          <label class="total-price">{{scope.row.price*scope.row.num}}元</label>
        </template>
      </el-table-column>
      <el-table-column
          width="90"
          align="center"
          flot="left"
          label="操作"
          show-overflow-tooltip>
        <template v-slot="scope">
          <el-button type="danger" icon="el-icon-delete" @click="delete_item(scope.row)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom">
      <el-button @click="$router.push({path:'/goods'})" id="continue">继续购物</el-button>
      <span id="selected">已经选择<span style="color: #FF6700">{{num}}</span>件</span>
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button id="submit_money" @click="submit_order">结账</el-button>
      <span style="color: #FF6700;float: right;line-height: 55px;margin-right: 30px">合计:<span style="font-size: 32px;margin-left: 3px;margin-right: 3px">{{total}}</span>元</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "select-item",
  data(){
    return{
      num : 0,
      total : 0
    }
  },
  computed :{
  },
  methods: {
    handleChange(){
      console.log(this)
      this.handleSelectionChange(this.$refs.multipleTable.selection)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(arr) {
      this.num = arr.reduce((num,item) =>{
        return num += item.num
      },0)
      this.total = arr.reduce((num,item) =>{
        return num += item.num*item.price
      },0)
    },
    async delete_item(obj){
      ///cart/deleteById?userId=7a3ae031010a4358b500925941c6019c&cartId=29ade395dfd14162879e71ca901b389b
      const {data : data} = await this.$http.post('cart/deleteById?userId='+obj.userId+'&cartId='+obj.cardid)
      this.$store.commit('get_select',data)
      this.$notify({
        title: '成功',
        message: '已经成功删除该商品',
        type: 'success'
      });
    },
    async submit_order(){
      //http://202.193.52.12:8080/order/addCastOrder?userId=[userId]&cartList=[cartList]
      //先更新数据库中的购物车的数量
      var arr = this.$refs.multipleTable.selection
      // var temp = {
      //   goodsId : '',
      //   num : '',
      //   price : ''
      // }
      // var select_id = []
      // for (const item of arr) {
      //   // this.$http.post('/cart/add?userId='+this.$store.state.use.useid+'&goodsId='+item.id+'&num='+item.num+'&price='+item.price)
      //   temp = Object.assign(item)
      //   await this.$http.post('cart/deleteById?userId='+this.$store.state.use.useid+'&cartId='+item.cardid)
      //   let {data : d} = await this.$http.post('/cart/add?userId='+this.$store.state.use.useid+'&goodsId='+temp.goodsId+'&num='+temp.num+'&price='+temp.price)
      //   select_id.push(item.goodsId)
      //   this.$store.commit('get_select',d)
      // }
      // var Str = '/order/addCastOrder?userId='+this.$store.state.use.useid+'&cartList='
      // arr = this.$refs.multipleTable.selection
      // for (const item of arr) {
      //   console.log(item.cardid)
      //   Str += item.cardid+','
      // }
      var Str = this.$store.state.use.useid+'&cartList='
      for (const item of arr) {
        Str += item.cardid+','
      }
      Str = Str.slice(0,-1)
      await this.$http.post('/order/addCastOrder?userId='+Str)
      //刷新订单数据
      const {data :order_data} = await this.$http.post('/order/listByUser?userId='+this.$store.state.use.useid)
      this.$store.commit('get_order',order_data)
      const {data :select_data} = await this.$http.post('/cart/listByUser?userId='+this.$store.state.use.useid)
      //刷新购物车数据
      this.$store.commit('get_select',select_data)
      this.$router.push('/order')
    }
  }
}
</script>

<style scoped lang="less">
.show-goods{
  width: 1220px;
  margin-left: 120px;
}
.show-goods /deep/ {
  overflow: hidden;
}
img{
  width: 60px;
  height: 60px;
}
.item-name{
  font-size: 20px;
  font-weight: 400;
  color: #424242;
}
div /deep/ .cell{
  font: 16px Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif;
  color: #424242;
}
.bottom{
  border-top:1.3px solid #FF6700;
  background: white;
  min-height: 60px;
}
#continue{
  float: left;
  border: none;
  height: 60px;
}
#selected{
  float:left;
  margin-left: 15px;
  line-height: 60px;
}
#submit_money{
  float: right;
  border: none;
  background: #FF6700;
  color: white;
  margin-top: -2px;
  height: 62px;
  width: 180px;
  font-size: 20px;
}
</style>