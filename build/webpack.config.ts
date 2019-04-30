import webpack from 'webpack';
import webpackBar from 'webpackbar';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path';
import { app } from '../server/app';

const config: webpack.Configuration = {
  mode: 'development',
  entry: [
    // 'webpack-hot-middleware/client?noInfo=true&reload=true&dynamicPublicPath=true',
    './src/index.tsx',
  ],
  output: {
    path: path.resolve(__dirname, '../assets/'),
    publicPath: '/assets/'
  },
  resolve: {
    extensions: [
      '.tsx', '.ts', '.jsx', '.js'
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
    before: app,
    compress: true,
    stats: 'errors-only',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpackBar(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.njk')
    }),
  ]
};

export default config;
