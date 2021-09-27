import { merge } from 'webpack-merge';
import common from './webpack.common.js';

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
