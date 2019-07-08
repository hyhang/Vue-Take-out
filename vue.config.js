module.exports = {
  devServer: {
    open: true,
    proxy: {
      '/api': { // 请求所有以'/api'开头的请求路径
        target: 'http://localhost:5000',
        changeOrigin: true, //支持跨域
        pathRewrite: { //将路径中/api改写为‘’
          '^/api' : ''
        }
      }
    }
  }
}