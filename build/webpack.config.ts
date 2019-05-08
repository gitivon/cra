import webpack from 'webpack';
import webpackBar from 'webpackbar';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { app } from '../server/app';
import dotenv from 'dotenv';

const { parsed } = dotenv.config();
const isDev = process.env.NODE_ENV === 'development';
const mode: webpack.Configuration['mode'] = process.env.NODE_ENV as any;
const config: webpack.Configuration = {
  mode,
  entry: ['./src/index.tsx'],
  output: {
    // publicPath: '/assets/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(png|jpg|jpeg|webp|svg)$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    new webpackBar(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(parsed),
    }),
    new HtmlWebpackPlugin({
      title: 'ReactSsrDemo',
      template: path.resolve(
        __dirname,
        isDev ? '../src/index.njk' : '../build/index.html'
      ),
    }),
  ],
};

if (mode === 'development') {
  config.devServer = {
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
    before: app,
    compress: true,
    stats: 'errors-only',
  };
  config.plugins!.push(new webpack.HotModuleReplacementPlugin());
} else {
  config.optimization = {
    splitChunks: {
      chunks: 'all',
    },
  };
}

export default config;
