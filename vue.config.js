const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  //开启代理服务器
  devServer: {
    proxy: {
      '/api': {
        //代理要给这个服务器发请求
        target: 'http://localhost:5500',
        pathRewrite: { '^/api': '' }, //保持请求路径正确
        ws: true, //用于支持websocket(默认true)
        changeOrigin: true //撒谎,用于控制请求头中的host值(和后台服务器保持一致)(默认true)
      },
      '/net': {
        target: 'http://192.168.1.102:5500',
        pathRewrite: { '^/net': '' }
      }
    }
  },
  pages: {
    index: {
      entry: 'src/main.js'
    }
  }
})
