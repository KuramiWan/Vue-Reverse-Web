module.exports = {
  css: {
    loaderOptions: {
      css: {
        sourceMap: process.env.NODE_ENV !== "production" ? true : false
      }
    }
  },
  devServer: {
    host:'localhost',
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8888',//要跨域的域名
        secure: false, //如果是https接口，如要配置此参数
        changeOrigin: true,//允许跨域
      }
    }
  },
  lintOnSave: false

};
