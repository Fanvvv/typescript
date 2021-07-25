/*
 * @Author: fan
 * @Date: 2021-07-25 23:09:34
 * @LastEditors: fan
 * @LastEditTime: 2021-07-25 23:57:47
 * @Description: webpack 配置项
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // 入口文件
  entry: "./src/index.ts",
  // 输出文件
  output: {
    filename: "main.js",
    clean: true // 清理 dist 文件夹
  },
  resolve: {
    // 模块导入时可以省略后缀
    extensions: ['.ts', '.tsx', '.js']
  },
  // 使用的 loader
  module: {
    rules: [{
      test: /\.tsx?$/, // .tsx 后缀的使用 ts-loader
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  devServer: {
    contentBase: './dist',
    stats: 'errors-only', // 控制台仅打印错误
    compress: false, // 不启动压缩
    host: 'localhost',
    port: 8089 // 端口号
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template/index.html'
    })
  ]
}
