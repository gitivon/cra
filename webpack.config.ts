import webpack from 'webpack';
import path from 'path';
import { app } from './server/app';

const config: webpack.Configuration = {
  mode: 'development',
  entry: './src/index.tsx',
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
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    before: app,
    stats: 'errors-only',
  }
  // output:
};

export default config;
