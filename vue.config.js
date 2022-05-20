const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/admin': {
        //代理api
        target: 'http://202.193.53.235:8080', // 代理接口(注意只要域名就够了)
        changeOrigin: true, //是否跨域
        ws: true, // proxy websockets
        pathRewrite: {
          //重写路径
          '^/admin': '' //代理路径
        }
      }
    }
  }
})
