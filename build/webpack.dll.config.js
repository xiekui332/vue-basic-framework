const path = require('path');
const webpack = require('webpack');

module.exports = {
  // 想要打包的模块的数组
  entry: {
    vendor: ['vue/dist/vue.esm.js', 'vue-router', 'vuex', 'axios', 'fastclick']
  },
  output: {
    path: path.join(__dirname, '../dist'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_[chunkhash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dist', '[name]-manifest.json'),
      name: '[name]_[chunkhash]',
      context: __dirname
    }),
    // 压缩打包的文件
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
