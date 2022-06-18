<template>
  <div>
    <el-form inline class="demo-table-expand">
      <el-form-item label="商品名称">
        <span>{{ name }}</span>
      </el-form-item>
      <el-form-item label="商品数量">
        <span>{{ num }}</span>
      </el-form-item>
      <el-form-item label="商品小计">
        <span>{{ count }}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "info",
  props:{
    name : '',
    num : '',
    count : ''
  }
}
</script>

<style scoped>
div{
  border: red 2px solid;
}
</style>