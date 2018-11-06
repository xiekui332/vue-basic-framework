'use strict';
const path = require('path');
const glob = require('glob');

const staticFiles = glob.sync(path.resolve(__dirname, '../') + '/static/js/*.js').map(filePath => path.basename(filePath));

module.exports = {
  common: {
    staticFiles: staticFiles
  },
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/v1': {
        target: 'https://******.com',
        changeOrigin: true
      }
    },
    host: 'localhost',
    port: 10000,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: false,
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true
  },
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    devtool: '#source-map',
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
