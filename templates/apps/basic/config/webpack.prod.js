/* eslint-disable @typescript-eslint/no-var-requires */
const { default: merge } = require('webpack-merge');
const common = require('./webpack.common.js');

/** @type {import('webpack').Configuration} * */
const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};

module.exports = merge(common, prodConfig);
