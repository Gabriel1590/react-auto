/* eslint-disable @typescript-eslint/no-var-requires */
const { default: merge } = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const commonConfig = require('./webpack.common.js');

/** @type {import('webpack').Configuration} * */
const devConfig = {
  mode: 'development',
  devServer: {
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
  },
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
  target: 'web',
  devtool: 'eval-source-map',
};

module.exports = merge(commonConfig, devConfig);
