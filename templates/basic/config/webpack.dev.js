import { merge } from 'webpack-merge';
import { HotModuleReplacementPlugin } from 'webpack';
import commonConfig from './webpack.common.js';

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
