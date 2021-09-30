/* eslint-disable @typescript-eslint/no-var-requires */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const assetsRules = {
  type: 'asset',
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
};

const reactRules = {
  use: 'babel-loader',
  test: /\.(ts|js)x?$/,
  exclude: /node_modules/,
};

/** @type {import('webpack').Configuration} * */
module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.json', '.js'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.svg',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [reactRules, assetsRules],
  },
};
