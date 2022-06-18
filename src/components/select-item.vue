<template>
  <div class="show-goods">
    <el-table
        ref="multipleTable"
        :data="this.$store.state.selected"
        tooltip-effect="dark"
        @sort-change="sortChange"
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
          sortable
          width="140"
          label="单价">
      </el-table-column>
      <el-table-column
          width="310"
          sortable
          align="center"
          label="数量">
        <template v-slot="scope">
          <el-input-number v-model="scope.row.num" @change="handleChange" :min="1" :max="99"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
          width="120"
          sortable
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
      <el-button class="choc" @click="toggleSelection()" v-if="flag">取消选择</el-button>
      <el-button class="choc" @click="togallSelection" v-else>全部选择</el-button>
      <el-button id="submit_money" @click="handleClose" :disabled="!flag">结账</el-button>
      <span style="color: #FF6700;float: right;line-height: 55px;margin-right: 30px">合计:<span style="font-size: 32px;margin-left: 3px;margin-right: 3px">{{total}}</span>元</span>
    </div>
    <el-dialog
        title="确认订单信息"
        :visible.sync="dialogVisible"
        width="30%">
      <el-table :data="select">
        <el-table-column property="name" label="名称" width="230"></el-table-column>
        <el-table-column property="num" label="数量" width="100"></el-table-column>
        <el-table-column label="最终价格">
          <template v-slot="scope">
            {{scope.row.num*scope.row.price}}
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit_order" :loading="loading">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import Info from "@/components/info";
export default {
  name: "select-item",
  components: {Info},
  data(){
    return{
      num : 0,
      total : 0,
      dialogVisible: false,
      select : [],
      loading : false
    }
  },
  computed :{
    flag(){
      return this.num!==0
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = true
      this.select = this.$refs.multipleTable.selection
      this.$store.commit('get_sure_order',this.select)
    },
    handleChange(){
      this.handleSelectionChange(this.$refs.multipleTable.selection)
    },
    togallSelection(){
      const arry = this.$refs.multipleTable.tableData
      arry.forEach(item => {
        this.$refs.multipleTable.toggleRowSelection(item)
      })
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
      console.log(obj)
      const data = await this.$http.post('cart/deleteById?userId='+obj.userId+'&cartId='+obj.cardid)
      this.$store.commit('get_select',data)
      this.$notify({
        title: '成功',
        message: '已经成功删除该商品',
        type: 'success'
      });
    },
    async submit_order(){
      this.loading = true
      this.dialogVisible = false
      let arr = this.$store.state.suer_order
      var Str = this.$store.state.use.useid+'&cartList='
      for (const item of arr) {
        Str += item.cardid+','
      }
      Str = Str.slice(0,-1)
      await this.$http.post('/order/addCastOrder?userId='+Str).then(async res => {
          await this.$http.post('/order/listByUser?userId='+this.$store.state.use.useid).then(async res => {
            this.$store.commit('get_order',res)
            await this.$http.post('/cart/listByUser?userId='+this.$store.state.use.useid).then(res => {
                this.$store.commit('get_select',res)
            })
          })
      }).catch(err => console.log(err.message))
          .finally(() =>{
            this.loading = false
            this.$router.push('/order')
          })


    }
  }
}
</script>

<style scoped lang="less">
.choc{
  float: left;
  margin-left: 20px;
  border: none;
  height: 60px;
}
.show-goods{
  width: 1220px;
  margin-left: 120px;
  height:100%
}
.show-goods /deep/ {
  //overflow: hidden;
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
  position: sticky;
  bottom: 0;
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