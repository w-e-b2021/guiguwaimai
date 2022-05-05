const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5500',
        pathRewrite: { '^/api': '' },
        ws: true, //用于支持websocket
        changeOrigin: true //撒谎
      }
    }
  },
  pages: {
    index: {
      entry: 'src/main.js'
    }
  }
})
