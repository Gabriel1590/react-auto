/* eslint-disable */
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
/* eslint-disable */
const path = require('path');

const assetsRules = {
  type: "asset",
  test: /\.(png|svg|jpg|jpeg|gif)$/i
}

const reactRules = {
  use: "babel-loader",
  test: /\.(ts|js)x?$/,
  exclude: /node_modules/,
}

/** @type {import('webpack').Configuration} **/
module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".json", ".js"]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].[contenthash].js",
    publicPath: ""
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: 'public/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [ reactRules, assetsRules],
  },
};