<template>
  <div class="show-card">
    <el-card class="one-card" shadow="hover">
      <img :src="'http://202.193.53.235:8080/'+img_path" :alt="name">
      <div class="card-name">{{name}}</div>
      <div class="card-price">{{price}}元</div>
      <el-button class="card-button" @click="addcar">加入购物车</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "card",
  props:{
    img_path : null,
    name : null,
    price : null,
    id : null
  },
  methods : {
    async addcar(){
      //http://202.193.53.235:8080/cart/add?userId=22272b0bc3a44fde812e3a67f7b6d5dc&goodsId=034db61a861345f9bb681b7f283dd1e1&num=1&price=3499
      //http://[ip]:[port]/cart/add?userId=[userId]&goodsId=[goodsId]&num=[num]&price=[price]
      const {data : data} = await this.$http.post('/cart/add?userId='+this.$store.state.use.useid+'&goodsId='+this.id+'&num=1&price='+this.price)
      this.$notify({
        title: '成功',
        message: '商品添加成功',
        type: 'success'
      });
      this.$store.commit('get_select',data)
    }
  }
}
</script>

<style scoped lang="less">
.show-card{
  width: 234px;
  height: 300px;
  margin: 10px 10px 12px 4px;
}
.el-card /deep/ .el-card__body{
  padding: 0;
}
img{
  width: 140px;
  height: 140px;
  display: block;
  margin: 40px auto 20px;
}
div{
  display: inline-block;
}
.card-name{
  word-wrap: break-word;
  margin: 0 0 10px;
  height: 26px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #333;
}
.card-price{
  width: 100%;
  margin-bottom: 10px;
  color: #ff6700;
}
.card-button{
  height: 28px;
  font-size: 12px;
  line-height: 0;
  border-color: #ff6700;
  background: #fff;
  color: #ff6700;
  width: 120px;
  margin-bottom: 12px;
}
.card-button:hover{
    color: #fff;
    background-color: #f25807;
    border-color: #f25807;
}
</style>