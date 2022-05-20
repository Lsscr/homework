<template>
  <div class="home">
    <cart_header></cart_header>
  </div>
</template>

<script>
// @ is an alias to /src
import Cart_header from "@/components/cart_header";

export default {
  name: 'HomeView',
  components: {
    Cart_header

  },
  async created() {
    const {data:res} = await this.$http.get('/goods/list')
    this.$store.commit('get_data',res)
  }
}
</script>
