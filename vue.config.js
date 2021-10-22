/*
 * @Description:vue(webpack)配置文件
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2021-9-18 15:52:29
 * @LastEditTime: 2021-09-25 09:06:27
 * @LastEditors: 安知鱼
 */
const path = require('path')

module.exports = {
  outputDir: './dist',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    },
    open: true
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components')
      .set('assets', '@/assets')
      .set('service', '@/service')
      .set('views', '@/views')
  }
}
