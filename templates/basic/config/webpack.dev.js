const { default: merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const { HotModuleReplacementPlugin } = require('webpack');

/** @type {import('webpack').Configuration} **/
const devConfig = {
  mode: 'development',
  devServer: {
    port: 3000,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: true,
  },
  plugins: [
    new HotModuleReplacementPlugin()
  ],
  target: "web",
  devtool: "eval-source-map",
}

module.exports = merge(commonConfig, devConfig);