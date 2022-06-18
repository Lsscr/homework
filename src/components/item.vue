<template>
  <el-descriptions :column="3" border>
    <el-descriptions-item label="商品名字" labelStyle="background: #E1F3D8" contentStyle="background: #FDE2E2;">{{name}}</el-descriptions-item>
    <el-descriptions-item label="商品数量" labelStyle="background: #F7AEB7" contentStyle="background: #E5D9CA;">{{num}}</el-descriptions-item>
    <el-descriptions-item label="交易价格" labelStyle="background: #C0B7ED" contentStyle="background: #DEDFE0;">{{price}}</el-descriptions-item>
    <el-descriptions-item label="订单 ID">{{orderId}}</el-descriptions-item>
    <el-descriptions-item label="商品 ID">{{id}}</el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default {
  name: "item",
  props:{
    orderId : '',
    id : '',
    name : '',
    num : '',
    price : ''
  }
}
</script>

<style scoped>
</style>