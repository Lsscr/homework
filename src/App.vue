<template>
  <div id="app">
    <HomeView></HomeView>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
import HomeView from "@/views/HomeView";
export default {
  components: {HomeView},
  async created() {
    const {data : {data : res }} = await this.$http.get('goods/list')
    // this.$store.commit('get_data',)
    // console.log(this.$store.state.data)
    console.log(res)
  }
}
</script>